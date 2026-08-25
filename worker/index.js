const REMITEC_BASE_URL = "https://app.sonitransfer.com";

function remitecUpstreamUrl(requestUrl) {
  const route = requestUrl.pathname.replace(/^\/api\/remitec/, "");
  let pathname = "";

  if (route === "/home-settings") pathname = "/api/HomeSettings/get";
  if (route === "/currencies-from") pathname = "/api/SendMoney/GetCurrenciesFrom";
  if (route === "/currencies-to") pathname = "/api/SendMoney/GetCurrenciesTo";

  const deliveryMatch = route.match(/^\/delivery-types\/(\d+)$/);
  if (deliveryMatch) pathname = `/api/SendMoney/GetDeliveryTypes/${deliveryMatch[1]}`;

  const quotationMatch = route.match(/^\/quotation\/(\d+)\/(\d+)$/);
  if (quotationMatch) pathname = `/api/SendMoney/GetBestQuotation/${quotationMatch[1]}/${quotationMatch[2]}`;

  if (!pathname) return null;
  const upstreamUrl = new URL(pathname, REMITEC_BASE_URL);
  if (route === "/currencies-to") upstreamUrl.search = requestUrl.search;
  return upstreamUrl;
}

async function proxyRemitec(request, env) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
  }

  const upstreamUrl = remitecUpstreamUrl(new URL(request.url));
  if (!upstreamUrl) return Response.json({ error: "Unknown calculator endpoint." }, { status: 404 });

  try {
    const fetcher = env.REMITEC_FETCH ?? fetch;
    const upstream = await fetcher(upstreamUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    const headers = new Headers(upstream.headers);
    headers.set("Cache-Control", "no-store");
    headers.set("X-Soni-Data-Source", "live");
    headers.delete("Set-Cookie");

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return Response.json(
      { error: "The live calculator service is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

const LEGAL_SLUGS = [
  "belmoney-terms",
  "complaints-policy",
  "compliance-security",
  "cookie-policy",
  "privacy-policy",
  "refunds-cancellations",
  "terms-conditions",
];

// "en" is kept because the deployment health check requests /en.
const APP_PATHS = new Set(["/", "/en", ...LEGAL_SLUGS.map((slug) => `/${slug}`)]);

// Pages the previous site published that no longer exist. They were indexed,
// so they get a redirect rather than a 404.
const RETIRED_PATHS = new Set([
  "/about-us",
  "/airtime-cash-power",
  "/bank-deposit",
  "/blog",
  "/cash-pickup",
  "/contact",
  "/help-faqs",
  "/how-it-works",
  "/mobile-wallet",
  "/rates-fees",
  "/receive-money",
  "/send-money",
]);

function normalisePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

// v1 served every page under a locale prefix. Strip it so /en/about-us and
// /about-us resolve the same way.
function withoutLocale(pathname) {
  const match = pathname.match(/^\/(?:en|es|fr)(\/.*)$/);
  return match ? match[1] : pathname;
}

function redirectTarget(pathname) {
  const path = withoutLocale(normalisePath(pathname));

  if (RETIRED_PATHS.has(path) || path.startsWith("/blog/")) return "/";
  // A surviving page reached through its old locale-prefixed URL.
  if (path !== normalisePath(pathname) && APP_PATHS.has(path)) return path;
  return null;
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    if (requestUrl.pathname.startsWith("/api/remitec/")) return proxyRemitec(request, env);

    const isRead = ["GET", "HEAD"].includes(request.method);

    if (isRead) {
      const target = redirectTarget(requestUrl.pathname);
      if (target) {
        const location = new URL(target, requestUrl);
        location.search = requestUrl.search;
        return Response.redirect(location.toString(), 301);
      }
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !isRead) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    const shell = await env.ASSETS.fetch(new Request(indexUrl, request));

    // The shell is the app for a real route, and the 404 body for anything
    // else. Serving it with a 200 either way is what made every unknown URL
    // look like a working page to crawlers.
    const status = APP_PATHS.has(normalisePath(requestUrl.pathname)) ? shell.status : 404;
    return new Response(shell.body, { status, headers: shell.headers });
  },
};
