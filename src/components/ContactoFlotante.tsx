import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { AsistenteNissi } from './AsistenteNissi';
import { useSolicitud } from '../lib/solicitud';

const CLAVE_SALUDO_CERRADO = 'nissi-saludo-cerrado';

const leerSaludoCerrado = () => {
  try {
    return sessionStorage.getItem(CLAVE_SALUDO_CERRADO) === '1';
  } catch {
    return false;
  }
};

/**
 * Botón flotante único (abajo a la derecha) que abre el Asistente NISSI.
 * WhatsApp está dentro del propio asistente, así que no se repite aquí.
 */
export const ContactoFlotante = () => {
  const reducirMovimiento = useReducedMotion();
  const { asistenteAbierto, setAsistenteAbierto } = useSolicitud();
  const [mostrarSaludo, setMostrarSaludo] = useState(false);
  const [interactuo, setInteractuo] = useState(leerSaludoCerrado);

  // Saludo: aparece una sola vez a los 6 s y se oculta solo a los 20 s.
  useEffect(() => {
    if (interactuo) return;
    const mostrar = setTimeout(() => setMostrarSaludo(true), 6000);
    const ocultar = setTimeout(() => setMostrarSaludo(false), 20000);
    return () => {
      clearTimeout(mostrar);
      clearTimeout(ocultar);
    };
  }, [interactuo]);

  const marcarInteraccion = () => {
    setInteractuo(true);
    setMostrarSaludo(false);
    try {
      sessionStorage.setItem(CLAVE_SALUDO_CERRADO, '1');
    } catch {
      // Sin almacenamiento disponible: solo aplica en esta visita
    }
  };

  const alternarAsistente = () => {
    marcarInteraccion();
    setAsistenteAbierto(!asistenteAbierto);
  };

  const resorte = reducirMovimiento ? { duration: 0.15 } : { type: 'spring' as const, stiffness: 380, damping: 30 };

  return (
    <>
      <AsistenteNissi abierto={asistenteAbierto} onCerrar={() => setAsistenteAbierto(false)} />

      <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
        {/* Saludo inicial */}
        <AnimatePresence>
          {mostrarSaludo && !asistenteAbierto && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={resorte}
              style={{ transformOrigin: 'bottom right' }}
              className="relative w-[min(280px,calc(100vw-2rem))] bg-white dark:bg-gray-800 rounded-2xl rounded-br-md shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-4"
            >
              <button
                onClick={marcarInteraccion}
                aria-label="Cerrar mensaje"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-sm text-gray-700 dark:text-gray-200 pr-5">
                ¡Hola! 👋 ¿Te ayudo a encontrar el seguro ideal para ti?
              </p>
              <button
                onClick={alternarAsistente}
                className="mt-3 w-full py-2 text-xs font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Chatear ahora
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón principal */}
        <div className="relative">
          {/* Dos ondas suaves al aparecer para llamar la atención, sin quedarse parpadeando */}
          {!reducirMovimiento && !interactuo && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-blue-500"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
              transition={{ duration: 1.8, repeat: 2, delay: 2, ease: 'easeOut' }}
            />
          )}
          <motion.button
            onClick={alternarAsistente}
            aria-label={asistenteAbierto ? 'Cerrar asistente' : 'Abrir asistente NISSI'}
            aria-expanded={asistenteAbierto}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...resorte }}
            whileHover={reducirMovimiento ? undefined : { scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-shadow flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={asistenteAbierto ? 'cerrar' : 'abrir'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {asistenteAbierto ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
              </motion.span>
            </AnimatePresence>
            {!interactuo && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                1
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
};
