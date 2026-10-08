import { supabase } from './supabase';

export type OrigenLead = 'formulario' | 'cotizador-mapfre' | 'asistente';

export interface Lead {
  origen: OrigenLead;
  nombre: string;
  email: string;
  telefono: string;
  producto: string;
  mensaje: string;
  // Datos extra (ej. vehículos de la flotilla). Van como columnas propias en Google Sheets.
  detalles?: Record<string, string | number>;
}

const guardarEnSupabase = async (lead: Lead) => {
  if (!supabase) throw new Error('Supabase no configurado');
  const { error } = await supabase.from('contact_leads').insert([
    {
      nombre: lead.nombre,
      email: lead.email,
      telefono: lead.telefono,
      producto: lead.producto,
      mensaje: lead.mensaje,
    },
  ]);
  if (error) throw error;
};

const guardarEnHojaDeCalculo = async (lead: Lead) => {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`Google Sheets respondió ${res.status}`);
};

/**
 * Guarda el prospecto en Supabase y en Google Sheets (exportable a Excel) al mismo tiempo.
 * Basta con que uno de los dos funcione para no perder el dato; por ejemplo, si
 * Supabase está pausado por inactividad, el registro queda en la hoja de cálculo.
 */
export const guardarLead = async (lead: Lead): Promise<boolean> => {
  const resultados = await Promise.allSettled([guardarEnSupabase(lead), guardarEnHojaDeCalculo(lead)]);
  resultados.forEach((r, i) => {
    if (r.status === 'rejected') console.warn(i === 0 ? 'Supabase:' : 'Google Sheets:', r.reason);
  });
  return resultados.some((r) => r.status === 'fulfilled');
};
