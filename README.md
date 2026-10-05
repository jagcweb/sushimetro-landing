# 🍣 Sushimetro — Landing Page

Landing page estática de **Sushimetro**, publicada con GitHub Pages (rama `master`) en [https://sushimetro.app/](https://sushimetro.app/).

## 📂 Estructura

```
├── index.html                 # Landing principal
├── privacy-policy.html        # Política de privacidad
├── delete-account.html        # Eliminación de cuenta
├── 404.html                   # Página no encontrada
├── robots.txt
├── sitemap.xml
├── CNAME                      # sushimetro.app
├── assets/
│   ├── favicon.png
│   ├── icon-96.png
│   ├── icon-256.png
│   ├── og-image.png
│   ├── screenshot-counter-new.png
│   ├── screenshot-stats-new.png
│   ├── screenshot-achievements-new.png
│   ├── screenshot-counter.jpeg        # captura anterior, no enlazada
│   ├── screenshot-stats.jpeg
│   └── screenshot-achievements.jpeg
└── README.md
```

## 📲 Publicar el APK de descarga

Los botones de la portada apuntan a la beta de Google Play (`#descargar` en `index.html`). El APK **no vive en este repo** (supera el límite de 100MB de GitHub para archivos normales). Si hay que volver a servir un APK, se publica como asset de un **GitHub Release** y se actualizan los enlaces:

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
