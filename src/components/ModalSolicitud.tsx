import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { guardarLead } from '../lib/leads';
import { whatsappUrl } from '../lib/contacto';
import { useSolicitud } from '../lib/solicitud';
import { WhatsAppIcon } from './Iconos';
import { SUAVE } from './Revelar';

const PRODUCTOS = [
  'PPR Allianz (retiro)',
  'Seguro de Vida MetLife',
  'Ahorro Flexible MetLife',
  'Gastos Médicos Mayores',
  'Seguro de Auto o Flotilla',
  'Seguro de Hogar',
  'Seguro para mi empresa',
  'Superación Plus (educativo)',
  'Aún no lo sé'
];

const formularioVacio = { nombre: '', telefono: '', email: '', mensaje: '', producto: PRODUCTOS[0] };

const resumirDetalles = (detalles?: Record<string, string | number>) =>
  detalles
    ? Object.entries(detalles)
        .map(([clave, valor]) => `${clave}: ${valor}`)
        .join(' · ')
    : '';

/**
 * Ventana de "Solicitar información" que se abre en la misma parte de la página donde
 * está el cliente, en lugar de mandarlo hasta el formulario del final.
 */
export const ModalSolicitud = () => {
  const { solicitud, cerrarSolicitud, setAsistenteAbierto } = useSolicitud();
  const reducirMovimiento = useReducedMotion();
  const [form, setForm] = useState(formularioVacio);
  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState<'formulario' | 'enviado' | 'error'>('formulario');
  const primerCampoRef = useRef<HTMLInputElement>(null);

  // Al abrir: reiniciar el formulario, enfocar el primer campo y bloquear el scroll de la página
  useEffect(() => {
    if (!solicitud) return;
    setForm({ ...formularioVacio, mensaje: solicitud.mensajeInicial ?? '' });
    setEstado('formulario');
    const enfocar = setTimeout(() => primerCampoRef.current?.focus(), 250);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const alPresionarTecla = (e: KeyboardEvent) => e.key === 'Escape' && cerrarSolicitud();
    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      clearTimeout(enfocar);
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [solicitud, cerrarSolicitud]);

  const producto = solicitud?.elegirProducto ? form.producto : solicitud?.producto ?? '';

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solicitud) return;
    setEnviando(true);
    const resumen = resumirDetalles(solicitud.detalles);
    const ok = await guardarLead({
      origen: 'formulario',
      nombre: form.nombre,
      telefono: form.telefono,
      email: form.email,
      producto,
      mensaje: [form.mensaje.trim(), resumen].filter(Boolean).join('\n') || `Solicitó información desde ${solicitud.seccion}.`,
      detalles: { Sección: solicitud.seccion, ...solicitud.detalles }
    });
    setEnviando(false);
    setEstado(ok ? 'enviado' : 'error');
  };

  const textoWhatsApp = solicitud
    ? `Hola, me interesa ${producto}.${solicitud.detalles ? ` ${resumirDetalles(solicitud.detalles)}.` : ''}`
    : '';

  const abrirAsistente = () => {
    cerrarSolicitud();
    setAsistenteAbierto(true);
  };

  const campo =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition';

  return (
    <AnimatePresence>
      {solicitud && (
        <motion.div
          key="fondo"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6 bg-gray-950/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && cerrarSolicitud()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-solicitud"
            initial={reducirMovimiento ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducirMovimiento ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: SUAVE }}
            className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl"
          >
            {/* Encabezado */}
            <div className="relative overflow-hidden px-6 sm:px-8 pt-7 pb-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <button
                onClick={cerrarSolicitud}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> {solicitud.elegirProducto ? 'Asesoría sin costo' : solicitud.producto}
              </span>
              <h2 id="titulo-solicitud" className="relative mt-3 text-2xl font-extrabold leading-tight pr-8">
                {solicitud.titulo}
              </h2>
              {solicitud.descripcion && <p className="relative mt-2 text-sm text-blue-100">{solicitud.descripcion}</p>}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {estado === 'enviado' ? (
                <motion.div
                  key="enviado"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 sm:px-8 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="mx-auto w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                    ¡Listo, {form.nombre.split(' ')[0]}!
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Recibimos tu solicitud. Un asesor de NISSI te contactará muy pronto.
                  </p>
                  <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={whatsappUrl(textoWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> Agilizar por WhatsApp
                    </a>
                    <button
                      onClick={cerrarSolicitud}
                      className="px-5 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Seguir viendo la página
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="formulario" onSubmit={enviar} className="px-6 sm:px-8 py-6 space-y-3">
                  {solicitud.elegirProducto && (
                    <div>
                      <label htmlFor="solicitud-producto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        ¿Qué te interesa?
                      </label>
                      <select
                        id="solicitud-producto"
                        value={form.producto}
                        onChange={(e) => setForm({ ...form, producto: e.target.value })}
                        className={campo}
                      >
                        {PRODUCTOS.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <input
                    ref={primerCampoRef}
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Nombre completo"
                    aria-label="Nombre completo"
                    autoComplete="name"
                    className={campo}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9 +\-\(\)]{10,}"
                      title="Escribe un teléfono de al menos 10 dígitos"
                      value={form.telefono}
                      onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      placeholder="Teléfono (10 dígitos)"
                      aria-label="Teléfono"
                      autoComplete="tel"
                      className={campo}
                    />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Correo electrónico"
                      aria-label="Correo electrónico"
                      autoComplete="email"
                      className={campo}
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    placeholder="¿Algo que debamos saber? (opcional)"
                    aria-label="Mensaje"
                    className={`${campo} resize-none`}
                  />

                  {estado === 'error' && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 disabled:opacity-60 transition-all"
                  >
                    {enviando ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Enviar solicitud
                      </>
                    )}
                  </button>

                  {/* Alternativas */}
                  <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
                    <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    o si prefieres
                    <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={whatsappUrl(textoWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={abrirAsistente}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" /> Chatear
                    </button>
                  </div>
                  <p className="pt-1 text-center text-[11px] text-gray-400">
                    Sin costo ni compromiso. Tus datos solo se usan para contactarte.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
