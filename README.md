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
│   └── screenshot-achievements.jpeg# Captura: logros desbloqueados
└── README.md
```

## 📲 Publicar el APK de descarga

El APK **no vive en este repo** (supera el límite de 100MB de GitHub para archivos normales). Se publica como asset de un **GitHub Release** y los botones "Descargar para Android" (hero y CTA final) enlazan directamente a esa URL:

```
https://github.com/jagcweb/sushimetro-landing/releases/download/apk-v1.0.0/sushimetro.apk
```

Para publicar una nueva versión del APK:

```bash
# Desde la carpeta del proyecto "Sushi Counter"
eas build --platform android --profile preview
```

1. Descarga el `.apk` generado y renómbralo a `sushimetro.apk`.
2. Ve a `https://github.com/jagcweb/sushimetro-landing/releases/new`, crea un tag nuevo (p. ej. `apk-v1.1.0`) y sube el archivo como asset.
3. Actualiza los dos enlaces `href` en `index.html` (busca `releases/download/`) con la nueva URL del release.

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

Solo asegúrate de subir también la carpeta `assets/` junto con `index.html` y `privacy-policy.html`. El APK se sirve aparte, desde GitHub Releases (ver sección anterior).
