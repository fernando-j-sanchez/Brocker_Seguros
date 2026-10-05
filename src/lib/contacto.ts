// Datos de contacto centralizados: si cambian, se actualizan aquí y en todo el sitio.
export const TELEFONO = '5559515885';
// WhatsApp exige el número en formato internacional: 52 (México) + 10 dígitos.
export const WHATSAPP_NUMERO = `52${TELEFONO}`;
export const CORREO = 'aargeliasorseguros@yahoo.com';

export const whatsappUrl = (mensaje = 'Hola, me podrías dar más información sobre los seguros que manejan, por favor.') =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
