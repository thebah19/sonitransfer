import { LOCALES, localeConfig, useI18n } from "./i18n";

/**
 * A compact segmented control of real links. Links rather than a <select> so
 * the translations are crawlable and so switching survives with JavaScript
 * still loading.
 */
export function LanguageSwitcher() {
  const { locale, switchHref, copy } = useI18n();

  return (
    <nav className="language-switcher" aria-label={copy.language.label}>
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <a
            key={code}
            href={switchHref(code)}
            hrefLang={localeConfig[code].hrefLang}
            lang={localeConfig[code].hrefLang}
            className={isActive ? "is-active" : ""}
            aria-current={isActive ? "true" : undefined}
            title={localeConfig[code].label}
          >
            {localeConfig[code].short}
          </a>
        );
      })}
    </nav>
  );
}
