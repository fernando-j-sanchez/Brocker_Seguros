import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappUrl } from '../lib/contacto';
import { Revelar } from './Revelar';
import { useSolicitud } from '../lib/solicitud';
import { WhatsAppIcon } from './Iconos';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, PiggyBank, CheckCircle2 } from 'lucide-react';

export const AllianzPPR = () => {
  const { abrirSolicitud } = useSolicitud();
  const [age, setAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [years, setYears] = useState<number>(35); // Calculado: retirementAge - age
  const [monthly, setMonthly] = useState<number>(5000);
  const [initial, setInitial] = useState<number>(0);
  const [rate, setRate] = useState<number>(10);
  const [showTable, setShowTable] = useState(false);
  const [projection, setProjection] = useState<any[]>([]);
  const [validationError, setValidationError] = useState<string>('');

  const rateOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12];

  // Actualizar años cuando cambian las edades
  useEffect(() => {
    const newYears = retirementAge - age;
    setYears(newYears > 0 ? newYears : 0);
  }, [age, retirementAge]);

  // Validar condiciones
  useEffect(() => {
    if (years < 10) {
      setValidationError('El plazo mínimo de inversión es de 10 años');
    } else if (years === 10 && monthly < 3000) {
      setValidationError('Para un plazo de 10 años, el monto mínimo es de $3,000 mensuales');
    } else {
      setValidationError('');
    }
  }, [years, monthly]);

  useEffect(() => {
    if (years >= 10 && !(years === 10 && monthly < 3000)) {
      calculateProjection();
    }
  }, [age, retirementAge, years, monthly, initial, rate]);

  const calculateProjection = () => {
    if (years <= 0) {
      setProjection([]);
      return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    let data = [];
    let totalContributions = initial;
    let currentValue = initial;

    for (let month = 0; month <= totalMonths; month++) {
      if (month > 0 && month <= totalMonths) {
        totalContributions += monthly;
        currentValue = (currentValue + monthly) * (1 + monthlyRate);
      }
      if (month % 12 === 0 || month === totalMonths) {
        data.push({
          year: age + month / 12,
          aportaciones: Math.round(totalContributions),
          total: Math.round(currentValue),
          rendimientos: Math.round(currentValue - totalContributions)
        });
      }
    }
    setProjection(data);
  };

  const totalAportado = projection.length > 0 ? projection[projection.length - 1].aportaciones : 0;
  const totalFinal = projection.length > 0 ? projection[projection.length - 1].total : 0;
  const totalRendimientos = projection.length > 0 ? projection[projection.length - 1].rendimientos : 0;

  // Validación al perder foco
  const handleAgeBlur = () => {
    let finalAge = age;
    if (age < 18 || age === 0) finalAge = 18;
    setAge(finalAge);
    if (retirementAge <= finalAge) setRetirementAge(finalAge + 10);
  };

  const handleRetirementBlur = () => {
    if (retirementAge <= age) {
      setRetirementAge(age + 10);
    }
  };

  const handleMonthlyBlur = () => {
    if (years === 10 && monthly < 3000) {
      setMonthly(3000);
    } else if (monthly < 0) {
      setMonthly(0);
    }
  };

  return (
    <section id="allianz" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <Revelar className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Allianz</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Calculadora <span className="text-blue-600 dark:text-blue-400">PPR</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">Descubre cuánto podrías juntar para tu retiro.</p>
        </Revelar>

        {/* Card Principal: Video + Formulario */}
        <Revelar className="flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 mb-8">
          {/* Panel de beneficios (reemplaza el video de la campaña olímpica, que ya terminó).
              Si llega un video nuevo de Allianz, se puede volver a usar <VideoPlayer videoSrc="/videos/archivo.mp4" />. */}
          <div className="lg:w-1/2 relative min-h-[350px] overflow-hidden bg-gradient-to-br from-[#003781] via-blue-800 to-blue-600 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase">Plan Personal de Retiro</span>
              <h3 className="mt-4 text-3xl sm:text-4xl font-black leading-tight">Tu retiro,<br />en tus manos.</h3>
              <p className="mt-3 text-blue-100 max-w-sm">Empieza hoy y deja que el interés compuesto trabaje para ti.</p>
            </div>

            {/* Barras de crecimiento animadas */}
            <div aria-hidden="true" className="relative flex items-end gap-2 h-24 my-6">
              {[18, 26, 34, 45, 58, 72, 88, 100].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-white/25 to-white/70"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                />
              ))}
            </div>

            <ul className="relative grid sm:grid-cols-2 gap-3 text-sm">
              {[
                'Aportaciones deducibles de impuestos*',
                'Plazo desde 10 años',
                'Tú decides cuánto aportar',
                'Respaldo de Allianz'
              ].map((beneficio) => (
                <li key={beneficio} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-300 flex-shrink-0" />
                  <span>{beneficio}</span>
                </li>
              ))}
            </ul>
            <p className="relative mt-4 text-[11px] text-blue-200">*Dentro de los límites que marca la ley. Tu asesor te confirma tu caso.</p>
          </div>

          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase mb-6 tracking-tight">Configura tu Inversión</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Edad Actual</label>
                <input 
                  type="number" 
                  value={age || ''} 
                  onChange={(e) => setAge(Number(e.target.value))} 
                  onBlur={handleAgeBlur}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" 
                  min="18"
                  max="80"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Edad Retiro</label>
                <input 
                  type="number" 
                  value={retirementAge || ''} 
                  onChange={(e) => setRetirementAge(Number(e.target.value))} 
                  onBlur={handleRetirementBlur}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" 
                  min={age + 10}
                  max="100"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Mensualidad</label>
                <input 
                  type="number" 
                  value={monthly || ''} 
                  onChange={(e) => setMonthly(Number(e.target.value))} 
                  onBlur={handleMonthlyBlur}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" 
                  min="0"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Plazo (%)</label>
                <select 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))} 
                  className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {rateOptions.map(r => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
            </div>

            {/* Mostrar años de inversión */}
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Plazo de inversión: <span className="font-bold text-blue-600">{years} años</span>
              {years < 10 && (
                <span className="ml-2 text-red-500 text-xs">(mínimo 10 años)</span>
              )}
            </div>

            {/* Mensaje de validación */}
            {validationError && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{validationError}</p>
              </div>
            )}

            <button 
              onClick={() =>
                abrirSolicitud({
                  producto: 'PPR Allianz',
                  titulo: 'Empieza tu plan de retiro',
                  descripcion: `Tu simulación: $${monthly.toLocaleString('es-MX')} al mes durante ${years} años, con un saldo estimado de $${totalFinal.toLocaleString('es-MX')}.`,
                  seccion: 'Calculadora PPR',
                  detalles: {
                    'Edad actual': age,
                    'Edad de retiro': retirementAge,
                    'Aportación mensual': monthly,
                    'Rendimiento estimado': `${rate}%`,
                    'Saldo estimado': totalFinal
                  }
                })
              } 
              disabled={!!validationError}
              className={`w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all mb-3 shadow-lg shadow-blue-100 ${validationError ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Quiero empezar mi plan de retiro
            </button>
            <a 
              href={whatsappUrl(`Hola, me interesa el PPR Allianz. Tengo ${age} años y me gustaría ahorrar $${monthly.toLocaleString('es-MX')} al mes para retirarme a los ${retirementAge}.`)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all"
            >
              <WhatsAppIcon className="w-[18px] h-[18px]" /> Contactar Asesor
            </a>
          </div>
        </Revelar>

        {/* Totales - Solo mostrar si hay proyección válida */}
        {!validationError && projection.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total Aportado" value={totalAportado} icon={<DollarSign className="text-blue-600" />} />
              <StatCard label="Rendimientos" value={totalRendimientos} icon={<TrendingUp className="text-green-600" />} />
              <StatCard label="Saldo Final" value={totalFinal} icon={<PiggyBank className="text-purple-600" />} />
            </div>

            {/* Gráfica */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border dark:border-gray-700 mb-8">
              <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Proyección de Crecimiento</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projection}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(val: number) => `$${val.toLocaleString()}`} />
                    <Legend />
                    <Area type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Saldo Estimado" />
                    <Area type="monotone" dataKey="aportaciones" stroke="#94a3b8" strokeWidth={2} fill="transparent" name="Tus Aportaciones" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabla de Amortización Expandible */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden">
              <button 
                onClick={() => setShowTable(!showTable)} 
                className="w-full p-5 flex justify-between items-center font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>Ver tabla de proyección detallada</span>
                {showTable ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              <AnimatePresence>
                {showTable && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="border-t dark:border-gray-700"
                  >
                    <div className="p-4 overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="border-b dark:border-gray-700 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <th className="py-3 px-2">Edad</th>
                            <th className="text-right px-2">Aportaciones</th>
                            <th className="text-right px-2">Rendimientos</th>
                            <th className="text-right px-2">Valor Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projection.map((r, i) => (
                            <tr key={i} className="border-b dark:border-gray-700 last:border-0 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                              <td className="py-3 px-2 font-medium">{Math.round(r.year)} años</td>
                              <td className="text-right px-2">${r.aportaciones.toLocaleString()}</td>
                              <td className="text-right px-2 text-green-500 font-medium">+${r.rendimientos.toLocaleString()}</td>
                              <td className="text-right px-2 font-bold text-blue-600">${r.total.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Nota Legal - Versión actualizada */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          <span className="font-bold text-blue-800 dark:text-blue-300 mr-1 uppercase">Nota:</span> 
          Estos números son una proyección estimada y sirven únicamente como referencia. El monto final puede variar según las condiciones del mercado, las comisiones de la operación y el plan específico que elijas. 
          <span className="font-semibold text-blue-700 dark:text-blue-300"> El porcentaje de rendimiento depende del tipo de inversión seleccionada. Para una validación precisa y una cifra definitiva y legal, es indispensable contactar a tu asesor financiero, ya que este cálculo no constituye un contrato ni una oferta de inversión.</span>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border dark:border-gray-700 flex items-center gap-4">
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black text-gray-900 dark:text-white">${value.toLocaleString()}</p>
    </div>
  </div>
);