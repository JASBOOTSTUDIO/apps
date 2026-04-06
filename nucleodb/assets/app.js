const e = React.createElement;

function useJson(url, initialValue) {
  const state = React.useState(initialValue);
  const value = state[0];
  const setValue = state[1];
  const loadingState = React.useState(true);
  const loading = loadingState[0];
  const setLoading = loadingState[1];

  React.useEffect(function () {
    let live = true;
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (d) { if (live) { setValue(d); setLoading(false); } })
      .catch(function () { if (live) { setLoading(false); } });
    return function () { live = false; };
  }, [url]);

  return { value, loading };
}

function kpi(label, value) {
  return e('article', { className: 'ndb-stat', key: label }, [
    e('span', { key: 'l' }, label),
    e('strong', { key: 'v' }, value)
  ]);
}

function shellLink(label, route, current, onNavigate) {
  return e('button', {
    key: route,
    className: current === route ? 'activo' : '',
    onClick: function () { onNavigate(route); }
  }, label);
}

function recentItem(text, i) {
  return e('div', { className: 'ndb-recent-item', key: 'r' + i }, text);
}

function nodeItem(node, i) {
  return e('div', { className: 'ndb-node', key: 'n' + i }, [
    e('strong', { key: 'name' }, node.nombre || 'Nodo demo'),
    e('p', { key: 'content' }, node.descripcion || 'Contenido contextual de ejemplo para la interfaz reactiva de NucleoDB.'),
    e('div', { className: 'ndb-tags', key: 'tags' }, (node.tags || []).map(function (tag, j) {
      return e('span', { className: 'ndb-tag', key: 't' + j }, tag);
    }))
  ]);
}

function graphCard() {
  return e('article', { className: 'ndb-graph-card', key: 'graph' }, [
    e('h3', { key: 'h3' }, 'Mapa de relaciones'),
    e('span', { className: 'ndb-dot', style: { left: '48px', top: '150px' }, key: 'd1' }),
    e('span', { className: 'ndb-dot', style: { left: '142px', top: '64px' }, key: 'd2' }),
    e('span', { className: 'ndb-dot', style: { left: '250px', top: '146px' }, key: 'd3' }),
    e('span', { className: 'ndb-dot', style: { left: '324px', top: '96px' }, key: 'd4' }),
    e('span', { className: 'ndb-dot', style: { left: '198px', top: '210px' }, key: 'd5' }),
    e('span', { className: 'ndb-line', style: { left: '56px', top: '156px', width: '114px', transform: 'rotate(-34deg)' }, key: 'l1' }),
    e('span', { className: 'ndb-line', style: { left: '148px', top: '71px', width: '126px', transform: 'rotate(33deg)' }, key: 'l2' }),
    e('span', { className: 'ndb-line', style: { left: '255px', top: '152px', width: '96px', transform: 'rotate(-29deg)' }, key: 'l3' }),
    e('span', { className: 'ndb-line', style: { left: '154px', top: '72px', width: '144px', transform: 'rotate(9deg)' }, key: 'l4' })
  ]);
}

function InicioView(data) {
  const dashboard = data.value || {};
  const total = dashboard.total_nodos || '0';
  return e('div', { className: 'ndb-main-card' }, [
    e('section', { className: 'ndb-hero', key: 'hero' }, [
      e('div', { className: 'ndb-copy', key: 'copy' }, [
        e('h2', { key: 'h2' }, 'NúcleoDB Dashboard'),
        e('p', { key: 'p' }, 'Interfaz React responsive servida por Forja, lista para evolucionar sobre Jasboot y Estructa con una experiencia de producto más sólida.')
      ]),
      e('section', { className: 'ndb-stat-grid', key: 'stats' }, [
        kpi('Total nodos', total),
        kpi('Relaciones', dashboard.relaciones || '2,177'),
        kpi('Actividad', dashboard.actividad || '24h')
      ])
    ]),
    e('section', { className: 'ndb-content-grid', key: 'grid' }, [
      e('article', { className: 'ndb-panel', key: 'panel' }, [
        e('h3', { key: 'ph' }, 'Gestionar nodos'),
        e('div', { className: 'ndb-node-list', key: 'list' }, (dashboard.nodos || []).map(nodeItem))
      ]),
      graphCard()
    ])
  ]);
}

function ExplorarView(data) {
  const payload = data.value || {};
  return e('div', { className: 'ndb-main-card' }, [
    e('section', { className: 'ndb-content-grid', key: 'grid' }, [
      e('article', { className: 'ndb-panel', key: 'results' }, [
        e('h3', { key: 'h3' }, 'Resultados de búsqueda'),
        payload.resultados && payload.resultados.length
          ? e('div', { className: 'ndb-node-list', key: 'nodes' }, payload.resultados.map(nodeItem))
          : e('div', { className: 'ndb-empty', key: 'empty' }, 'Sin resultados todavía. Esta vista quedará conectada al motor real de consulta.')
      ]),
      e('article', { className: 'ndb-action-card', key: 'right' }, [
        e('h3', { key: 'hh' }, 'Dataset activo'),
        e('p', { key: 'pp' }, 'Colección: usuarios'),
        e('div', { className: 'ndb-shortcuts', key: 'shortcuts' }, [
          e('div', { className: 'ndb-shortcut', key: 's1' }, '/buscar?coleccion=usuarios&q=ia&top=5&'),
          e('div', { className: 'ndb-shortcut', key: 's2' }, '/nodos/crear?coleccion=usuarios&id=demo&nombre=Lucia&contenido=ia&')
        ])
      ])
    ])
  ]);
}

