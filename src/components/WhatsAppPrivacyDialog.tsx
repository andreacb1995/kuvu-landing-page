import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  whatsappUrl: string;
};

export function WhatsAppPrivacyDialog({ open, onClose, returnFocusRef, whatsappUrl }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose, open, returnFocusRef]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/55 p-4"
      role="presentation"
      onClick={(event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-privacy-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 text-gray-700 shadow-2xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="whatsapp-privacy-title" className="text-lg font-semibold text-gray-900">
            Información de privacidad
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]"
          >
            Cerrar
          </button>
        </div>
        <p className="mt-4 rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-2.5 text-xs leading-relaxed text-gray-500">
          <strong className="font-semibold text-gray-600">Responsable del tratamiento:</strong> Andrea Carballido Ballesteros (KUVU).{' '}
          <strong className="font-semibold text-gray-600">Finalidad:</strong> Gestionar la solicitud de contacto.{' '}
          <strong className="font-semibold text-gray-600">Derechos:</strong> Acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, cuando proceda. Asimismo, puede retirar en cualquier momento el consentimiento, sin que ello afecte a la licitud del tratamiento realizado con anterioridad a su retirada en privacidad@kuvuapp.com.{' '}
          <strong className="font-semibold text-gray-600">Más información:</strong>{' '}
          <Link
            to="/politica-privacidad"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="font-medium text-gray-600 underline decoration-gray-300 underline-offset-2 hover:text-gray-800"
          >
            Política de Privacidad
          </Link>
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]"
          >
            Cancelar
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="rounded-xl bg-[#25D366] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1976d2]"
          >
            Continuar a WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
