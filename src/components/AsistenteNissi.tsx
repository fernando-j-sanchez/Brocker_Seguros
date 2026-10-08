import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Shield, X, Send, MessageCircle, UserRound, CheckCircle } from 'lucide-react';
import { guardarLead } from '../lib/leads';
import { whatsappUrl } from '../lib/contacto';

interface Mensaje {
  role: 'user' | 'assistant';
  content: string;
}

const SALUDO: Mensaje = {
  role: 'assistant',
  content: '¡Hola! 👋 Soy el Asistente de NISSI. ¿En qué tipo de seguro estás interesado?'
};

const OPCIONES_RAPIDAS = [
  'Quiero cotizar un seguro',
  'Información sobre PPR Allianz',
  'Seguro de vida MetLife',
  'Seguro de auto o flotilla',
  'Gastos médicos'
];

// Respuestas de respaldo por si la IA no está configurada o no responde.
const RESPUESTAS_LOCALES: { claves: string[]; respuesta: string }[] = [
  {
    claves: ['ppr', 'retiro', 'allianz', 'jubil', 'pension', 'pensión'],
    respuesta:
      'El **PPR Allianz** es un plan para ahorrar e invertir para tu retiro. El plazo mínimo es de 10 años y, con ese plazo, la aportación mínima es de $3,000 al mes. Además, tus aportaciones pueden ser deducibles de impuestos. Puedes simular tu ahorro en la calculadora de la página o dejarme tus datos para que un asesor te arme un plan.'
  },
  {
    claves: ['vida', 'metlife', 'fallec', 'familia'],
    respuesta:
      'Con **MetLife** tenemos Seguro de Vida (fallecimiento, invalidez, gastos funerarios, cobertura de cáncer y más de 20 coberturas adicionales) y Ahorro Flexible desde $500 al mes. ¿Te gustaría que un asesor te cotice según tu edad y la suma asegurada que buscas?'
  },
  {
    claves: ['auto', 'carro', 'coche', 'flotilla', 'vehícul', 'vehicul', 'camioneta'],
    respuesta:
      'Con **Mapfre** aseguramos autos y flotillas desde 2 vehículos, con cobertura Amplia, Limitada o de Responsabilidad Civil. Puedes usar el cotizador de flotillas en la sección Mapfre, o dime cuántos vehículos tienes y de qué año y un asesor te contacta.'
  },
  {
    claves: ['médic', 'medic', 'salud', 'hospital', 'gmm'],
    respuesta:
      'Manejamos **Gastos Médicos Mayores** con Mapfre para ti o tu familia. Para cotizar necesitamos la edad de cada persona y el estado donde viven. ¿Quieres dejarme tus datos para que un asesor te envíe opciones?'
  },
  {
    claves: ['hogar', 'casa', 'departamento', 'depa'],
    respuesta:
      'El **Seguro de Hogar Mapfre** protege tu casa y tus pertenencias. Un asesor puede cotizarlo según el valor de tu vivienda y de tus contenidos. ¿Te contactamos?'
  },
  {
    claves: ['educa', 'escuela', 'hijo', 'universidad', 'superaci'],
    respuesta:
      'Con **Superación Plus** aseguras los estudios de tus hijos desde $418 al mes. ¿Cuántos años tiene tu hijo o hija? Así un asesor te muestra cuánto podrías juntar.'
  },
  {
    claves: ['empresa', 'negocio', 'pyme', 'ciber', 'digital'],
    respuesta:
      'Para negocios tenemos **Protección Empresarial** y **Protección Digital 360** de Mapfre (ciberriesgos, reputación, restauración de sistemas y recuperación de datos). ¿Me compartes el giro de tu negocio para que un asesor te contacte?'
  },
  {
    claves: ['cotiz', 'precio', 'cuánto', 'cuanto', 'costo'],
    respuesta:
      '¡Con gusto! El precio depende de tu perfil. Dime qué seguro te interesa (retiro, vida, auto, gastos médicos, hogar o educación) o toca **"Quiero que me contacten"** y un asesor te envía tu cotización sin compromiso.'
  },
  {
    claves: ['contact', 'teléfono', 'telefono', 'whatsapp', 'correo', 'asesor', 'humano'],
    respuesta:
      'Puedes escribirnos por WhatsApp al **55 5951 5885** o al correo aargeliasorseguros@yahoo.com. Si prefieres, toca **"Quiero que me contacten"** y te llamamos nosotros.'
  }
];

