/**
 * Check de éxito con zoom-in y confeti breve (azul Kuvu + verde).
 */

import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const CONFETTI_DURATION_MS = 500;
const KUVU_BLUE = '#1c2850';
/** Acento suave acorde al check en cielo #a3cfff */
const ACCENT_SKY = '#7eb8ff';

const PARTICLE_COUNT = 14;

function ConfettiBurst({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, CONFETTI_DURATION_MS + 40);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible"
      aria-hidden
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (i % 3) * 0.08;
        const distance = 20 + (i % 4) * 5;
        const color = i % 2 === 0 ? KUVU_BLUE : ACCENT_SKY;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full shadow-sm"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
              marginLeft: -3,
              marginTop: -3,
            }}
            initial={{ x: 0, y: 0, opacity: 0.92, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.45,
            }}
            transition={{ duration: CONFETTI_DURATION_MS / 1000, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

type Variant = 'onLight' | 'onDark';

const circleClass: Record<Variant, string> = {
  onLight:
    'bg-[#f0f7ff] shadow-sm ring-1 ring-[#a3cfff]/50',
  onDark:
    'bg-white/10 shadow-sm ring-1 ring-white/20',
};

export function SuccessCheckCelebration({ variant = 'onLight' }: { variant?: Variant }) {
  const reduceMotion = useReducedMotion();
  const [confetti, setConfetti] = useState(false);
  const celebrationFired = useRef(false);

  const circle = circleClass[variant];

  if (reduceMotion) {
    return (
      <div
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${variant === 'onDark' ? 'bg-white/10 ring-1 ring-white/25' : 'bg-[#f0f7ff] ring-1 ring-[#a3cfff]/45'}`}
      >
        <CheckCircle className="h-5 w-5 text-[#a3cfff]" strokeWidth={2.25} aria-hidden />
      </div>
    );
  }

  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-visible">
      {confetti ? <ConfettiBurst onDone={() => setConfetti(false)} /> : null}

      <motion.div
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${circle}`}
        initial={{ scale: 0.45, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 22,
          mass: 0.65,
        }}
        onAnimationComplete={() => {
          if (celebrationFired.current) return;
          celebrationFired.current = true;
          setConfetti(true);
        }}
      >
        <CheckCircle className="h-5 w-5 text-[#a3cfff]" strokeWidth={2.25} aria-hidden />
      </motion.div>
    </div>
  );
}
