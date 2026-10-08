import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { AsistenteNissi } from './AsistenteNissi';
import { WhatsAppIcon } from './Iconos';
import { whatsappUrl } from '../lib/contacto';
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
 * Botón flotante único (abajo a la derecha). Al tocarlo despliega dos opciones:
 * el Asistente NISSI y WhatsApp. Reemplaza a los dos botones que había antes.
 */
export const ContactoFlotante = () => {
  const reducirMovimiento = useReducedMotion();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { asistenteAbierto, setAsistenteAbierto } = useSolicitud();
  const [mostrarSaludo, setMostrarSaludo] = useState(false);
  const [interactuo, setInteractuo] = useState(leerSaludoCerrado);
  const contenedorRef = useRef<HTMLDivElement>(null);

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

  // Cerrar el menú con Escape o al tocar fuera de él
  useEffect(() => {
    if (!menuAbierto) return;
    const alTocarFuera = (e: MouseEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) setMenuAbierto(false);
    };
    const alPresionarTecla = (e: KeyboardEvent) => e.key === 'Escape' && setMenuAbierto(false);
    document.addEventListener('mousedown', alTocarFuera);
    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('mousedown', alTocarFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [menuAbierto]);

  const marcarInteraccion = () => {
    setInteractuo(true);
    setMostrarSaludo(false);
    try {
      sessionStorage.setItem(CLAVE_SALUDO_CERRADO, '1');
    } catch {
      // Sin almacenamiento disponible: solo aplica en esta visita
    }
  };

  const abrirAsistente = () => {
    marcarInteraccion();
    setMenuAbierto(false);
    setAsistenteAbierto(true);
  };

  const alTocarBoton = () => {
    marcarInteraccion();
    if (asistenteAbierto) {
      setAsistenteAbierto(false);
      return;
    }
    setMenuAbierto((v) => !v);
  };

  const resorte = reducirMovimiento ? { duration: 0.15 } : { type: 'spring' as const, stiffness: 380, damping: 30 };
  const algoAbierto = menuAbierto || asistenteAbierto;

  const opciones = [
    {
      clave: 'asistente',
      titulo: 'Asistente NISSI',
      detalle: 'Resuelve tus dudas al instante',
      icono: <Sparkles className="w-5 h-5" />,
      color: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      onClick: abrirAsistente
    },
    {
      clave: 'whatsapp',
      titulo: 'WhatsApp',
      detalle: 'Habla con un asesor',
      icono: <WhatsAppIcon className="w-5 h-5" />,
      color: 'bg-[#25D366]',
      href: whatsappUrl()
    }
  ];

  return (
    <>
      <AsistenteNissi abierto={asistenteAbierto} onCerrar={() => setAsistenteAbierto(false)} />

      <div ref={contenedorRef} className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
        {/* Opciones del menú */}
        <AnimatePresence>
          {menuAbierto && (
            <motion.ul
              className="flex flex-col items-end gap-2.5"
              initial="oculto"
              animate="visible"
              exit="oculto"
              variants={{
                visible: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
                oculto: { transition: { staggerChildren: 0.04 } }
              }}
            >
              {opciones.map((o) => {
                const contenido = (
                  <>
                    <span className="text-right leading-tight">
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">{o.titulo}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{o.detalle}</span>
                    </span>
                    <span className={`w-11 h-11 rounded-full ${o.color} text-white flex items-center justify-center shadow-md`}>
                      {o.icono}
                    </span>
                  </>
                );
                const clases =
                  'flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all';
                return (
                  <motion.li
                    key={o.clave}
                    variants={{
                      visible: { opacity: 1, y: 0, scale: 1 },
                      oculto: { opacity: 0, y: 12, scale: 0.95 }
                    }}
                    transition={resorte}
                  >
                    {o.href ? (
                      <a href={o.href} target="_blank" rel="noopener noreferrer" className={clases} onClick={() => setMenuAbierto(false)}>
                        {contenido}
                      </a>
                    ) : (
                      <button onClick={o.onClick} className={clases}>
                        {contenido}
                      </button>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Saludo inicial */}
        <AnimatePresence>
          {mostrarSaludo && !algoAbierto && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={resorte}
              style={{ transformOrigin: 'bottom right' }}
              className="relative w-[min(290px,calc(100vw-2rem))] bg-white dark:bg-gray-800 rounded-2xl rounded-br-md shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-4"
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
              <div className="mt-3 flex gap-2">
                <button
                  onClick={abrirAsistente}
                  className="flex-1 py-2 text-xs font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Chatear ahora
                </button>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={marcarInteraccion}
                  className="flex-1 py-2 text-xs font-semibold rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-colors flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
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
            onClick={alTocarBoton}
            aria-label={algoAbierto ? 'Cerrar' : 'Abrir opciones de contacto'}
            aria-expanded={algoAbierto}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...resorte }}
            whileHover={reducirMovimiento ? undefined : { scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-shadow flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={algoAbierto ? 'cerrar' : 'abrir'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {algoAbierto ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
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
