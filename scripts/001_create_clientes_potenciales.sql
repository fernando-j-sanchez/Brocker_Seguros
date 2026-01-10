-- Crear tabla para almacenar clientes potenciales y sus simulaciones
CREATE TABLE IF NOT EXISTS public.clientes_potenciales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Datos de contacto del cliente
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  correo TEXT NOT NULL,
  mensaje TEXT,
  servicio_interes TEXT,
  
  -- Datos de simulación PPR (opcionales)
  tiene_simulacion BOOLEAN DEFAULT FALSE,
  monto_mensual NUMERIC,
  edad_actual INTEGER,
  edad_retiro INTEGER,
  monto_inicial NUMERIC,
  proyeccion_final NUMERIC,
  total_aportaciones NUMERIC,
  total_rendimientos NUMERIC,
  rendimiento_anual NUMERIC DEFAULT 13.0,
  
  -- Metadata
  fuente TEXT DEFAULT 'formulario_web',
  ip_address TEXT,
  user_agent TEXT
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.clientes_potenciales ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (sin autenticación)
-- Esto permite que cualquier visitante del sitio web pueda enviar el formulario
CREATE POLICY "Permitir inserción pública de clientes potenciales"
  ON public.clientes_potenciales
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados (para el panel de admin futuro)
CREATE POLICY "Permitir lectura solo a usuarios autenticados"
  ON public.clientes_potenciales
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Crear índice para búsquedas más rápidas por fecha
CREATE INDEX IF NOT EXISTS idx_clientes_potenciales_created_at 
  ON public.clientes_potenciales(created_at DESC);

-- Crear índice para búsquedas por correo
CREATE INDEX IF NOT EXISTS idx_clientes_potenciales_correo 
  ON public.clientes_potenciales(correo);
