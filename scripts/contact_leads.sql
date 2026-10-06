-- Tabla que usa el sitio para guardar prospectos (formulario de contacto, cotizador Mapfre y asistente).
-- Solo es necesaria si se crea un proyecto nuevo de Supabase: ejecútala en SQL Editor.
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nombre TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  producto TEXT,
  mensaje TEXT
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante puede enviar el formulario, pero nadie puede leer los datos desde la web.
CREATE POLICY "Insertar prospectos desde el sitio"
  ON public.contact_leads FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at
  ON public.contact_leads (created_at DESC);
