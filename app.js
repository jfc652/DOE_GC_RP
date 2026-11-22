/* Générateur de DOE GC RP — HTML / CSS / JavaScript pur, sans dépendance. */
(function () {
  'use strict';

  var DEFAULT_LOGO_LEFT = 'assets/logo-free.png';
  var DEFAULT_LOGO_RIGHT = 'assets/logo-topsat.png';
  var DEFAULT_LEGEND = 'assets/legende.png';
  var DEFAULT_COUPE = 'assets/coupe-type.png';
  /* Copie de assets/listes.csv, utilisée si le fichier n'est pas accessible (ouverture en file://). */
  var EMBEDDED_CSV = /*CSV_START*/"liste;valeur\nversion;(V1)\nversion;(V2)\nversion;(V3)\nversion;(V4)\nversion;(V5)\nposeModes;Tranch\u00e9e traditionnel Trottoir\nposeModes;Tranch\u00e9e traditionnel chauss\u00e9e\nposeModes;Tranch\u00e9e, traditionnel trottoir non stabilis\u00e9.\nposeModes;Tranch\u00e9e traditionnelle accotement / espace vert\nposeModes;Tranch\u00e9e traditionnelle sous chauss\u00e9e\nposeModes;Tranch\u00e9e traditionnelle sous trottoir\nposeModes;Micro-tranch\u00e9e trottoir\nposeModes;Micro-tranch\u00e9e chauss\u00e9e\nposeModes;Fon\u00e7age / forage dirig\u00e9\nposeModes;Pose en fourreaux existants\nposeModes;Percussion de chambre\nfourreaux;(3 PVC 42/45 avec Plynox)\nfourreaux;(2 PVC 42/45 avec Plynox)\nfourreaux;(1 PVC 42/45 avec Plynox)\nfourreaux;(4 PVC 42/45 avec Plynox)\nfourreaux;(2 PVC 42/45 + 1 PVC 42/45 en attente + Plynox)\nfourreaux;(3 PEHD 40/33 avec Plynox)\nfourreaux;(2 PEHD 40/33 avec Plynox)\nfourreaux;(1 PEHD 40/33 avec Plynox)\nfourreaux;(3 PVC 42/45 sans Plynox)\nfourreaux;(Fourreaux existants r\u00e9utilis\u00e9s)\nchambers;1 L1T\nchambers;1 L2T\nchambers;1 L3T\nchambers;2 L1T\nchambers;2 L2T\nchambers;1 L2T et 1 L1T\nchambers;1 L2T et 2 L1T\nchambers;2 L2T et 1 L1T\nchambers;1 L3T et 1 L1T\naccessType;Porte grillag\u00e9e\naccessType;Portail coulissant\naccessType;Portillon\naccessType;Porte pleine\naccessType;Barri\u00e8re levante\naccessType;Acc\u00e8s libre\nkeyType;Cadenas\nkeyType;Deny\nkeyType;Abloy\nkeyType;Cl\u00e9 triangle\nkeyType;Cl\u00e9 carr\u00e9e\nkeyType;Badge\nkeyType;Digicode\nkeyType;Aucune\nsiteType;Pyl\u00f4ne\nsiteType;Toit-terrasse\nsiteType;Ch\u00e2teau d'eau\nsiteType;M\u00e2t\nsiteType;Clocher\nsiteType;Silo\nsiteType;Chemin\u00e9e\nyesNoSo;Oui\nyesNoSo;Non\nyesNoSo;s.o\nsecurityType;s.o\nsecurityType;Cadenas\nsecurityType;Tampon verrouill\u00e9\nsecurityType;Fermeture par vis\ntraffic;Oui\ntraffic;Non\ntraffic;Alternat par feux tricolores\ntraffic;Alternat manuel (K10)\n"/*CSV_END*/;

  /* ------------------------------------------------------------------ */
  /*  État                                                              */
  /* ------------------------------------------------------------------ */
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function uid() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function codeToHeader(c) { return String(c || '').replace(/-/g, '_'); }

  function blankState() {
    return {
      headerCode: '', headerLine2: 'DOE GC RP', headerLine3: 'BTS',
      logoLeft: '', logoRight: '',
      version: '(V1)', projectCode: '', author: '', date: todayISO(),
      coverTitle: 'Reportage photos', coverImage: '', address: '',
      gcLength: '',
      poses: [{ ml: '', label: '', detail: '' }],
      chambers: '',
      accessContact: '', accessType: '', keyType: '', accessCode: '',
      chamberSecurity: 's.o', chamberName: 's.o', securityType: 's.o',
      technician: '', siteType: '', heritage: 's.o',
      publicDomain: '', manager: '', pmv: '', privateDomain: 's.o', parcels: 's.o', convention: 's.o',
      signage: '', drire: '', traffic: '',
      legendImage: '', coupeImage: '', coupeTitle: 'COUPE TYPE DE TRANCHEE TRADITIONNELLE',
      showLegend: true, showCoupe: true,
      photosPerPage: 6,
      photos: []
    };
  }

  /* Exemple prérempli avec les données du dossier d'origine */
  function sampleState() {
    var s = blankState();
    s.headerCode = '62842_008_01';
    s.projectCode = '62842-008-01';
    s.author = 'JF.C';
    s.date = '2026-01-19';
    s.address = 'STADE ERNEST SCHAFFNER, RUE DES SPORTS 62880 VENDIN-LE-VIEIL';
    s.gcLength = '97.90 ml';
    s.poses = [
      { ml: '79.60 ml', label: 'Tranchée traditionnel Trottoir', detail: '(3 PVC 42/45 avec Plynox)' },
      { ml: '14.50 ml', label: 'Tranchée traditionnel chaussée', detail: '(3 PVC 42/45 avec Plynox)' },
      { ml: '3.80 ml', label: 'Tranchée, traditionnel trottoir non stabilisé.', detail: '(3 PVC 42/45 avec Plynox)' }
    ];
    s.chambers = '1 L2T et 1 L1T';
    s.accessContact = 'Service technique tel : 06 19 58 63 32';
    s.accessType = 'Porte grillagée';
    s.keyType = 'Cadenas';
    s.accessCode = '0801';
    s.technician = 'Petit David\nChargé d’affaires\nTel : 06.51.22.88.15';
    s.siteType = 'Pylône';
    s.publicDomain = 'Oui';
    s.manager = 'Commune de : VENDIN-LE-VIEIL';
    s.pmv = 'N° 2025/331';
    return s;
  }

  var state = sampleState();

  /* ------------------------------------------------------------------ */
  /*  Persistance (IndexedDB, assez grande pour de nombreuses photos)    */
  /* ------------------------------------------------------------------ */
  var DB_NAME = 'doe-gc-rp', STORE = 'kv', KEY = 'state';
  function openDB() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) return reject(new Error('IndexedDB indisponible'));
      var req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = function () { req.result.createObjectStore(STORE); };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function dbGet(key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var r = db.transaction(STORE).objectStore(STORE).get(key);
        r.onsuccess = function () { resolve(r.result); };
        r.onerror = function () { reject(r.error); };
      });
    });
  }
  function dbSet(key, value) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(value, key);
        tx.oncomplete = resolve;
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }
  var saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      dbSet(KEY, state).then(function () { setStatus('Sauvegardé automatiquement dans ce navigateur.'); })
        .catch(function () { setStatus('Sauvegarde automatique impossible : utilisez « Exporter (.json) ».'); });
    }, 600);
  }
  function setStatus(t) { document.getElementById('saveStatus').textContent = t; }

  /* ------------------------------------------------------------------ */
  /*  Utilitaires DOM                                                   */
  /* ------------------------------------------------------------------ */
  function h(tag, props) {
    var el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      if (k === 'class') el.className = props[k];
      else if (k === 'text') el.textContent = props[k];
      else if (k === 'style') el.setAttribute('style', props[k]);
      else el.setAttribute(k, props[k]);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  function b(text) { return h('b', { text: text }); }
  function formatDate(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p.length === 3 ? 'Le ' + p[2] + '/' + p[1] + '/' + p[0] : iso;
  }

  /* ------------------------------------------------------------------ */
  /*  Images                                                            */
  /* ------------------------------------------------------------------ */
  function readImage(file, maxDim, quality) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onerror = function () { reject(fr.error); };
      fr.onload = function () {
        var img = new Image();
        img.onerror = function () { reject(new Error('Image illisible : ' + file.name)); };
        img.onload = function () {
          var w = img.naturalWidth, hgt = img.naturalHeight;
          var scale = Math.min(1, maxDim / Math.max(w, hgt));
          var c = document.createElement('canvas');
          c.width = Math.round(w * scale); c.height = Math.round(hgt * scale);
          var ctx = c.getContext('2d');
          var keepAlpha = file.type === 'image/png';
          if (!keepAlpha) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); }
          ctx.drawImage(img, 0, 0, c.width, c.height);
          resolve(keepAlpha ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', quality));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Aperçu                                                            */
  /* ------------------------------------------------------------------ */
  function header() {
    return h('table', { class: 'hdr' },
      h('tr', {},
        h('td', { class: 'logo-l' }, h('img', { src: state.logoLeft || DEFAULT_LOGO_LEFT, alt: 'Logo gauche' })),
        h('td', { class: 'title' },
          h('div', { class: 'code', text: state.headerCode }),
          h('div', { class: 'l2row' },
            h('span', { class: 'l2', text: state.headerLine2 }),
            h('span', { class: 'l3', text: state.headerLine3 }))),
        h('td', { class: 'logo-r' }, h('img', { src: state.logoRight || DEFAULT_LOGO_RIGHT, alt: 'Logo droite' }))));
  }

  function footer(pageNo, total) {
    return h('div', { class: 'ftr' },
      h('table', {},
        h('tr', {},
          h('td', { text: 'Version du Document : ' + state.version }),
          h('td', {}, 'Code projet du site :', h('br'), state.projectCode),
          h('td', {}, 'Fait par :', h('br'), state.author),
          h('td', {}, 'Date de réalisation :', h('br'), formatDate(state.date)))),
      h('div', { class: 'pageno', text: 'Page ' + pageNo + '/' + total }));
  }

  function makePage(bodyNodes, pageNo, total) {
    return h('section', { class: 'page' }, header(), h('div', { class: 'body' }, bodyNodes), footer(pageNo, total));
  }

  function coverBody() {
    var imgBox = h('div', { class: 'cover-img' },
      state.coverImage ? h('img', { src: state.coverImage, alt: 'Plan' }) : h('div', { class: 'empty', text: '(plan / vue aérienne)' }));
    return [
      h('div', { class: 'pill', text: state.coverTitle }),
      imgBox,
      h('div', { class: 'pill wide', text: state.address })
    ];
  }

  function title(t) { return h('div', { class: 'sec-title', text: t }); }

  function infoBody() {
    var poseList = h('ul', {}, state.poses.filter(function (p) { return p.ml || p.label || p.detail; }).map(function (p) {
      return h('li', {}, [p.ml, p.label].filter(Boolean).join(' '), p.detail ? h('br') : null, p.detail || '');
    }));
    var out = [];

    out.push(title('Caractéristiques de la liaison :'));
    out.push(h('table', { class: 'info' },
      h('colgroup', {}, h('col', { style: 'width:25%' }), h('col', { style: 'width:42%' }), h('col', { style: 'width:33%' })),
      h('tr', {},
        h('td', { text: 'Linéaire de GC : ' + state.gcLength }),
        h('td', {}, 'Linéaire par mode de pose et type/nombre de fourreaux (cf BPU) :', poseList),
        h('td', { text: 'Types et nb de chambres : ' + state.chambers }))));

    out.push(title('Modalités d’accès :'));
    out.push(h('table', { class: 'info' },
      h('colgroup', {}, h('col', { style: 'width:30%' }), h('col', { style: 'width:38%' }), h('col', { style: 'width:32%' })),
      h('tr', {},
        h('td', {}, 'Nom et information de contact :', h('br'), h('b', { class: 'pre', text: state.accessContact })),
        h('td', {},
          'Type d’accès : ' + state.accessType, h('br'),
          'Type de clés : (Deny, Abloy…) ', b(state.keyType), h('br'),
          'Code, Badgeuse : ', b(state.accessCode)),
        h('td', {},
          'Sécurisation de chambre : ', b(state.chamberSecurity), h('br'),
          'Nom de la chambre : ', b(state.chamberName), h('br'),
          'Type de sécurisation : ', b(state.securityType)))));

    out.push(title('Informations remarquables :'));
    out.push(h('table', { class: 'info' },
      h('colgroup', {}, h('col', { style: 'width:33%' }), h('col', { style: 'width:34%' }), h('col', { style: 'width:33%' })),
      h('tr', { style: 'height:22mm' },
        h('td', {}, 'Coord. technicien qui a fait la VT :', h('div', { class: 'pre', text: state.technician })),
        h('td', { class: 'center' }, h('div', { style: 'text-align:left' }, 'Typologie du site :'), h('div', { style: 'margin-top:4mm' }, b(state.siteType))),
        h('td', { class: 'center' }, h('div', { style: 'text-align:left' }, 'Monument historique, ONF, VNF :'), h('div', { style: 'margin-top:4mm' }, b(state.heritage))))));

    out.push(title('Impact GC :'));
    out.push(h('table', { class: 'info' },
      h('colgroup', {}, h('col', { style: 'width:25%' }), h('col', { style: 'width:42%' }), h('col', { style: 'width:33%' })),
      h('tr', {},
        h('td', {}, 'Domaine public :', h('br'), h('br'), state.publicDomain),
        h('td', {}, 'Impact gestionnaire (villes concernés, département…) :', h('br'), h('br'), b(state.manager)),
        h('td', {}, 'Numéro PMV (DOE) :', h('br'), h('br'), state.pmv)),
      h('tr', {},
        h('td', {}, 'Domaine privé :', h('br'), b(state.privateDomain)),
        h('td', {}, 'Numéro(s) de parcelle(s) concernée(s) + nom propriétaires + coordonnées ', b(state.parcels)),
        h('td', {}, 'Code convention (DOE) :', h('br'), b(state.convention)))));

    out.push(title('Modalités de mise en œuvre / sécurité :'));
    out.push(h('table', { class: 'info' },
      h('colgroup', {}, h('col', { style: 'width:58%' }), h('col', { style: 'width:42%' })),
      h('tr', { style: 'height:14mm' },
        h('td', {}, 'Signalisation routière : ' + state.signage, h('br'), 'Intervention DRIRE : ' + state.drire),
        h('td', { text: 'Circulation alternée : ' + state.traffic }))));
    return out;
  }

  function legendBody() {
    return [h('div', { class: 'imgbox' }, h('img', { src: state.legendImage || DEFAULT_LEGEND, alt: 'Légende' }))];
  }
  function coupeBody() {
    return [
      h('div', { class: 'banner', text: state.coupeTitle }),
      h('div', { class: 'imgbox', style: 'align-items:flex-start' }, h('img', { src: state.coupeImage || DEFAULT_COUPE, alt: 'Coupe type' }))
    ];
  }

  function layoutFor(n) {
    if (n === 1) return { cols: 1, rows: 1 };
    if (n === 2) return { cols: 2, rows: 1 };
    if (n === 4) return { cols: 2, rows: 2 };
    return { cols: 2, rows: 3 };
  }

  function photoBody(chunk, startIndex, perPage) {
    var lay = layoutFor(perPage);
    var grid = h('div', {
      class: 'grid',
      style: 'grid-template-columns:repeat(' + lay.cols + ',minmax(0,1fr));grid-template-rows:repeat(' + lay.rows + ',minmax(0,1fr))'
    });
    chunk.forEach(function (p, i) {
      var n = startIndex + i + 1;
      grid.appendChild(h('div', { class: 'cell' },
        h('div', { class: 'frame' },
          h('img', { src: p.src, alt: 'Photo ' + n }),
          p.tag ? h('div', { class: 'tag', text: p.tag }) : null),
        h('div', { class: 'cap' }, b('Photo ' + n + ' : '), p.caption || '')));
    });
    return [grid];
  }

  function render() {
    var preview = document.getElementById('preview');
    var bodies = [coverBody(), infoBody()];
    if (state.showLegend) bodies.push(legendBody());
    if (state.showCoupe) bodies.push(coupeBody());

    var per = state.photosPerPage || 6;
    for (var i = 0; i < state.photos.length; i += per) {
      bodies.push(photoBody(state.photos.slice(i, i + per), i, per));
    }

    preview.textContent = '';
    bodies.forEach(function (body, idx) {
      preview.appendChild(makePage(body, idx + 1, bodies.length));
    });
    document.getElementById('pageInfo').textContent = bodies.length + ' pages · ' + state.photos.length + ' photo(s)';
    document.getElementById('photoCount').textContent = state.photos.length;
    document.title = 'DOE_GC_RP_' + (state.projectCode || 'dossier');
  }

  var renderTimer = null;
  function renderSoon() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 80);
    scheduleSave();
  }
  function renderNow() { clearTimeout(renderTimer); render(); scheduleSave(); }

  /* ------------------------------------------------------------------ */
  /*  Listes de choix (fichier CSV : colonnes « liste;valeur »)         */
  /* ------------------------------------------------------------------ */
  var lists = Object.create(null);
  var currentCsv = '';
  var listControls = [];

  function parseCsv(text) {
    text = String(text || '').replace(/^﻿/, '');
    var firstLine = text.split(/\r?\n/)[0] || '';
    var delim = firstLine.indexOf(';') >= 0 ? ';' : ',';
    var rows = [], row = [], field = '', inQ = false;
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      if (inQ) {
        if (c === '"') {
          if (text.charAt(i + 1) === '"') { field += '"'; i++; } else inQ = false;
        } else field += c;
      } else if (c === '"') inQ = true;
      else if (c === delim) { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text.charAt(i + 1) === '\n') i++;
        row.push(field); field = ''; rows.push(row); row = [];
      } else field += c;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    var out = Object.create(null);
    rows.forEach(function (r, idx) {
      if (r.length < 2) return;
      var name = r[0].trim(), val = r[1].trim();
      if (!name || !val) return;
      if (idx === 0 && name.toLowerCase() === 'liste') return;
      if (!out[name]) out[name] = [];
      if (out[name].indexOf(val) < 0) out[name].push(val);
    });
    return out;
  }

  function applyCsv(text) {
    var parsed = parseCsv(text);
    if (!Object.keys(parsed).length) return false;
    currentCsv = text;
    lists = parsed;
    return true;
  }

  function loadLists() {
    return dbGet('csv').catch(function () { return null; }).then(function (saved) {
      if (saved) return saved;
      if (location.protocol === 'file:') return EMBEDDED_CSV; /* fetch interdit en file:// */
      return fetch('assets/listes.csv').then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      }).catch(function () { return EMBEDDED_CSV; });
    }).then(function (text) {
      if (!applyCsv(text)) applyCsv(EMBEDDED_CSV);
    });
  }

  /* Liste déroulante + option « Autre » qui ouvre une saisie libre */
  function createListControl(listName, getValue, setValue, placeholder) {
    var sel = h('select', { class: 'list-select' });
    var txt = h('input', { type: 'text', class: 'list-other', placeholder: placeholder || 'Saisie libre' });
    var wrap = h('div', { class: 'listctl' }, sel, txt);
    function refresh() {
      var v = getValue() || '';
      var items = lists[listName] || [];
      sel.textContent = '';
      sel.appendChild(h('option', { value: '', text: '— Choisir —' }));
      items.forEach(function (it) { sel.appendChild(h('option', { value: it, text: it })); });
      sel.appendChild(h('option', { value: '__other', text: 'Autre (saisie libre)…' }));
      if (v === '') { sel.value = ''; txt.style.display = 'none'; txt.value = ''; }
      else if (items.indexOf(v) >= 0) { sel.value = v; txt.style.display = 'none'; txt.value = ''; }
      else { sel.value = '__other'; txt.value = v; txt.style.display = ''; }
    }
    sel.addEventListener('change', function () {
      if (sel.value === '__other') { txt.style.display = ''; txt.focus(); return; }
      txt.style.display = 'none'; txt.value = '';
      setValue(sel.value);
    });
    txt.addEventListener('input', function () { setValue(txt.value); });
    wrap.refresh = refresh;
    refresh();
    listControls.push(wrap);
    return wrap;
  }

  function refreshListControls() {
    listControls = listControls.filter(function (c) { return document.body.contains(c); });
    listControls.forEach(function (c) { c.refresh(); });
  }

  function setupStaticLists() {
    document.querySelectorAll('[data-key][data-list]').forEach(function (el) {
      var key = el.dataset.key;
      var ctl = createListControl(el.dataset.list,
        function () { return state[key]; },
        function (v) { state[key] = v; renderSoon(); },
        el.getAttribute('placeholder'));
      el.style.display = 'none';
      el.parentNode.insertBefore(ctl, el.nextSibling);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Modèles en mémoire                                                */
  /* ------------------------------------------------------------------ */
  var models = [];
  /* Champs propres à un chantier : jamais enregistrés dans un modèle, jamais écrasés par un modèle. */
  var MODEL_EXCLUDE = ['photos', 'coverImage', 'projectCode', 'headerCode', 'address', 'date'];

  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  function modelHaystack(m) {
    var parts = [m.name];
    Object.keys(m.data).forEach(function (k) {
      var v = m.data[k];
      if (typeof v === 'string' && v.indexOf('data:') !== 0) parts.push(v);
    });
    (m.data.poses || []).forEach(function (p) { parts.push(p.ml, p.label, p.detail); });
    return norm(parts.join(' '));
  }

  function persistModels() {
    dbSet('models', models).catch(function () { setStatus('Enregistrement des modèles impossible dans ce navigateur : utilisez l’export.'); });
  }

  function snapshotModelData() {
    var d = JSON.parse(JSON.stringify(state));
    MODEL_EXCLUDE.forEach(function (k) { delete d[k]; });
    return d;
  }

  function applyModel(m) {
    var keep = {};
    MODEL_EXCLUDE.forEach(function (k) { keep[k] = state[k]; });
    state = Object.assign(blankState(), JSON.parse(JSON.stringify(m.data)), keep);
    if (!Array.isArray(state.poses) || !state.poses.length) state.poses = [{ ml: '', label: '', detail: '' }];
    fillForm();
    renderNow();
    setStatus('Modèle « ' + m.name + ' » appliqué.');
  }

  function renderModelList() {
    var box = document.getElementById('modelList');
    document.getElementById('modelCount').textContent = models.length;
    var words =norm(document.getElementById('modelSearch').value).split(/\s+/).filter(Boolean);
    box.textContent = '';
    var shown = models.filter(function (m) {
      var hay = modelHaystack(m);
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    });
    if (!shown.length) {
      box.appendChild(h('p', { class: 'hint', text: models.length ? 'Aucun modèle ne correspond à la recherche.' : 'Aucun modèle enregistré pour le moment.' }));
      return;
    }
    shown.forEach(function (m) {
      var sub = [m.data.chambers, m.data.siteType].filter(Boolean).join(' · ');
      var apply = h('button', { type: 'button', class: 'model-apply', title: 'Appliquer ce modèle au formulaire' },
        h('b', { text: m.name }), sub ? h('span', { text: sub }) : null);
      apply.addEventListener('click', function () { applyModel(m); });
      var upd = h('button', { type: 'button', class: 'icon', text: '↻', title: 'Mettre à jour ce modèle avec le formulaire actuel' });
      upd.addEventListener('click', function () {
        if (!confirm('Remplacer le contenu du modèle « ' + m.name + ' » par le formulaire actuel ?')) return;
        m.data = snapshotModelData(); persistModels(); renderModelList(); setStatus('Modèle « ' + m.name + ' » mis à jour.');
      });
      var del = h('button', { type: 'button', class: 'icon danger', text: '✕', title: 'Supprimer ce modèle' });
      del.addEventListener('click', function () {
        if (!confirm('Supprimer le modèle « ' + m.name + ' » ?')) return;
        models = models.filter(function (x) { return x !== m; }); persistModels(); renderModelList();
      });
      box.appendChild(h('div', { class: 'model-item' }, apply, upd, del));
    });
  }

  function saveModel() {
    var input = document.getElementById('modelName');
    var name = input.value.trim();
    if (!name) { alert('Donnez un nom au modèle.'); input.focus(); return; }
    var existing = models.filter(function (m) { return norm(m.name) === norm(name); })[0];
    if (existing) {
      if (!confirm('Un modèle « ' + existing.name + ' » existe déjà. Le remplacer ?')) return;
      existing.data = snapshotModelData();
    } else {
      models.push({ id: uid(), name: name, data: snapshotModelData() });
      models.sort(function (a, b) { return a.name.localeCompare(b.name, 'fr'); });
    }
    input.value = '';
    persistModels(); renderModelList();
    setStatus('Modèle « ' + name + ' » enregistré.');
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: mime });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function readText(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(fr.error); };
      fr.readAsText(file);
    });
  }

  function bindListsAndModels() {
    document.getElementById('modelSearch').addEventListener('input', renderModelList);
    on('btnSaveModel', saveModel);
    document.getElementById('modelName').addEventListener('keydown', function (e) { if (e.key === 'Enter') saveModel(); });
    on('btnExportModels', function () { download('modeles_DOE_GC_RP.json', JSON.stringify(models), 'application/json'); });
    on('btnImportModels', function () { document.getElementById('fileModels').click(); });
    document.getElementById('fileModels').addEventListener('change', function (e) {
      var f = e.target.files[0]; e.target.value = '';
      if (!f) return;
      readText(f).then(function (t) {
        var arr = JSON.parse(t);
        if (!Array.isArray(arr)) throw new Error('Format invalide');
        var n = 0;
        arr.forEach(function (m) {
          if (!m || typeof m.name !== 'string' || typeof m.data !== 'object' || !m.data) return;
          models = models.filter(function (x) { return norm(x.name) !== norm(m.name); });
          models.push({ id: m.id || uid(), name: m.name, data: m.data });
          n++;
        });
        models.sort(function (a, b) { return a.name.localeCompare(b.name, 'fr'); });
        persistModels(); renderModelList();
        setStatus(n + ' modèle(s) importé(s).');
      }).catch(function (err) { alert('Import impossible : ' + err.message); });
    });

    on('btnExportCsv', function () { download('listes.csv', '﻿' + currentCsv, 'text/csv;charset=utf-8'); });
    on('btnImportCsv', function () { document.getElementById('fileCsv').click(); });
    document.getElementById('fileCsv').addEventListener('change', function (e) {
      var f = e.target.files[0]; e.target.value = '';
      if (!f) return;
      readText(f).then(function (t) {
        if (!applyCsv(t)) throw new Error('aucune ligne « liste;valeur » trouvée');
        dbSet('csv', t).catch(function () {});
        refreshListControls();
        setStatus('Listes de choix importées (' + Object.keys(lists).length + ' listes).');
      }).catch(function (err) { alert('Import impossible : ' + err.message); });
    });
    on('btnResetCsv', function () {
      if (!confirm('Rétablir les listes de choix d’origine ?')) return;
      dbSet('csv', null).catch(function () {}).then(loadLists).then(function () {
        refreshListControls(); setStatus('Listes de choix d’origine rétablies.');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Formulaire                                                        */
  /* ------------------------------------------------------------------ */
  function fillForm() {
    document.querySelectorAll('[data-key]').forEach(function (el) {
      if (el.dataset.list) return;
      var v = state[el.dataset.key];
      if (el.type === 'checkbox') el.checked = !!v;
      else el.value = v == null ? '' : v;
    });
    renderPoseList();
    renderPhotoList();
    refreshListControls();
  }

  function bindForm() {
    document.querySelectorAll('[data-key]').forEach(function (el) {
      if (el.dataset.list) return;
      var evt = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(evt, function () {
        var key = el.dataset.key;
        if (el.type === 'checkbox') state[key] = el.checked;
        else if ('number' in el.dataset) state[key] = Number(el.value);
        else {
          if (key === 'projectCode' && state.headerCode === codeToHeader(state.projectCode)) {
            state.headerCode = codeToHeader(el.value);
            document.querySelector('[data-key="headerCode"]').value = state.headerCode;
          }
          state[key] = el.value;
        }
        (evt === 'change') ? renderNow() : renderSoon();
      });
    });
  }

  /* --- Modes de pose --- */
  function renderPoseList() {
    var box = document.getElementById('poseList');
    box.textContent = '';
    state.poses.forEach(function (p, i) {
      function field(prop, ph, cls) {
        var inp = h('input', { type: 'text', placeholder: ph, class: cls || '' });
        inp.value = p[prop] || '';
        inp.addEventListener('input', function () { p[prop] = inp.value; renderSoon(); });
        return inp;
      }
      function listField(prop, listName, ph) {
        return createListControl(listName,
          function () { return p[prop]; },
          function (v) { p[prop] = v; renderSoon(); },
          ph);
      }
      var del = h('button', { type: 'button', class: 'small', text: '✕', title: 'Supprimer cette ligne' });
      del.addEventListener('click', function () { state.poses.splice(i, 1); renderPoseList(); renderNow(); });
      box.appendChild(h('div', { class: 'pose-item' },
        h('div', { class: 'row' }, h('div', { class: 'ml' }, field('ml', '79.60 ml')), h('div', { style: 'flex:1;min-width:0' }, listField('label', 'poseModes', 'Mode de pose')), del),
        h('div', { style: 'margin-top:4px' }, listField('detail', 'fourreaux', '(3 PVC 42/45 avec Plynox)'))));
    });
  }

  /* --- Photos --- */
  function renderPhotoList() {
    var box = document.getElementById('photoList');
    box.textContent = '';
    state.photos.forEach(function (p, i) {
      var cap = h('textarea', { rows: '2', placeholder: 'Légende de la photo' });
      cap.value = p.caption || '';
      cap.addEventListener('input', function () { p.caption = cap.value; renderSoon(); });
      var tag = h('input', { type: 'text', placeholder: 'Étiquette jaune sur la photo (optionnel)' });
      tag.value = p.tag || '';
      tag.addEventListener('input', function () { p.tag = tag.value; renderSoon(); });

      function btn(label, title, fn, disabled) {
        var bt = h('button', { type: 'button', text: label, title: title });
        if (disabled) bt.disabled = true;
        bt.addEventListener('click', fn);
        return bt;
      }
      function move(d) {
        var j = i + d;
        var t = state.photos[i]; state.photos[i] = state.photos[j]; state.photos[j] = t;
        renderPhotoList(); renderNow();
      }
      box.appendChild(h('div', { class: 'photo-item' },
        h('img', { src: p.src, alt: '' }),
        h('div', { class: 'body' },
          h('div', { class: 'num', text: 'Photo ' + (i + 1) }),
          cap, tag,
          h('div', { class: 'actions' },
            btn('↑', 'Monter', function () { move(-1); }, i === 0),
            btn('↓', 'Descendre', function () { move(1); }, i === state.photos.length - 1),
            btn('Supprimer', 'Supprimer la photo', function () {
              state.photos.splice(i, 1); renderPhotoList(); renderNow();
            })))));
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Actions                                                           */
  /* ------------------------------------------------------------------ */
  function bindFile(id, handler, opts) {
    document.getElementById(id).addEventListener('change', function (e) {
      var files = Array.prototype.slice.call(e.target.files);
      if (!files.length) return;
      Promise.all(files.map(function (f) { return readImage(f, opts.max, opts.q); }))
        .then(function (urls) { handler(urls, files); renderNow(); })
        .catch(function (err) { alert(err.message); });
      e.target.value = '';
    });
  }

  function bindActions() {
    bindFile('logoLeftFile', function (u) { state.logoLeft = u[0]; }, { max: 600, q: 0.9 });
    bindFile('logoRightFile', function (u) { state.logoRight = u[0]; }, { max: 600, q: 0.9 });
    bindFile('coverImageFile', function (u) { state.coverImage = u[0]; }, { max: 2000, q: 0.88 });
    bindFile('legendFile', function (u) { state.legendImage = u[0]; }, { max: 2000, q: 0.9 });
    bindFile('coupeFile', function (u) { state.coupeImage = u[0]; }, { max: 2000, q: 0.9 });
    bindFile('photoFiles', function (urls) {
      urls.forEach(function (u) {
        state.photos.push({ id: uid(), src: u, caption: '', tag: '' });
      });
      renderPhotoList();
    }, { max: 1600, q: 0.82 });

    on('btnResetLogos', function () { state.logoLeft = ''; state.logoRight = ''; renderNow(); });
    on('btnClearCover', function () { state.coverImage = ''; renderNow(); });
    on('btnResetLegend', function () { state.legendImage = ''; renderNow(); });
    on('btnResetCoupe', function () { state.coupeImage = ''; renderNow(); });
    on('btnAddPose', function () { state.poses.push({ ml: '', label: '', detail: '' }); renderPoseList(); renderNow(); });

    on('btnPrint', function () { render(); window.print(); });

    on('btnExport', function () {
      var blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'DOE_GC_RP_' + (state.projectCode || 'dossier') + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    on('btnImport', function () { document.getElementById('fileImport').click(); });
    document.getElementById('fileImport').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var data = JSON.parse(fr.result);
          if (typeof data !== 'object' || data === null || !Array.isArray(data.photos)) throw new Error('Format invalide');
          state = Object.assign(blankState(), data);
          if (!Array.isArray(state.poses)) state.poses = [];
          fillForm(); renderNow();
        } catch (err) { alert('Import impossible : ' + err.message); }
      };
      fr.readAsText(f);
      e.target.value = '';
    });
    on('btnNew', function () {
      if (!confirm('Créer un dossier vierge ? Les données actuelles seront effacées (pensez à les exporter).')) return;
      state = blankState();
      fillForm(); renderNow();
    });

    var zoom = document.getElementById('zoom');
    zoom.addEventListener('input', function () { applyZoom(zoom.value); });
  }
  function on(id, fn) { document.getElementById(id).addEventListener('click', fn); }

  function applyZoom(v) {
    document.getElementById('preview').style.zoom = String(v / 100);
  }
  function fitZoom() {
    var wrap = document.querySelector('.preview-wrap');
    var pageW = 210 / 25.4 * 96;
    var z = Math.max(40, Math.min(100, Math.floor(((wrap.clientWidth - 50) / pageW) * 100)));
    document.getElementById('zoom').value = z;
    applyZoom(z);
  }

  /* ------------------------------------------------------------------ */
  /*  Démarrage                                                         */
  /* ------------------------------------------------------------------ */
  function start() {
    setupStaticLists();
    bindForm();
    bindActions();
    bindListsAndModels();
    fillForm();
    renderModelList();
    fitZoom();
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      dbGet(KEY).catch(function () { return null; }),
      dbGet('models').catch(function () { return null; }),
      loadLists()
    ]).then(function (r) {
      if (r[0] && Array.isArray(r[0].photos)) state = Object.assign(blankState(), r[0]);
      if (Array.isArray(r[1])) models = r[1];
      start();
    });
  });
})();
