# Campaña · Instala con BSE

Landing de la campaña de 250 € de descuento en instalación fotovoltaica, válida hasta
el 31 de diciembre de 2026.

- `index.html` — la página que ve el cliente. `?v=MARCA` guarda qué comercial repartió el enlace.
- `enviar/index.html` — herramienta interna del comercial: escribe nombre y teléfono y le abre
  WhatsApp con el mensaje escrito.
- `preview.png` — tarjeta de previsualización para WhatsApp y redes.

El formulario escribe en la hoja `BSE · Referidos`, pestaña `CAMPANA`, a través del Apps
Script de referidos (rama `pg: "CAM"`). Los ficheros se generan con `construir_instala.py`;
no editar el HTML a mano.
