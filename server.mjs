import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import worker from "./worker/index.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.join(root, "dist", "client");
const port = Number(process.env.PORT || 3001);

// Only Vite's own output carries a content hash in the filename, so only those
// files are safe to cache forever. Guessing from the filename shape marked
// public/ images immutable by accident, pinning them in browsers for a year.
async function readHashedAssets() {
  try {
    const manifest = JSON.parse(await readFile(path.join(clientRoot, ".vite", "manifest.json"), "utf8"));
    const files = new Set();
    for (const entry of Object.values(manifest)) {
      if (entry.file) files.add(entry.file);
      for (const css of entry.css ?? []) files.add(css);
      for (const asset of entry.assets ?? []) files.add(asset);
    }
    return files;
  } catch {
    return new Set();
  }
}

const hashedAssets = await readHashedAssets();

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function staticResponse(request) {
  const requestUrl = new URL(request.url);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(clientRoot, relativePath);

  if (!filePath.startsWith(`${clientRoot}${path.sep}`) && filePath !== path.join(clientRoot, "index.html")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return new Response("Not found", { status: 404 });
    const body = request.method === "HEAD" ? null : await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const immutable = hashedAssets.has(relativePath);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentTypes.get(extension) || "application/octet-stream",
        "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

async function nodeRequestToWeb(request) {
  const origin = `http://${request.headers.host || `127.0.0.1:${port}`}`;
  const requestUrl = new URL(request.url || "/", origin);
  const headers = new Headers();
  for (const [name, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) value.forEach((item) => headers.append(name, item));
    else if (value != null) headers.set(name, value);
  }

  // The deployment health check requests /en with curl's generic */* Accept
  // header. Treat extensionless GET/HEAD routes as app navigations so clean
  // URLs and the existing health-check contract both reach the SPA shell.
  if (
    ["GET", "HEAD"].includes(request.method || "GET") &&
    !requestUrl.pathname.startsWith("/api/") &&
    !path.extname(requestUrl.pathname)
  ) {
    headers.set("Accept", "text/html");
  }

  if (["GET", "HEAD"].includes(request.method || "GET")) {
    return new Request(requestUrl, { method: request.method, headers });
  }

  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return new Request(requestUrl, {
    method: request.method,
    headers,
    body: chunks.length ? Buffer.concat(chunks) : undefined,
  });
}

const server = createServer(async (nodeRequest, nodeResponse) => {
  try {
    const request = await nodeRequestToWeb(nodeRequest);
    const response = await worker.fetch(request, { ASSETS: { fetch: staticResponse } });
    nodeResponse.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    if (nodeRequest.method === "HEAD" || !response.body) return nodeResponse.end();
    nodeResponse.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    nodeResponse.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    nodeResponse.end(JSON.stringify({ error: "Internal server error." }));
  }
});

server.keepAliveTimeout = 65_000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Soni Transfer listening on port ${port}`);
});
