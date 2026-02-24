import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoPlayer } from './VideoPlayer';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, PiggyBank, MessageCircle } from 'lucide-react';

export const AllianzPPR = () => {
  const [age, setAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [monthly, setMonthly] = useState<number>(5000);
  const [initial, setInitial] = useState<number>(0);
  const [rate, setRate] = useState<number>(10);
  const [showTable, setShowTable] = useState(false);
  const [projection, setProjection] = useState<any[]>([]);

  const rateOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12];

  useEffect(() => {
    calculateProjection();
  }, [age, retirementAge, monthly, initial, rate]);

  const calculateProjection = () => {
    const years = retirementAge - age;
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

  // Lógica de validación actualizada (17 años mínimo)
  const handleAgeBlur = () => {
    let finalAge = age;
    if (age < 17 || age === 0) finalAge = 17;
    setAge(finalAge);
    
    // Si tiene 17 o 18, el monto mínimo es 3000
    if ((finalAge === 17 || finalAge === 18) && monthly < 3000) {
      setMonthly(3000);
    }
    if (retirementAge <= finalAge) setRetirementAge(finalAge + 1);
  };

  const handleMonthlyBlur = () => {
    const minRequired = (age === 17 || age === 18) ? 3000 : 1000;
    if (monthly < minRequired) setMonthly(minRequired);
  };

  return (
    <section id="allianz" className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Calculadora <span className="text-blue-600">PPR Allianz</span>
        </motion.h2>

        {/* Card Principal: Video + Formulario */}
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 mb-8">
          <div className="lg:w-1/2 relative bg-black min-h-[350px]">
            <VideoPlayer videoSrc="/videos/All1.mp4" />
            <style>{`video { width: 100%; height: 100%; object-fit: cover; }`}</style>
          </div>

          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase mb-6 tracking-tight">Configura tu Inversión</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Edad Actual</label>
                <input type="number" value={age || ''} onChange={(e) => setAge(Number(e.target.value))} onBlur={handleAgeBlur} className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Edad Retiro</label>
                <input type="number" value={retirementAge || ''} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Mensualidad</label>
                <input type="number" value={monthly || ''} onChange={(e) => setMonthly(Number(e.target.value))} onBlur={handleMonthlyBlur} className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">Plazo (%)</label>
                <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-2.5 bg-gray-50 border rounded-xl dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
                  {rateOptions.map(r => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
            </div>

            <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all mb-3 shadow-lg shadow-blue-100">
              Quiero empezar mi plan de retiro
            </button>
            <a href="https://wa.me/5559515885" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all">
              <MessageCircle size={18} /> Contactar Asesor
            </a>
          </div>
        </div>

        {/* Totales */}
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
          <button onClick={() => setShowTable(!showTable)} className="w-full p-5 flex justify-between items-center font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span>Ver tabla de proyección detallada</span>
            {showTable ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          <AnimatePresence>
            {showTable && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t dark:border-gray-700">
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

        {/* Nota Legal */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          <span className="font-bold text-blue-800 dark:text-blue-300 mr-1 uppercase">Nota:</span> 
          Estos números son una proyección estimada y sirven únicamente como referencia. El monto final puede variar según las condiciones del mercado, las comisiones de la operación y el plan específico que elijas. Para una cifra definitiva y legal, es indispensable validarlo con tu asesor financiero, ya que este cálculo no constituye un contrato ni una oferta de inversión.
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