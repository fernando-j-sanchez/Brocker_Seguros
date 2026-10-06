import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { whatsappUrl } from '../lib/contacto';

const messages = [
  '¿Necesitas ayuda con tu seguro? 🏥',
  'Cotiza tu PPR ahora 📈',
  'Protege a tu familia 👨‍👩‍👧‍👦',
  'Asesoría personalizada 👋',
  'Te ayudamos a elegir 🤝',
  'Cotización sin compromiso ✅'
];

const CLAVE_CERRADO = 'nissi-whatsapp-cerrado';

// Logotipo oficial de WhatsApp
const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const leerCerrado = () => {
  try {
    return sessionStorage.getItem(CLAVE_CERRADO) === '1';
  } catch {
    return false;
  }
};

export const WhatsAppButton = () => {
  const reducirMovimiento = useReducedMotion();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [cerradoPorUsuario, setCerradoPorUsuario] = useState(leerCerrado);

  // Cambia el texto de la burbuja cada 4 s mientras está visible
  useEffect(() => {
    if (!showMessage) return;
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showMessage]);

  // La burbuja aparece por primera vez a los 20 s (después del saludo del asistente)
  // y luego cada 45 s durante 8 s, hasta que el usuario la cierre.
  useEffect(() => {
    if (cerradoPorUsuario) return;
    let ocultar: ReturnType<typeof setTimeout>;
    const mostrar = () => {
      setShowMessage(true);
      ocultar = setTimeout(() => setShowMessage(false), 8000);
    };
    const primera = setTimeout(mostrar, 20000);
    const intervalo = setInterval(mostrar, 45000);
    return () => {
      clearTimeout(primera);
      clearTimeout(ocultar);
      clearInterval(intervalo);
    };
  }, [cerradoPorUsuario]);

  const cerrarBurbuja = () => {
    setShowMessage(false);
    setCerradoPorUsuario(true);
    try {
      sessionStorage.setItem(CLAVE_CERRADO, '1');
    } catch {
      // Sin almacenamiento disponible: solo se cierra en esta visita
    }
  };

  const url = whatsappUrl();
  const resorte = { type: 'spring' as const, stiffness: 320, damping: 26 };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Tarjeta de mensaje */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={reducirMovimiento ? { duration: 0.15 } : resorte}
            style={{ transformOrigin: 'bottom right' }}
            className="relative w-[min(270px,calc(100vw-6rem))] bg-white dark:bg-gray-800 rounded-2xl rounded-br-md shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          >
            <button
              onClick={cerrarBurbuja}
              aria-label="Cerrar mensaje"
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2.5 px-4 py-3 bg-[#075E54] text-white">
              <div className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-bold text-sm">
                N
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Asesor NISSI</p>
                <p className="text-[11px] text-white/75">Normalmente responde en minutos</p>
              </div>
            </div>

            <div className="px-4 pt-3 pb-4 bg-[#ECE5DD] dark:bg-gray-900">
              <div className="h-[60px] relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={currentMessage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-x-0 inline-block w-fit max-w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm px-3 py-2 rounded-lg rounded-tl-none shadow-sm"
                  >
                    {messages[currentMessage]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Iniciar chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <div className="relative group">
        {/* Etiqueta al pasar el mouse (escritorio) */}
        <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap rounded-lg bg-gray-900 text-white text-xs font-medium px-3 py-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden sm:block">
          Escríbenos por WhatsApp
        </span>

        {/* Ondas suaves para llamar la atención sin distraer */}
        {!reducirMovimiento && (
          <>
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
            />
          </>
        )}

        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, ...resorte }}
          whileHover={reducirMovimiento ? undefined : { scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 0.92 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/50 transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-300 ring-2 ring-white dark:ring-gray-900" />
        </motion.a>
      </div>
    </div>
  );
};
