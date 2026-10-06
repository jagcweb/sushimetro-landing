/*
 * Contador de sushi web de sushimetro.app.
 *
 * Varios comensales, +1 / -1 por persona, total por persona y de la mesa, y
 * reinicio. Todo vive en localStorage: no hay backend ni se envía nada.
 * Los nombres los escribe el usuario, así que siempre se pintan con
 * textContent y nunca con innerHTML.
 */
(function () {
  'use strict';

  var CLAVE = 'sushimetro_contador_web_v1';
  var MAX_COMENSALES = 20;
  var MAX_NOMBRE = 24;

  var lista = document.getElementById('comensales');
  var vacio = document.getElementById('vacio');
  var totalMesa = document.getElementById('totalMesa');
  var totalMesaUnidad = document.getElementById('totalMesaUnidad');
  var numComensales = document.getElementById('numComensales');
  var form = document.getElementById('formAnadir');
  var inputNombre = document.getElementById('nombreNuevo');
  var aviso = document.getElementById('avisoAnadir');
  var btnReiniciar = document.getElementById('reiniciar');

  function nuevoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function estadoInicial() {
    return { comensales: [{ id: nuevoId(), nombre: 'Yo', piezas: 0 }] };
  }

  // Lo guardado puede venir de una versión anterior o haberse tocado a mano:
  // se valida campo a campo y, si algo no cuadra, se empieza de cero.
  function cargar() {
    try {
      var datos = JSON.parse(localStorage.getItem(CLAVE));
      if (!datos || !Array.isArray(datos.comensales)) return estadoInicial();
      var comensales = datos.comensales
        .filter(function (c) { return c && typeof c.nombre === 'string' && c.nombre.trim(); })
        .slice(0, MAX_COMENSALES)
        .map(function (c) {
          var piezas = parseInt(c.piezas, 10);
          return {
            id: typeof c.id === 'string' && c.id ? c.id : nuevoId(),
            nombre: c.nombre.trim().slice(0, MAX_NOMBRE),
            piezas: isFinite(piezas) && piezas > 0 ? piezas : 0
          };
        });
      return { comensales: comensales };
    } catch (e) {
      return estadoInicial();
    }
  }

  var estado = cargar();

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {}
  }

  function plural(n, uno, varios) { return n === 1 ? uno : varios; }

  function buscar(id) {
    for (var i = 0; i < estado.comensales.length; i++) {
      if (estado.comensales[i].id === id) return estado.comensales[i];
    }
    return null;
  }

  function crearBoton(clase, texto, accion, id, etiqueta) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = clase;
    b.textContent = texto;
    b.setAttribute('data-accion', accion);
    b.setAttribute('data-id', id);
    b.setAttribute('aria-label', etiqueta);
    return b;
  }

  function pintar() {
    var comensales = estado.comensales;
    var total = 0;
    var maximo = 0;
    comensales.forEach(function (c) {
      total += c.piezas;
      if (c.piezas > maximo) maximo = c.piezas;
    });

    totalMesa.textContent = total;
    totalMesaUnidad.textContent = plural(total, 'pieza', 'piezas');
    numComensales.textContent = comensales.length + ' ' + plural(comensales.length, 'comensal', 'comensales');
    vacio.hidden = comensales.length > 0;
    btnReiniciar.disabled = total === 0;

    lista.textContent = '';
    comensales.forEach(function (c) {
      // La corona solo tiene sentido si hay con quién competir y alguien ha comido.
      var lider = comensales.length > 1 && maximo > 0 && c.piezas === maximo;

      var li = document.createElement('li');
      li.className = 'comensal' + (lider ? ' es-lider' : '');

      var cab = document.createElement('div');
      cab.className = 'comensal-cab';
      var nombre = document.createElement('span');
      nombre.className = 'comensal-nombre';
      nombre.textContent = (lider ? '👑 ' : '') + c.nombre;
      cab.appendChild(nombre);
      cab.appendChild(crearBoton('comensal-quitar', '×', 'quitar', c.id, 'Quitar a ' + c.nombre));

      var num = document.createElement('div');
      num.className = 'comensal-piezas';
      num.textContent = c.piezas;
      var unidad = document.createElement('div');
      unidad.className = 'comensal-unidad';
      unidad.textContent = plural(c.piezas, 'pieza', 'piezas');

      var botones = document.createElement('div');
      botones.className = 'comensal-botones';
      var menos = crearBoton('btn-menos', '−1', 'menos', c.id, 'Restar una pieza a ' + c.nombre);
      menos.disabled = c.piezas === 0;
      botones.appendChild(menos);
      botones.appendChild(crearBoton('btn-mas', '+1', 'mas', c.id, 'Sumar una pieza a ' + c.nombre));

      li.appendChild(cab);
      li.appendChild(num);
      li.appendChild(unidad);
      li.appendChild(botones);
      lista.appendChild(li);
    });
  }

  function cambiar() {
    guardar();
    pintar();
  }

  lista.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-accion]');
    if (!btn) return;
    var c = buscar(btn.getAttribute('data-id'));
    if (!c) return;
    var accion = btn.getAttribute('data-accion');

    if (accion === 'mas') {
      c.piezas += 1;
      if (navigator.vibrate) navigator.vibrate(12);
    } else if (accion === 'menos') {
      if (c.piezas > 0) c.piezas -= 1;
    } else if (accion === 'quitar') {
      if (c.piezas > 0 && !window.confirm('¿Quitar a ' + c.nombre + '? Se perderán sus ' + c.piezas + ' ' + plural(c.piezas, 'pieza', 'piezas') + '.')) return;
      estado.comensales = estado.comensales.filter(function (x) { return x.id !== c.id; });
    }
    cambiar();

    // Tras quitar a alguien el botón desaparece: se devuelve el foco al campo
    // de nombre para que quien navega con teclado no se pierda.
    if (accion === 'quitar') inputNombre.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = inputNombre.value.trim().slice(0, MAX_NOMBRE);
    aviso.textContent = '';
    if (!nombre) {
      aviso.textContent = 'Escribe un nombre para añadir al comensal.';
      inputNombre.focus();
      return;
    }
    if (estado.comensales.length >= MAX_COMENSALES) {
      aviso.textContent = 'Como máximo caben ' + MAX_COMENSALES + ' comensales en la mesa.';
      return;
    }
    var repetido = estado.comensales.some(function (c) { return c.nombre.toLowerCase() === nombre.toLowerCase(); });
    if (repetido) {
      aviso.textContent = 'Ya hay alguien con ese nombre en la mesa.';
      inputNombre.select();
      return;
    }
    estado.comensales.push({ id: nuevoId(), nombre: nombre, piezas: 0 });
    inputNombre.value = '';
    cambiar();
  });

  btnReiniciar.addEventListener('click', function () {
    if (!window.confirm('¿Poner a cero las piezas de todos los comensales? Los nombres se mantienen.')) return;
    estado.comensales.forEach(function (c) { c.piezas = 0; });
    cambiar();
  });

  // Si el contador está abierto en dos pestañas, se mantienen sincronizadas.
  window.addEventListener('storage', function (e) {
    if (e.key === CLAVE) { estado = cargar(); pintar(); }
  });

  pintar();
})();
