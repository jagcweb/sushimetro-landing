# 🍣 Sushimetro — Landing Page

Landing page estática para promocionar **Sushimetro** y ofrecer la descarga directa del APK para Android.

## 📂 Estructura

```
Sushi Counter Landing/
├── index.html            # Landing principal (hero, features, ranking, leaderboard, CTA)
├── privacy-policy.html    # Política de privacidad (enlazada desde el footer)
├── assets/
│   ├── favicon.png               # Favicon (icono de Sushimetro)
│   ├── icon-96.png                # Logo para la barra de navegación
│   ├── icon-256.png                # Logo en mayor resolución
│   ├── screenshot-counter.jpeg     # Captura: pantalla de contador
│   ├── screenshot-stats.jpeg       # Captura: estadísticas y ranking
│   ├── screenshot-achievements.jpeg# Captura: logros desbloqueados
│   └── sushimetro.apk              # ⚠️ APK de la app — debes añadirlo tú (ver abajo)
└── README.md
```

## 📲 Publicar el APK de descarga

El botón "Descargar para Android" (en el hero y en la sección final) apunta a:

```
assets/sushimetro.apk
```

Ese archivo **no está incluido** todavía. Para generarlo y publicarlo:

```bash
# Desde la carpeta del proyecto "Sushi Counter"
eas build --platform android --profile preview
```

Cuando termine el build, descarga el `.apk` resultante, renómbralo a `sushimetro.apk` y colócalo en `assets/` de esta carpeta. El botón de descarga empezará a funcionar automáticamente, sin tocar el HTML.

## ✏️ Actualizar contenido

Todo el texto, paleta de colores y datos de ranking están escritos directamente en `index.html` (no hay build ni dependencias):

- **Colores / tema**: variables CSS en `:root` al inicio del `<style>` (paleta calcada de `src/constants/theme.js` del proyecto principal).
- **Rangos** (Hierro → Sushi God): sección `.rank-row`.
- **Leaderboard de ejemplo**: sección `.leaderboard` (datos ficticios de muestra, no reales).
- **Capturas de pantalla**: sección `.gallery`.
- **Email de contacto**: `hola@jagcweb.es` (footer y `privacy-policy.html`).

## 🚀 Publicar la landing

Al ser HTML/CSS puro sin build, puedes desplegarla tal cual en cualquier hosting estático:

- **Netlify / Vercel**: arrastra la carpeta o conéctala a un repo.
- **GitHub Pages**: sube el contenido a un repo y activa Pages.
- **Hosting propio**: sube la carpeta completa por FTP/SFTP.

Solo asegúrate de subir también la carpeta `assets/` (incluido el APK) junto con `index.html` y `privacy-policy.html`.
