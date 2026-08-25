// Locale registry and locale-aware URL building.
//
// English lives at the root; French and Spanish live behind a /fr/ and /es/
// path prefix so each language is a separate indexable URL. Everything here
// composes with Vite's BASE_URL so the /v2/ deployment keeps working.

export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "fr", "es"];

export const localeConfig = {
  en: { label: "English", short: "EN", htmlLang: "en-GB", hrefLang: "en" },
  fr: { label: "Français", short: "FR", htmlLang: "fr-FR", hrefLang: "fr" },
  es: { label: "Español", short: "ES", htmlLang: "es-ES", hrefLang: "es" },
};

// The first path segment for each translated route. Story slugs and legal
// slugs stay as they are: a story slug names a specific real event, and the
// legal documents are published in English.
const routeSlugs = {
  community: { en: "community", fr: "communaute", es: "comunidad" },
  contact: { en: "contact", fr: "contact", es: "contacto" },
};

const BASE = import.meta.env.BASE_URL || "/";

export function isLocale(value) {
  return LOCALES.includes(value);
}

/** Strip Vite's base path so route parsing only ever sees app-relative paths. */
export function stripBasePath(pathname) {
  const base = BASE.endsWith("/") ? BASE : `${BASE}/`;
  if (base === "/") return pathname;
  return pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
}

/** Which route id does this first segment name, in this locale? */
function routeForSlug(slug, locale) {
  return Object.keys(routeSlugs).find((route) => routeSlugs[route][locale] === slug) ?? null;
}

/**
 * Read `{ locale, route }` out of a pathname.
 * `isLegalSlug` is injected so this module stays free of content imports.
 */
export function parsePath(pathname, isLegalSlug) {
  const parts = stripBasePath(pathname).split("/").filter(Boolean);
  const locale = isLocale(parts[0]) ? parts.shift() : DEFAULT_LOCALE;
  const [first, second] = parts;

  if (!first) return { locale, route: "home" };
  if (isLegalSlug(first)) return { locale, route: `legal/${first}` };

  const named = routeForSlug(first, locale);
  if (named === "community" && second) return { locale, route: `community-story/${second}` };
  if (named) return { locale, route: named };

  // The worker answers an unknown path with the shell and a 404 status, so the
  // app has to render a not-found view rather than quietly showing the home page.
  return { locale, route: "notfound" };
}

/** App-relative path for a route in a locale, without the base path. */
export function pathFor(route, locale) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  if (!route || route === "home") return `${prefix}/`;
  if (route.startsWith("legal/")) return `${prefix}/${route.slice("legal/".length)}`;
  if (route.startsWith("community-story/")) {
    return `${prefix}/${routeSlugs.community[locale]}/${route.slice("community-story/".length)}`;
  }
  if (routeSlugs[route]) return `${prefix}/${routeSlugs[route][locale]}`;

  return `${prefix}/`;
}

/** Full href for a route, including base path and an optional hash. */
export function hrefFor(route, locale, hash = "") {
  const base = BASE.replace(/\/$/, "");
  const path = pathFor(route, locale);
  return `${base}${path}${hash ? `#${hash}` : ""}`;
}

/** Absolute URL for a route, used for hreflang and canonical tags. */
export function absoluteHrefFor(route, locale, origin) {
  return `${origin}${hrefFor(route, locale)}`;
}
