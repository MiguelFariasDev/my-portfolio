import { localeCookieName, localeStorageKey, type Locale } from "@/lib/routes";

/**
 * Guarda o idioma escolhido: localStorage para a preferência do usuário e
 * cookie para o proxy conseguir redirecionar a raiz do site no próximo acesso.
 */
export function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // localStorage indisponível (modo privativo, por exemplo) — o cookie abaixo
    // ainda preserva a escolha.
  }

  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
