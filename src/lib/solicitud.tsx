import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface OpcionesSolicitud {
  // Producto que se guarda con el prospecto (ej. "PPR Allianz")
  producto: string;
  titulo: string;
  descripcion?: string;
  // Sección de la página desde donde se pidió la información
  seccion: string;
  // Muestra un selector para que el cliente elija el tipo de seguro
  elegirProducto?: boolean;
  mensajeInicial?: string;
  // Datos extra que se guardan como columnas en Google Sheets (ej. la simulación del PPR)
  detalles?: Record<string, string | number>;
}

interface ValorContexto {
  solicitud: OpcionesSolicitud | null;
  abrirSolicitud: (opciones: OpcionesSolicitud) => void;
  cerrarSolicitud: () => void;
  asistenteAbierto: boolean;
  setAsistenteAbierto: (abierto: boolean) => void;
}

const SolicitudContexto = createContext<ValorContexto | null>(null);

/** Permite abrir la ventana de solicitud o el asistente desde cualquier botón de la página. */
export const SolicitudProvider = ({ children }: { children: React.ReactNode }) => {
  const [solicitud, setSolicitud] = useState<OpcionesSolicitud | null>(null);
  const [asistenteAbierto, setAsistenteAbierto] = useState(false);

  const abrirSolicitud = useCallback((opciones: OpcionesSolicitud) => {
    setAsistenteAbierto(false);
    setSolicitud(opciones);
  }, []);
  const cerrarSolicitud = useCallback(() => setSolicitud(null), []);

  const valor = useMemo(
    () => ({ solicitud, abrirSolicitud, cerrarSolicitud, asistenteAbierto, setAsistenteAbierto }),
    [solicitud, abrirSolicitud, cerrarSolicitud, asistenteAbierto]
  );

  return <SolicitudContexto.Provider value={valor}>{children}</SolicitudContexto.Provider>;
};

export const useSolicitud = () => {
  const contexto = useContext(SolicitudContexto);
  if (!contexto) throw new Error('useSolicitud debe usarse dentro de <SolicitudProvider>');
  return contexto;
};
