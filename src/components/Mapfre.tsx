import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Home, Building2, Heart, Shield, Wifi, Globe, Database, Info, Truck, Send, CheckCircle, X, AlertCircle } from 'lucide-react';
import { guardarLead } from '../lib/leads';
import { whatsappUrl } from '../lib/contacto';
import { Revelar, SUAVE } from './Revelar';
import { useSolicitud } from '../lib/solicitud';
import { WhatsAppIcon } from './Iconos';

export const Mapfre = () => {
  const { abrirSolicitud } = useSolicitud();
  const [formData, setFormData] = useState({
    vehiculos: 2,
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    cobertura: 'amplia',
    nombre: '',
    telefono: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCotizacion, setShowCotizacion] = useState(false);
  const [guardado, setGuardado] = useState(true);

  const products = [
    { icon: Car, title: 'Autos Flotilla (Pyme)', desc: 'Precio especial para empresas', color: 'red' },
    { icon: Heart, title: 'Gastos Médicos', desc: 'Protección de salud completa', color: 'red' },
    { icon: Home, title: 'Seguro de Hogar', desc: 'Tu casa siempre protegida', color: 'red' },
    { icon: Building2, title: 'Protección Empresarial', desc: 'Para todo tipo de negocios', color: 'red' }
  ];

  const digitalProducts = [
    { icon: Shield, title: 'Protección Digital 360', desc: 'Ciberriesgos para tu negocio' },
    { icon: Globe, title: 'Protección de Reputación', desc: 'Manejo de crisis' },
    { icon: Database, title: 'Restauración de Sistema', desc: 'Limpieza de equipos' },
    { icon: Wifi, title: 'Recuperación de Datos', desc: 'Rescate de información' }
  ];

  const concepts = [
    { term: 'Prima', desc: 'Monto que pagas periódicamente' },
    { term: 'Deducible', desc: 'Cantidad que cubres antes del seguro' },
    { term: 'Coaseguro', desc: 'Porcentaje que compartes' },
    { term: 'Suma Asegurada', desc: 'Monto máximo de cobertura' }
  ];

  const nombresCobertura: Record<string, string> = {
    amplia: 'Amplia',
    limitada: 'Limitada',
    rc: 'Responsabilidad Civil'
  };

  const beneficiosCobertura: Record<string, string[]> = {
    amplia: [
      'Daños materiales por colisión, vuelco o caída',
      'Robo total del vehículo',
      'Responsabilidad civil por daños a terceros',
      'Gastos médicos ocupantes',
      'Asistencia vial 24/7',
      'Auto sustituto'
    ],
    limitada: [
      'Robo total del vehículo',
      'Responsabilidad civil por daños a terceros',
      'Gastos médicos ocupantes',
      'Asistencia vial 24/7'
    ],
    rc: [
      'Daños a terceros en sus bienes',
      'Daños a terceros en sus personas',
      'Asesoría legal en caso de accidente'
    ]
  };

  const resumenFlotilla = () =>
    `${formData.vehiculos}${formData.vehiculos >= 10 ? '+' : ''} vehículos - ${formData.marca || 'Marca sin especificar'} ${formData.modelo} ${formData.ano} - Cobertura ${nombresCobertura[formData.cobertura]}`.replace(/\s+/g, ' ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ok = await guardarLead({
      origen: 'cotizador-mapfre',
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      producto: 'Mapfre - Autos Flotilla',
      mensaje: `Cotización de flotilla: ${resumenFlotilla()}`,
      detalles: {
        'Vehículos': formData.vehiculos >= 10 ? '10+' : formData.vehiculos,
        'Marca': formData.marca,
        'Modelo': formData.modelo,
        'Año': formData.ano,
        'Cobertura': nombresCobertura[formData.cobertura]
      }
    });

    setGuardado(ok);
    setIsSubmitting(false);
    setShowCotizacion(true);
  };

  const handleCloseCotizacion = () => {
    setShowCotizacion(false);
  };


  return (
    <section id="mapfre" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <Revelar className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">Mapfre</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Protección <span className="text-red-600 dark:text-red-400">integral</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Desde autos y hogar hasta empresas y salud
          </p>
        </Revelar>

        {/* Banner de Mapfre: la imagen ya trae su propio texto, así que se muestra sin nada encima */}
        <Revelar className="max-w-4xl mx-auto mb-14">
          <button
            type="button"
            onClick={() =>
              abrirSolicitud({
                producto: 'Mapfre - Gastos Médicos PMM Pyme',
                titulo: 'Gastos médicos para tu empresa',
                descripcion: 'Conoce los beneficios del seguro de gastos médicos PMM Pyme de Mapfre para tus colaboradores.',
                seccion: 'Mapfre'
              })
            }
            aria-label="Gastos médicos PMM Pyme de Mapfre: solicita información"
            className="group block w-full rounded-3xl overflow-hidden shadow-xl shadow-red-900/10 ring-1 ring-black/5"
          >
            <img
              src="/images/rosa.jpeg"
              alt="Mapfre: Protección médica a tu medida. Seguro de gastos médicos PMM Pyme."
              width={1080}
              height={595}
              loading="lazy"
              className="w-full aspect-[1080/595] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>
        </Revelar>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <Revelar key={product.title} retraso={index * 0.08}>
              <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <product.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.desc}</p>
              </div>
            </Revelar>
          ))}
        </div>

        {/* Cotizador de Flotilla - EN GRID con resultado al lado */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: SUAVE }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg ring-1 ring-black/5 dark:ring-white/5 relative overflow-hidden"
          >
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-center mb-2">Datos de tu Flotilla</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Completa la información para generar tu cotización especializada
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Número de Vehículos - Select */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Número de Vehículos</label>
                  <select
                    value={formData.vehiculos}
                    onChange={(e) => setFormData({...formData, vehiculos: parseInt(e.target.value)})}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                  >
                    <option value="2">2 vehículos</option>
                    <option value="3">3 vehículos</option>
                    <option value="4">4 vehículos</option>
                    <option value="5">5 vehículos</option>
                    <option value="6">6 vehículos</option>
                    <option value="7">7 vehículos</option>
                    <option value="8">8 vehículos</option>
                    <option value="9">9 vehículos</option>
                    <option value="10">10+ vehículos</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Flotillas desde 2 vehículos en adelante</p>
                </div>

                {/* Marca - Input con placeholder */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Marca (vehículo principal)</label>
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => setFormData({...formData, marca: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                    placeholder="Ej: Toyota, Nissan, Honda"
                  />
                </div>

                {/* Modelo - Input con placeholder */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Modelo</label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                    placeholder="Ej: Corolla, Sentra, Civic"
                  />
                </div>

                {/* Año - Select */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Año</label>
                  <select
                    value={formData.ano}
                    onChange={(e) => setFormData({...formData, ano: parseInt(e.target.value)})}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                  >
                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                    <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                    <option value={new Date().getFullYear() - 3}>{new Date().getFullYear() - 3}</option>
                    <option value={new Date().getFullYear() - 4}>{new Date().getFullYear() - 4}</option>
                    <option value={new Date().getFullYear() - 5}>{new Date().getFullYear() - 5}</option>
                    <option value={new Date().getFullYear() - 6}>{new Date().getFullYear() - 6}</option>
                    <option value={new Date().getFullYear() - 7}>{new Date().getFullYear() - 7}</option>
                    <option value={new Date().getFullYear() - 8}>{new Date().getFullYear() - 8}</option>
                    <option value={new Date().getFullYear() - 9}>{new Date().getFullYear() - 9}</option>
                    <option value={new Date().getFullYear() - 10}>{new Date().getFullYear() - 10}</option>
                  </select>
                </div>

                {/* Tipo de Cobertura - Radio buttons mejorados */}
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Tipo de Cobertura</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="radio"
                        name="cobertura"
                        value="amplia"
                        checked={formData.cobertura === 'amplia'}
                        onChange={(e) => setFormData({...formData, cobertura: e.target.value})}
                        className="w-4 h-4 text-red-600"
                      />
                      <div>
                        <span className="font-medium">Cobertura Amplia</span>
                        <p className="text-xs text-gray-500">Máxima protección para tu flotilla</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="radio"
                        name="cobertura"
                        value="limitada"
                        checked={formData.cobertura === 'limitada'}
                        onChange={(e) => setFormData({...formData, cobertura: e.target.value})}
                        className="w-4 h-4 text-red-600"
                      />
                      <div>
                        <span className="font-medium">Cobertura Limitada</span>
                        <p className="text-xs text-gray-500">Robo total y daños a terceros</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="radio"
                        name="cobertura"
                        value="rc"
                        checked={formData.cobertura === 'rc'}
                        onChange={(e) => setFormData({...formData, cobertura: e.target.value})}
                        className="w-4 h-4 text-red-600"
                      />
                      <div>
                        <span className="font-medium">Responsabilidad Civil</span>
                        <p className="text-xs text-gray-500">Cobertura básica obligatoria</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Datos de contacto: necesarios para que un asesor envíe la cotización */}
                <div className="pt-2">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Tus datos de contacto</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="sm:col-span-2 w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                      placeholder="Nombre o empresa"
                    />
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      pattern="[0-9 +\-\(\)]{10,}"
                      title="Escribe un teléfono de al menos 10 dígitos"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                      placeholder="Teléfono"
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 dark:bg-gray-700"
                      placeholder="Correo electrónico"
                    />
                  </div>
                </div>

                {/* Botón Calcular Protección */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Obtener mi cotización
                    </>
                  )}
                </motion.button>
              </form>

            </div>
          </motion.div>

          {/* Resultado de Cotización - Aparece al lado cuando showCotizacion es true */}
          <AnimatePresence mode="wait">
            {!showCotizacion && (
              <motion.div
                key="beneficios"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: SUAVE }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-600 to-rose-500 text-white p-8 lg:p-10 flex flex-col"
              >
                <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
                <Truck aria-hidden="true" className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10" />
                <div className="relative">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wide">Flotillas Pyme</span>
                  <h3 className="mt-4 text-3xl font-extrabold leading-tight">Asegura todos tus vehículos en una sola póliza</h3>
                  <p className="mt-3 text-red-50/90">Desde 2 unidades. Llena el formulario y un asesor te envía tu cotización personalizada.</p>
                  <ul className="mt-8 space-y-4">
                    {[
                      'Tarifa preferencial por flotilla',
                      'Una sola renovación y un solo pago',
                      'Asistencia vial 24/7 para todas tus unidades',
                      'Coberturas Amplia, Limitada o Responsabilidad Civil'
                    ].map((beneficio) => (
                      <li key={beneficio} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
            {showCotizacion && (
              <motion.div
                key="cotizacion"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border-2 border-red-200 dark:border-red-800 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">Tu Cotización - Flotilla</h3>
                    <button
                      onClick={handleCloseCotizacion}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {resumenFlotilla()}
                  </p>

                  {!guardado && (
                    <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-3 rounded-xl mb-4 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>No pudimos registrar tus datos automáticamente. Envíanos tu cotización por WhatsApp con el botón de abajo y te atendemos de inmediato.</span>
                    </div>
                  )}

                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700 dark:text-green-300">✓ Flotilla Calculada</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Tu flotilla de <strong>{formData.vehiculos} vehículos</strong> ha sido calculada exitosamente.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-bold text-lg mb-2 text-red-600">
                      Cobertura {nombresCobertura[formData.cobertura]}
                    </h4>
                    <ul className="space-y-2">
                      {beneficiosCobertura[formData.cobertura].map((beneficio) => (
                        <li key={beneficio} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <span className="font-bold">Cotización Personalizada:</span> {guardado ? `¡Gracias, ${formData.nombre.split(' ')[0]}! Recibimos tus datos y un asesor te contactará con la cotización final según el perfil de tu flotilla.` : 'Un asesor te enviará la cotización final según el perfil de tu flotilla.'}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-2 font-semibold">
                      Tarifas preferenciales para flotillas
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    <strong>Nota Importante:</strong> Las cotizaciones requieren evaluación individual de cada vehículo.
                  </p>

                  <motion.a
                    href={whatsappUrl(`Hola, soy ${formData.nombre}. Quiero cotizar mi flotilla con Mapfre: ${resumenFlotilla()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#1ebe5b] transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    {guardado ? 'Agilizar por WhatsApp' : 'Enviar por WhatsApp'}
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Digital Protection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Protección Digital 360</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalProducts.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border-l-4 border-red-500 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <product.icon className="w-8 h-8 text-red-600 dark:text-red-400 mb-3 relative z-10" />
                <h4 className="font-bold mb-2 relative z-10">{product.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{product.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Concepts */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Conceptos Clave</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {concepts.map((concept, index) => (
              <motion.div
                key={concept.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 group"
              >
                <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 group-hover:rotate-12 transition-transform" />
                <div>
                  <h4 className="font-bold text-red-600 dark:text-red-400">{concept.term}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{concept.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nota de privacidad */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs text-gray-500 dark:text-gray-400 mt-8 text-center"
        >
          Al cotizar, aceptas que un asesor se ponga en contacto contigo. Tus datos están protegidos.
        </motion.p>
      </div>
    </section>
  );
};