function ApiView(data) {
  const payload = data.value || {};
  return e('div', { className: 'ndb-main-card' }, [
    e('article', { className: 'ndb-list-card', key: 'api' }, [
      e('h3', { key: 'h3' }, 'Superficie API'),
      e('div', { className: 'ndb-recent', key: 'list' }, (payload.rutas || []).map(recentItem))
    ])
  ]);
}

function App() {
  const routeState = React.useState(window.location.pathname || '/');
  const route = routeState[0];
  const setRoute = routeState[1];

  const dashboard = useJson('/api/ui/dashboard', {
    total_nodos: '0',
    relaciones: '2,177',
    actividad: '24h',
    nodos: []
  });
  const explorar = useJson('/api/ui/explorar', { resultados: [] });
  const apiInfo = useJson('/api/ui/api', { rutas: [] });
  const uiConfig = useJson('/api/ui/config', { logo: '', usuario: 'admin', rol: 'Administrador de NúcleoDB' });

  React.useEffect(function () {
    function onPop() {
      setRoute(window.location.pathname || '/');
    }
    window.addEventListener('popstate', onPop);
    return function () { window.removeEventListener('popstate', onPop); };
  }, []);

  function go(nextRoute) {
    window.history.pushState({}, '', nextRoute);
    setRoute(nextRoute);
  }

  let center = InicioView(dashboard);
  if (route === '/explorar') center = ExplorarView(explorar);
  if (route === '/api-demo') center = ApiView(apiInfo);

  return e('div', { className: 'ndb-app' }, [
    e('div', { className: 'ndb-shell-bg', key: 'bg' }),
    e('div', { className: 'ndb-shell-glow', key: 'glow' }),
    e('section', { className: 'ndb-layout', key: 'layout' }, [
      e('aside', { className: 'ndb-sidebar', key: 'sidebar' }, [
        e('div', { className: 'ndb-brand', key: 'brand' }, [
          uiConfig.value.logo ? e('img', { src: 'data:image/png;base64,' + uiConfig.value.logo, alt: 'NúcleoDB', key: 'img' }) : null,
          e('h1', { key: 'h1' }, 'NúcleoDB')
        ]),
        e('div', { className: 'ndb-menu', key: 'menu' }, [
          shellLink('Dashboard', '/', route, go),
          shellLink('Nodos', '/explorar', route, go),
          shellLink('Consultas', '/explorar', route, go),
          shellLink('Configuración', '/api-demo', route, go)
        ]),
        e('button', { className: 'ndb-cta', onClick: function () { window.location.href = '/nodos/crear?coleccion=usuarios&id=demo_001&nombre=Lucia&contenido=ia&'; }, key: 'cta' }, '+ Añadir nodo'),
        e('div', { className: 'ndb-user', key: 'user' }, [
          e('strong', { key: 'u' }, uiConfig.value.usuario || 'admin'),
          e('span', { key: 'r' }, uiConfig.value.rol || 'Administrador de NúcleoDB')
        ])
      ]),
      e('main', { className: 'ndb-main', key: 'main' }, [
        e('section', { className: 'ndb-topbar', key: 'topbar' }, [
          e('div', { className: 'ndb-search', key: 'search' }, [
            e('input', { defaultValue: route === '/explorar' ? 'IA' : 'Buscar...', 'aria-label': 'Buscar' })
          ]),
          e('div', { className: 'ndb-chip', key: 'chip1' }, 'Embeddings'),
          e('div', { className: 'ndb-chip', key: 'chip2' }, 'Alertas'),
          e('div', { className: 'ndb-top-add', key: 'chip3' }, 'Producción')
        ]),
        center
      ]),
      e('aside', { className: 'ndb-right', key: 'right' }, [
        e('article', { className: 'ndb-right-card', key: 'recent' }, [
          e('h3', { key: 'h' }, 'Consultas recientes'),
          e('div', { className: 'ndb-recent', key: 'list' }, [
            recentItem('Buscar usuarios interesados en IA', 1),
            recentItem('Conexiones de Juan Pérez', 2),
            recentItem('Embeddings activos del dataset usuarios', 3)
          ])
        ]),
        e('article', { className: 'ndb-right-card', key: 'rings' }, [
          e('h3', { key: 'hh' }, 'Salud del sistema'),
          e('div', { className: 'ndb-rings', key: 'rg' }, [
            e('div', { className: 'ndb-panel ndb-ring', key: 'r1' }, [e('div', { className: 'ndb-ring-circle', key: 'c1' }, '76%'), e('p', { key: 'p1' }, 'Memoria')]),
            e('div', { className: 'ndb-panel ndb-ring', key: 'r2' }, [e('div', { className: 'ndb-ring-circle', key: 'c2' }, '42%'), e('p', { key: 'p2' }, 'CPU')])
          ])
        ]),
        e('article', { className: 'ndb-list-card', key: 'notes' }, [
          e('h3', { key: 'nh' }, 'Estado del producto'),
          e('p', { key: 'np' }, 'La interfaz ya está en React y es 100% responsive. El siguiente paso es conectar por completo estas vistas a la funcionalidad real de NúcleoDB.'),
          e('p', { className: 'ndb-footer-note', key: 'nf' }, 'Forja + React + Jasboot')
        ])
      ])
    ])
  ]);
}

ReactDOM.render(e(App), document.getElementById('root'));
