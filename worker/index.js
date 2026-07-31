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

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    if (requestUrl.pathname.startsWith("/api/remitec/")) return proxyRemitec(request, env);

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
