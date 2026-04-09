/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string;
  /** URL pública de Calendly (ej. https://calendly.com/tu-usuario/diagnostico) */
  readonly VITE_CALENDLY_URL?: string;
  /** Logo para navbar sobre fondo azul (ruta en /public). Opcional; por defecto se intenta /kuvu-logo-navbar-dark.png */
  readonly VITE_LOGO_NAVBAR_DARK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  fbq: (...args: unknown[]) => void;
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: HTMLElement;
      styles?: { height?: string; width?: string };
      prefill?: Record<string, unknown>;
      utm?: Record<string, unknown>;
    }) => void;
  };
}
