# Sovrana: sitio web

Sitio estático (HTML + CSS + JS, sin dependencias). Se abre con doble clic en `index.html` y se publica subiendo la carpeta a cualquier hosting: Netlify, Vercel, GitHub Pages, Hostinger, cPanel…

```
index.html   → estructura y textos
styles.css   → diseño (colores y tipografías en :root)
script.js    → catálogo de talento, filtros, formularios y animaciones
img/         → tus fotos (créala tú, ver abajo)
```

## 1. Fotos

Mientras no existan, el sitio muestra placeholders de color con textura. Cuando subas una foto con el nombre indicado, aparecerá automáticamente.

| Ruta | Uso | Proporción |
|---|---|---|
| `img/hero.jpg` | Imagen principal | 4:5 vertical |
| `img/categorias/{kids,baile,musica,moda,ugc}.jpg` | Vista previa al pasar el cursor por el índice | 4:5 |
| `img/trabajos/{categoria}-{1,2,3}.jpg` | Ejemplos de trabajo (ej. `moda-2.jpg`) | 3:4 (UGC 9:16) |
| `img/nosotros.jpg` | Sobre nosotros | 3:4 |
| `img/talento/*.jpg` | Fotos del catálogo (campo `foto` en `script.js`) | 4:5 |
| `img/og.jpg` | Vista previa al compartir en redes | 1200×630 |

Recomendación: JPG o WebP, máximo 1600 px de ancho y menos de 300 KB por foto, para que el sitio cargue rápido.

## 2. Catálogo de modelos

Edita el arreglo `TALENT` al inicio de `script.js`. Cada talento tiene esta forma:

```js
{ id: "valentina", nombre: "Valentina", cats: ["moda", "musica"], edad: 24, altura: 176,
  tags: ["Editorial", "Pasarela"], bio: "…", foto: "img/talento/valentina.jpg" }
```

Las categorías válidas son `kids`, `baile`, `musica`, `moda` y `ugc`. Los contadores de los filtros se calculan solos. Para menores de edad muestra solo el nombre de pila; la ficha indica "Con tutor legal".

Los 16 perfiles que trae el archivo son de ejemplo y hay que reemplazarlos.

## 3. Formularios

Sin configurar, funcionan en **modo demostración**: validan y muestran el mensaje de éxito, pero no envían nada. Para recibir las solicitudes:

1. Crea dos formularios gratis en [formspree.io](https://formspree.io) (u otro servicio similar).
2. Pega sus URLs en `CONFIG.FORM_ENDPOINT` dentro de `script.js`:

```js
FORM_ENDPOINT: {
  casting: "https://formspree.io/f/xxxxxxx",
  aplicacion: "https://formspree.io/f/yyyyyyy",
},
```

Ten en cuenta que adjuntar fotos en Formspree requiere un plan de pago. Otra opción es reemplazar el campo de fotos por un link a Drive o Instagram.

## 4. Datos que debes reemplazar en `index.html`

- Correo `hola@sovrana.com` (aparece en 3 lugares; búscalo).
- Dirección, horario, teléfono y enlace de WhatsApp en la sección **Contacto**.
- Enlaces de Instagram, TikTok, LinkedIn y YouTube.
- Cifras de **Sobre nosotros** (atributos `data-count`).
- Enlaces de Privacidad y Términos en el footer.
- Rangos de presupuesto (están en USD) en el formulario de casting.

## 5. Ajustes de diseño

En `styles.css`, dentro de `:root`:
- `--accent`: color de acento (hoy bermellón `#FF4B1F`).
- `--paper` / `--ink`: fondo claro y tinta.
- `--serif` / `--sans`: tipografías (Instrument Serif + Inter Tight, de Google Fonts).

Las animaciones respetan la preferencia de "reducir movimiento" del sistema.
