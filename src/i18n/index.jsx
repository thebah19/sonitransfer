import { createContext, useContext, useEffect } from "react";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { DEFAULT_LOCALE, LOCALES, hrefFor, localeConfig } from "./locales";

export { DEFAULT_LOCALE, LOCALES, localeConfig, hrefFor, parsePath, pathFor } from "./locales";

const catalogues = { en, fr, es };

export function catalogueFor(locale) {
  return catalogues[locale] ?? en;
}

/** Normalise the payout name the API returns before display or lookup. */
export function normalisePayoutName(name) {
  return String(name)
    .replace(/pick[\s-]*up/gi, "pickup")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Localised payout label. Falls back to the API's own wording so a method
 * Remitec adds later shows up in English rather than disappearing.
 */
export function translatePayout(copy, name) {
  const cleaned = normalisePayoutName(name);
  return copy.payoutMethods[cleaned.toLowerCase()] ?? cleaned;
}

const I18nContext = createContext(null);

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>.");
  return value;
}

/** Convenience: most components only want the copy tree. */
export function useCopy() {
  return useI18n().copy;
}

export function I18nProvider({ locale, route, children }) {
  const copy = catalogueFor(locale);

  const value = {
    locale,
    copy,
    route,
    /** Href for a route in the *current* locale. */
    href: (target, hash) => hrefFor(target, locale, hash),
    /** Href for the *current* route in another locale — used by the switcher. */
    switchHref: (target) => hrefFor(route, target),
    payoutLabel: (name) => translatePayout(copy, name),
    relativeTime: (value, unit) =>
      new Intl.RelativeTimeFormat(localeConfig[locale].htmlLang, { numeric: "always" }).format(-value, unit),
    numberFormat: (options) => new Intl.NumberFormat(localeConfig[locale].htmlLang, options),
    /**
     * Country names arrive from the API in English. Translate them from the
     * ISO code the same payload carries, falling back to the API's own name
     * when the runtime has no localised name for that code.
     */
    regionName: (code, fallback) => {
      const iso = String(code ?? "").toUpperCase();
      if (!/^[A-Z]{2}$/.test(iso)) return fallback;
      try {
        const localised = new Intl.DisplayNames([localeConfig[locale].htmlLang], { type: "region" }).of(iso);
        return localised && localised !== iso ? localised : fallback;
      } catch {
        return fallback;
      }
    },
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function upsertMeta(selector, create, apply) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  apply(element);
  return element;
}

/**
 * Keep <html lang>, the title, the description and the hreflang set in step
 * with the active locale and route.
 */
export function useDocumentHead({ locale, route, title, description }) {
  useEffect(() => {
    document.documentElement.lang = localeConfig[locale].htmlLang;
  }, [locale]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    if (!description) return;
    upsertMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      (element) => element.setAttribute("content", description),
    );
  }, [description]);

  useEffect(() => {
    const origin = window.location.origin;
    const managed = [...LOCALES.map((code) => [code, code]), ["x-default", DEFAULT_LOCALE]];

    const links = managed.map(([hrefLang, target]) =>
      upsertMeta(
        `link[rel="alternate"][hreflang="${hrefLang}"]`,
        () => Object.assign(document.createElement("link"), { rel: "alternate", hreflang: hrefLang }),
        (element) => element.setAttribute("href", `${origin}${hrefFor(route, target)}`),
      ),
    );

    upsertMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      (element) => element.setAttribute("href", `${origin}${hrefFor(route, locale)}`),
    );

    return () => links.forEach((link) => link.remove());
  }, [locale, route]);
}
