#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { en } from "../src/i18n/en.js";
import { fr } from "../src/i18n/fr.js";
import { es } from "../src/i18n/es.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const client = path.join(dist, "client");
const index = path.join(client, "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

// The app is a single-page bundle, so without this every language would ship
// the same English <head> and search engines would see one page instead of
// three. Emit a real HTML entry per locale with its own lang, title,
// description and reciprocal hreflang set.
const SITE_ORIGIN = process.env.SITE_ORIGIN ?? "https://sonitransfer.com";
const locales = [
  { code: "en", htmlLang: "en-GB", prefix: "", copy: en },
  { code: "fr", htmlLang: "fr-FR", prefix: "/fr", copy: fr },
  { code: "es", htmlLang: "es-ES", prefix: "/es", copy: es },
];

const escapeAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function alternateLinks(indent) {
  const rows = locales.map(
    ({ code, prefix }) => `${indent}<link rel="alternate" hreflang="${code}" href="${SITE_ORIGIN}${prefix}/" />`,
  );
  rows.push(`${indent}<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/" />`);
  return rows.join("\n");
}

// Strip any previously injected tags first: the root index.html is both the
// template and one of the outputs, so without this a second run without a
// fresh `vite build` would append a duplicate set.
const template = readFileSync(index, "utf8")
  .replace(/^[ \t]*<link rel="canonical"[^>]*>\n/gm, "")
  .replace(/^[ \t]*<link rel="alternate" hreflang="[^"]*"[^>]*>\n/gm, "");

const written = [];

for (const locale of locales) {
  const { title, description } = locale.copy.meta.home;

  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${locale.htmlLang}"`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttribute(description)}" />`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(title)}</title>`);

  const canonical = `    <link rel="canonical" href="${SITE_ORIGIN}${locale.prefix}/" />`;
  html = html.replace("  </head>", `${canonical}\n${alternateLinks("    ")}\n  </head>`);

  const target = locale.prefix
    ? path.join(client, locale.prefix.slice(1), "index.html")
    : index;
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, html);
  written.push(path.relative(dist, target));
}

// Generate the sitemap from the catalogues so it cannot drift from the routes
// the app actually serves. Each entry lists its translations as alternates.
const LEGAL_SLUGS = Object.keys(en.legalLinks);
const STORY_SLUGS = Object.keys(en.stories);
const ROUTE_SLUGS = {
  community: { en: "community", fr: "communaute", es: "comunidad" },
  contact: { en: "contact", fr: "contact", es: "contacto" },
};

function pathFor(route, locale) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  if (route === "home") return `${prefix}/`;
  if (route === "community" || route === "contact") return `${prefix}/${ROUTE_SLUGS[route][locale]}`;
  if (route.startsWith("story:")) return `${prefix}/${ROUTE_SLUGS.community[locale]}/${route.slice(6)}`;
  return `${prefix}/${route}`;
}

const routes = [
  { route: "home", priority: "1.0", changefreq: "weekly" },
  { route: "community", priority: "0.7", changefreq: "monthly" },
  { route: "contact", priority: "0.6", changefreq: "monthly" },
  ...STORY_SLUGS.map((slug) => ({ route: `story:${slug}`, priority: "0.5", changefreq: "yearly" })),
  ...LEGAL_SLUGS.map((slug) => ({ route: slug, priority: "0.5", changefreq: "yearly" })),
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...routes.flatMap(({ route, priority, changefreq }) =>
    locales.map(({ code }) => {
      const alternates = locales.map(
        ({ code: other }) =>
          `    <xhtml:link rel="alternate" hreflang="${other}" href="${SITE_ORIGIN}${pathFor(route, other)}" />`,
      );
      return [
        "  <url>",
        `    <loc>${SITE_ORIGIN}${pathFor(route, code)}</loc>`,
        ...alternates,
        `    <changefreq>${changefreq}</changefreq><priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(path.join(client, "sitemap.xml"), sitemap);

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
console.log("Localised entry points: " + written.join(", "));
console.log(`Sitemap: ${routes.length * locales.length} URLs across ${locales.length} languages`);
