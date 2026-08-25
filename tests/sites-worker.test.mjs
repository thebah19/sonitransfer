import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

const shellAssets = () => {
  const calls = [];
  return {
    calls,
    ASSETS: {
      fetch: async (request) => {
        const url = new URL(request.url);
        calls.push(url.pathname + url.search);
        const isShell = url.pathname === "/index.html";
        return new Response(isShell ? "app" : "missing", { status: isShell ? 200 : 404 });
      },
    },
  };
};

test("serves the app shell with a 200 for a real page route", async () => {
  const assets = shellAssets();
  const response = await worker.fetch(
    new Request("https://example.test/privacy-policy", { headers: { accept: "text/html" } }),
    { ASSETS: assets.ASSETS },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(assets.calls, ["/privacy-policy", "/index.html"]);
});

test("keeps the /en health-check route serving the app", async () => {
  const assets = shellAssets();
  const response = await worker.fetch(
    new Request("https://example.test/en", { headers: { accept: "text/html" } }),
    { ASSETS: assets.ASSETS },
  );

  assert.equal(response.status, 200);
});

test("returns a 404 status for a route the app does not have", async () => {
  const assets = shellAssets();
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: assets.ASSETS },
  );

  // The shell still renders so the app can show a not-found view, but the
  // status must not claim the page exists.
  assert.equal(response.status, 404);
  assert.equal(await response.text(), "app");
  assert.deepEqual(assets.calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("redirects retired v1 pages to the homepage", async () => {
  for (const path of ["/about-us", "/help-faqs", "/blog", "/blog/a-story", "/send-money", "/en/about-us"]) {
    const response = await worker.fetch(new Request(`https://example.test${path}`), {
      ASSETS: { fetch: async () => new Response("missing", { status: 404 }) },
    });

    assert.equal(response.status, 301, `${path} should redirect`);
    assert.equal(new URL(response.headers.get("location")).pathname, "/", `${path} should land on /`);
  }
});

test("redirects a surviving page reached through its old locale URL", async () => {
  const response = await worker.fetch(new Request("https://example.test/en/privacy-policy"), {
    ASSETS: { fetch: async () => new Response("missing", { status: 404 }) },
  });

  assert.equal(response.status, 301);
  assert.equal(new URL(response.headers.get("location")).pathname, "/privacy-policy");
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("proxies calculator requests to the live Remitec route without fallback data", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/api/remitec/quotation/1/11"),
    {
      ASSETS: { fetch: async () => new Response("missing", { status: 404 }) },
      REMITEC_FETCH: async (url, options) => {
        calls.push({ url: String(url), accept: options.headers.Accept });
        return Response.json({ SellRates: 92, Fees: [] });
      },
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-soni-data-source"), "live");
  assert.deepEqual(calls, [{ url: "https://app.sonitransfer.com/api/SendMoney/GetBestQuotation/1/11", accept: "application/json" }]);
  assert.deepEqual(await response.json(), { SellRates: 92, Fees: [] });
});

test("returns an honest calculator error when the upstream service fails", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/remitec/currencies-from"),
    {
      ASSETS: { fetch: async () => new Response("missing", { status: 404 }) },
      REMITEC_FETCH: async () => {
        throw new Error("offline");
      },
    },
  );

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "The live calculator service is temporarily unavailable." });
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});
