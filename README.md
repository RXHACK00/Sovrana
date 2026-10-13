# Sovrana: sitio web (v2)

Sitio estático (HTML + CSS + JS, sin dependencias). Se abre con doble clic en `index.html` y se publica subiendo la carpeta a cualquier hosting: Netlify, Vercel, GitHub Pages, Hostinger, cPanel…

```
index.html        → estructura y textos
styles.css        → diseño (colores y tipografías en :root)
script.js         → talento, castings, cotizador, formularios y animaciones
logo/             → logo en SVG + hoja de marca (logo/marca.html)
img/              → tus fotos (créala tú, ver abajo)
v1/               → la versión anterior del sitio, por si la necesitas
```

## Qué trae

- **Intro animada**: el logo se dibuja solo y una cortina revela la página (solo la primera vez por sesión).
- **Hero interactivo**: aurora de color que sigue al cursor, tarjetas flotantes con profundidad y selector **Soy marca / Soy talento** que cambia textos y botones.
- **Cinta "En vivo"**: se arma sola con los castings abiertos y el talento disponible.
- **Manifiesto** que se ilumina palabra por palabra al bajar.
- **Disciplinas** con scroll horizontal (en el celular se deslizan con el dedo).
- **Roster**: búsqueda, filtros, "disponibles esta semana", orden, tarjetas con efecto 3D y ficha con navegación ← →.
- **Mi selección**: las marcas guardan talentos con ♥, comparten la lista por link o WhatsApp y la envían en el brief.
- **Cotizador instantáneo** con desglose, que se adjunta al brief.
- **Brief y aplicación en 3 pasos**, con vista previa de fotos y datos del tutor para menores.
- **Castings abiertos** con fecha de cierre y botón "Postularme".
- FAQ separadas para marcas y talento, testimonios, botón flotante de WhatsApp y cursor personalizado.

## 1. Fotos

Mientras no existan, el sitio muestra degradados de color. Cuando subas una foto con el nombre indicado, aparece sola.

| Ruta | Uso | Proporción |
|---|---|---|
| `img/hero-1.jpg` … `hero-5.jpg` | Tarjetas flotantes del inicio (moda, videoclip, baile, UGC, kids) | 4:5 (la 4 es 9:16) |
| `img/trabajos/{kids,baile,musica,moda,ugc}-{1,2,3}.jpg` | Trabajos de cada disciplina | 3:4 (UGC 9:16) |
| `img/talento/*.jpg` | Fotos del roster (campo `foto` en `script.js`) | 4:5 |
| `img/og.jpg` | Vista previa al compartir en redes | 1200×630 |

Recomendación: JPG o WebP, máximo 1600 px de ancho y menos de 300 KB por foto.

## 2. Todo lo editable está al inicio de `script.js`

- `CONFIG.FORM_ENDPOINT`: URLs de Formspree (u otro servicio) para recibir el brief y las aplicaciones. Vacío = modo demostración (valida pero no envía).
- `CONFIG.WHATSAPP`: tu número.
- `CONFIG.PRECIOS`: tarifas del cotizador (en USD). **Los valores actuales son de ejemplo**: ajústalos a tus tarifas reales.
- `TALENT`: el roster. Los 16 perfiles son de ejemplo. `disponible: true` activa la etiqueta verde.
- `CASTINGS`: castings abiertos. Los que pasan su fecha `cierra` se ocultan solos.

## 3. Datos que debes reemplazar en `index.html`

- **Logos de clientes** y **testimonios** (bloques marcados con `REEMPLAZAR`): son de ejemplo y no deben publicarse como reales.
- Cifras del manifiesto (`data-count`) y del hero (48 h, 250+, 5).
- Correo `hola@sovrana.com`, dirección, horario, teléfono y enlaces de WhatsApp y redes.
- Enlaces de Privacidad y Términos en el footer.

## 4. Diseño

En `styles.css`, dentro de `:root`: colores (`--champ`, `--gold`, `--orchid`, `--indigo`, `--grad`) y tipografías (Bodoni Moda + Manrope, de Google Fonts). Las animaciones respetan la opción "reducir movimiento" del sistema.

Para saltar la intro al probar, abre `index.html?intro=0`.
