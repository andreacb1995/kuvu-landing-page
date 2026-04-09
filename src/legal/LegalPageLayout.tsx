/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_SITE_DATA } from './legalSiteData';

type Props = {
  title: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, children }: Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#f4f6f8] font-sans text-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="flex shrink-0 items-center" aria-label="KUVU — inicio">
              <img src="/kuvu-app-logo.png" alt="" className="h-9 w-auto object-contain opacity-90 sm:h-10" />
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-[#1976d2]/35 hover:bg-gray-50 hover:text-[#1976d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]/40"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              Volver atrás
            </button>
          </div>
          <Link
            to="/"
            className="text-sm font-semibold text-[#1976d2] underline decoration-[#1976d2]/35 underline-offset-4 transition hover:decoration-[#1976d2]"
          >
            Ir al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-gray-500">
          Documentación legal · {LEGAL_SITE_DATA.nombreComercial}
        </p>
        <article className="rounded-2xl border border-gray-200/90 bg-white px-5 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <h1 className="text-balance border-b border-gray-100 pb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-[1.7] text-gray-700 sm:text-[15px] [&_a]:font-medium [&_a]:text-[#1976d2] [&_a]:underline [&_a]:decoration-[#1976d2]/30 [&_a]:underline-offset-2 [&_a]:hover:text-blue-800 [&_h2]:scroll-mt-24 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:sm:text-lg [&_li]:marker:text-gray-400 [&_strong]:font-semibold [&_strong]:text-gray-800 [&_ul]:pl-1">
            {children}
          </div>
        </article>

        <footer className="mt-10 border-t border-gray-200/80 pt-8 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} {LEGAL_SITE_DATA.nombreComercial}.{' '}
            <Link to="/aviso-legal" className="text-gray-500 hover:text-gray-700">
              Aviso legal
            </Link>
            {' · '}
            <Link to="/politica-privacidad" className="text-gray-500 hover:text-gray-700">
              Privacidad
            </Link>
            {' · '}
            <Link to="/politica-cookies" className="text-gray-500 hover:text-gray-700">
              Cookies
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
