import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

export const SUAVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevelarProps {
  children: React.ReactNode;
  className?: string;
  retraso?: number;
  desde?: 'abajo' | 'izquierda' | 'derecha';
}

/** Aparición suave (desvanecer + deslizar) la primera vez que el bloque entra en pantalla. */
export const Revelar = ({ children, className, retraso = 0, desde = 'abajo' }: RevelarProps) => {
  const reducirMovimiento = useReducedMotion();
  const desplazamiento = reducirMovimiento
    ? {}
    : desde === 'abajo'
      ? { y: 28 }
      : { x: desde === 'izquierda' ? -28 : 28 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...desplazamiento }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: SUAVE, delay: retraso }}
    >
      {children}
    </motion.div>
  );
};

/** Número que cuenta desde 0 hasta su valor cuando aparece en pantalla. */
export const Contador = ({ valor, prefijo = '', sufijo = '' }: { valor: number; prefijo?: string; sufijo?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reducirMovimiento = useReducedMotion();
  const [actual, setActual] = useState(reducirMovimiento ? valor : 0);

  useEffect(() => {
    if (!visible || reducirMovimiento) return;
    const control = animate(0, valor, { duration: 1.6, ease: SUAVE, onUpdate: (v) => setActual(Math.round(v)) });
    return () => control.stop();
  }, [visible, valor, reducirMovimiento]);

  return (
    <span ref={ref}>
      {prefijo}
      {actual}
      {sufijo}
    </span>
  );
};
