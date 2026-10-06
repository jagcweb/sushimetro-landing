/*
 * Aviso de cookies y Google Analytics para las páginas nuevas de sushimetro.app.
 *
 * Misma lógica que el script incrustado en la portada (Consent Mode v2, modo
 * básico): gtag.js no se descarga hasta que el visitante acepta. Usa la misma
 * clave de localStorage que la portada, así que la decisión que se tome en
 * cualquier página vale para todo el sitio.
 *
 * Requiere en la página un botón con el atributo data-open-cookies (en el pie)
 * para poder cambiar la decisión en cualquier momento.
 */
(function () {
  var GA_ID = 'G-QTYFDJVEN3';
  var KEY = 'sushimetro_cookies';

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.hidden = true;
  banner.innerHTML =
    '<p>Usamos Google Analytics para saber cuánta gente visita la web y cómo mejorarla. ' +
    'Solo se activa si lo aceptas, y puedes cambiar de opinión cuando quieras desde el pie de página. ' +
    '<a href="/privacy-policy.html">Más información</a></p>' +
    '<div class="cookie-actions">' +
    '<button type="button" data-consent="denied">Rechazar</button>' +
    '<button type="button" data-consent="granted" class="cookie-accept">Aceptar</button>' +
    '</div>';
  document.body.appendChild(banner);

  function cargarAnalytics() {
    if (window.__gaCargado) return;
    window.__gaCargado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function decidir(valor) {
    try { localStorage.setItem(KEY, valor); } catch (e) {}
    banner.hidden = true;
    if (valor === 'granted') {
      cargarAnalytics();
    } else if (window.__gaCargado) {
      gtag('consent', 'update', { analytics_storage: 'denied' });
      document.cookie.split(';').forEach(function (c) {
        var nombre = c.split('=')[0].trim();
        if (/^_ga/.test(nombre)) {
          document.cookie = nombre + '=; Max-Age=0; path=/; domain=.' + location.hostname.replace(/^www\./, '');
          document.cookie = nombre + '=; Max-Age=0; path=/';
        }
      });
    }
  }

  var guardado = null;
  try { guardado = localStorage.getItem(KEY); } catch (e) {}
  if (guardado === 'granted') cargarAnalytics();
  else if (guardado !== 'denied') banner.hidden = false;

  banner.addEventListener('click', function (e) {
    var v = e.target.getAttribute('data-consent');
    if (v) decidir(v);
  });
  document.querySelectorAll('[data-open-cookies]').forEach(function (b) {
    b.addEventListener('click', function () { banner.hidden = false; });
  });

  // Clics en enlaces marcados con data-step: mismo evento que usa la portada
  // para medir el embudo hacia la beta. Sin consentimiento no se envía nada.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-step]');
    if (a && window.__gaCargado) {
      gtag('event', 'beta_paso', { paso: a.getAttribute('data-step') });
    }
  });
})();