const respuestaLocal = (texto: string) => {
  const t = texto.toLowerCase();
  const encontrada = RESPUESTAS_LOCALES.find((r) => r.claves.some((c) => t.includes(c)));
  return (
    encontrada?.respuesta ??
    'Gracias por tu mensaje. Un asesor de NISSI puede ayudarte con eso. Toca **"Quiero que me contacten"** o escríbenos por WhatsApp y te respondemos en breve.'
  );
};

// Convierte **negritas** en <strong> sin usar HTML crudo.
const TextoFormateado = ({ texto }: { texto: string }) => (
  <>
    {texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
      parte.startsWith('**') && parte.endsWith('**') ? (
        <strong key={i}>{parte.slice(2, -2)}</strong>
      ) : (
        <React.Fragment key={i}>{parte.replace(/^\s*\*\s+/gm, '• ')}</React.Fragment>
      )
    )}
  </>
);

export const AsistenteNissi = () => {
  const reducirMovimiento = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [mostrarBurbuja, setMostrarBurbuja] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO]);
  const [texto, setTexto] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [datos, setDatos] = useState({ nombre: '', telefono: '', email: '' });
  const [enviandoDatos, setEnviandoDatos] = useState(false);
  const [datosEnviados, setDatosEnviados] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Burbuja de bienvenida: aparece a los 4 s y se oculta sola a los 15 s.
  useEffect(() => {
    const mostrar = setTimeout(() => setMostrarBurbuja(true), 4000);
    const ocultar = setTimeout(() => setMostrarBurbuja(false), 15000);
    return () => {
      clearTimeout(mostrar);
      clearTimeout(ocultar);
    };
  }, []);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', block: 'end' });
  }, [mensajes, escribiendo, mostrarFormulario, abierto, reducirMovimiento]);

  const abrir = () => {
    setAbierto(true);
    setMostrarBurbuja(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const enviar = async (contenido: string) => {
    const limpio = contenido.trim();
    if (!limpio || escribiendo) return;

    if (!abierto) abrir();
    setTexto('');
    const historial = [...mensajes, { role: 'user' as const, content: limpio }];
    setMensajes(historial);
    setEscribiendo(true);

    let respuesta: string;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // El saludo inicial no se envía: la IA ya conoce su papel por sus instrucciones.
        body: JSON.stringify({ messages: historial.slice(1) })
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error || `Error ${res.status}`);
      respuesta = data.reply;
    } catch (error) {
      // Si la IA falla se usan respuestas preparadas; /api/estado muestra la causa.
      console.warn('Asistente sin IA, usando respuestas preparadas:', error);
      respuesta = respuestaLocal(limpio);
    }

    setMensajes((prev) => [...prev, { role: 'assistant', content: respuesta }]);
    setEscribiendo(false);
  };

  const enviarDatos = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviandoDatos(true);
    const conversacion = mensajes
      .slice(1)
      .map((m) => `${m.role === 'user' ? 'Cliente' : 'Asistente'}: ${m.content}`)
      .join('\n')
      .slice(-1800);

    const ok = await guardarLead({
      origen: 'asistente',
      nombre: datos.nombre,
      telefono: datos.telefono,
      email: datos.email,
      producto: 'Asistente NISSI',
      mensaje: conversacion || 'Solicitó que lo contacten desde el asistente.'
    });

    setEnviandoDatos(false);
    setMostrarFormulario(false);
    if (ok) {
      setDatosEnviados(true);
      setMensajes((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `¡Listo, ${datos.nombre.split(' ')[0]}! ✅ Recibimos tus datos. Un asesor de NISSI te contactará muy pronto.`
        }
      ]);
    } else {
      setMensajes((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Ups, no pude registrar tus datos. ¿Nos escribes por **WhatsApp**? Te atendemos de inmediato.'
        }
      ]);
    }
  };

  const transicionPanel = reducirMovimiento
    ? { duration: 0.15 }
    : { type: 'spring' as const, stiffness: 320, damping: 28 };

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-50 flex flex-col items-start gap-3">
      {/* Panel del chat */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Asistente NISSI"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={transicionPanel}
            style={{ transformOrigin: 'bottom left' }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] h-[min(560px,calc(100dvh-7rem))] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
          >
            {/* Encabezado */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-tight">Asistente NISSI</p>
                <p className="text-xs text-blue-100">En línea · responde al instante</p>
              </div>
              <button
                onClick={() => setAbierto(false)}
                aria-label="Cerrar chat"
                className="p-2 rounded-full hover:bg-white/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 dark:bg-gray-950/40">
              {mensajes.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reducirMovimiento ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line rounded-2xl ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm ring-1 ring-black/5 dark:ring-white/5 rounded-bl-md'
                    }`}
                  >
                    <TextoFormateado texto={m.content} />
                  </div>
                </motion.div>
              ))}

              {/* Opciones rápidas al inicio */}
              {mensajes.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {OPCIONES_RAPIDAS.map((opcion) => (
                    <button
                      key={opcion}
                      onClick={() => enviar(opcion)}
                      className="px-3 py-1.5 text-sm rounded-full border border-blue-600/40 text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              )}

              {escribiendo && (
                <div className="flex justify-start" aria-live="polite" aria-label="El asistente está escribiendo">
                  <div className="flex gap-1 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md shadow-sm ring-1 ring-black/5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 rounded-full bg-gray-400"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Formulario para dejar datos */}
              <AnimatePresence>
                {mostrarFormulario && (
                  <motion.form
                    onSubmit={enviarDatos}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm ring-1 ring-blue-600/20 space-y-2 overflow-hidden"
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Déjanos tus datos y te contactamos:</p>
                    <input
                      required
                      value={datos.nombre}
                      onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                      placeholder="Nombre"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9 +\-\(\)]{10,}"
                      title="Escribe un teléfono de al menos 10 dígitos"
                      value={datos.telefono}
                      onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                      placeholder="Teléfono (10 dígitos)"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      required
                      type="email"
                      value={datos.email}
                      onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                      placeholder="Correo electrónico"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMostrarFormulario(false)}
                        className="flex-1 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={enviandoDatos}
                        className="flex-1 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
                      >
                        {enviandoDatos ? 'Enviando...' : 'Enviar'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
              <div ref={finRef} />
            </div>

            {/* Acciones */}
            <div className="px-3 pt-2 flex gap-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              {datosEnviados ? (
                <span className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Datos enviados
                </span>
              ) : (
                <button
                  onClick={() => setMostrarFormulario(true)}
                  disabled={mostrarFormulario}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 disabled:opacity-50 transition-colors"
                >
                  <UserRound className="w-4 h-4" /> Quiero que me contacten
                </button>
              )}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Caja de texto */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviar(texto);
              }}
              className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900"
            >
              <input
                ref={inputRef}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escribe tu pregunta..."
                maxLength={500}
                aria-label="Escribe tu pregunta"
                className="flex-1 px-4 py-2.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!texto.trim() || escribiendo}
                aria-label="Enviar mensaje"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burbuja de bienvenida */}
      <AnimatePresence>
        {mostrarBurbuja && !abierto && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={transicionPanel}
            style={{ transformOrigin: 'bottom left' }}
            className="relative max-w-[min(280px,calc(100vw-6rem))] bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md shadow-xl ring-1 ring-black/5 p-4"
          >
            <button
              onClick={() => setMostrarBurbuja(false)}
              aria-label="Cerrar mensaje"
              className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow ring-1 ring-black/5 text-gray-500 hover:text-gray-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <button onClick={abrir} className="text-left text-sm text-gray-700 dark:text-gray-200">
              {SALUDO.content}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente NISSI'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, ...transicionPanel }}
        whileHover={reducirMovimiento ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={abierto ? 'cerrar' : 'abrir'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {abierto ? <X className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
          </motion.span>
        </AnimatePresence>
        {!abierto && mensajes.length === 1 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};
