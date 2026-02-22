import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Home, Building2, Heart, Shield, Wifi, Globe, Database, Info, Truck, Send, CheckCircle, X } from 'lucide-react';

export const Mapfre = () => {
  const [formData, setFormData] = useState({
    vehiculos: 2,
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    cobertura: 'amplia'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCotizacion, setShowCotizacion] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCotizacion(true);
      console.log('Cotización:', formData);
    }, 1500);
  };

  const handleCloseCotizacion = () => {
    setShowCotizacion(false);
  };

  const handleSolicitarCotizacion = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mapfre" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Elementos decorativos - CARRITOS ANIMADOS */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{ 
              y: [null, -300],
              rotate: 360,
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {i % 2 === 0 ? <Car className="w-8 h-8 text-red-400/20" /> : <Truck className="w-12 h-12 text-red-400/20" />}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Mapfre <span className="text-red-600 dark:text-red-400">Protección integral</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Desde autos y hogar hasta empresas y salud
          </p>
        </motion.div>

        {/* Imagen Rosa Banner - MÁS PEQUEÑA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative h-64 mb-12 rounded-2xl overflow-hidden shadow-2xl group max-w-4xl mx-auto"
        >
          <img 
            src="/images/rosa.jpeg" 
            alt="Mapfre Protección"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 via-transparent to-red-600/50" />
          
          {/* Texto sobre la imagen */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center text-white">
              <motion.h3 
                className="text-4xl font-bold mb-4"
                animate={{ textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 10px rgba(255,255,255,0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Protección Mapfre
              </motion.h3>
              <p className="text-xl">La tranquilidad que mereces</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Efecto de fondo */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <product.icon className="w-12 h-12 text-red-600 dark:text-red-400 mb-4 group-hover:scale-110 transition-transform relative z-10" />
              <h3 className="text-lg font-bold mb-2 relative z-10">{product.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">{product.desc}</p>
              
              {/* Animación de auto para flotilla */}
              {product.title.includes('Autos') && (
                <motion.div 
                  className="absolute bottom-2 right-2 text-red-200"
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Car className="w-8 h-8" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Cotizador de Flotilla - EN GRID con resultado al lado */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg relative overflow-hidden"
          >
            {/* Animación de fondo */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
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
                      Calculando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Calcular Protección
                    </>
                  )}
                </motion.button>
              </form>

              {/* Animación de autos dentro del formulario */}
              <motion.div 
                className="absolute -bottom-10 -left-10 text-red-200/30"
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Truck className="w-20 h-20" />
              </motion.div>
              <motion.div 
                className="absolute -top-10 -right-10 text-red-200/30"
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Car className="w-16 h-16" />
              </motion.div>
            </div>
          </motion.div>

          {/* Resultado de Cotización - Aparece al lado cuando showCotizacion es true */}
          <AnimatePresence mode="wait">
            {showCotizacion && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-red-200 dark:border-red-800 relative overflow-hidden"
              >
                {/* Elementos decorativos en el resultado */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 text-red-200/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity }}
                >
                  <Car className="w-32 h-32" />
                </motion.div>

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
                    {formData.vehiculos} vehículos - {formData.marca || 'Marca'} {formData.modelo || 'Modelo'} {formData.ano}
                  </p>

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
                      Cobertura {formData.cobertura === 'amplia' ? 'Amplia' : formData.cobertura === 'limitada' ? 'Limitada' : 'Responsabilidad Civil'}
                    </h4>
                    <ul className="space-y-2">
                      {formData.cobertura === 'amplia' && (
                        <>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Daños materiales por colisión, vuelco o caída</span>
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Robo total del vehículo</span>
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Responsabilidad civil por daños a terceros</span>
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Gastos médicos ocupantes</span>
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Asistencia vial 24/7</span>
                          </li>
                          <li className="text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Auto sustituto</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <span className="font-bold">Cotización Personalizada:</span> Tu flotilla está protegida. Un asesor te contactará con la cotización final personalizada según el perfil de tu flotilla.
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-2 font-semibold">
                      Tarifas preferenciales para flotillas
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    <strong>Nota Importante:</strong> Las cotizaciones requieren evaluación individual de cada vehículo.
                  </p>

                  <motion.button
                    onClick={handleSolicitarCotizacion}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transition-all"
                  >
                    Solicitar Cotización Personalizada
                  </motion.button>
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
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-red-500 relative overflow-hidden group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
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
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow group"
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