# NúcleoDB

**Motor de datos inteligente para el ecosistema Jasboot.**

`NúcleoDB` es una aplicación y base experimental construida sobre:

- `jasboot` como lenguaje y runtime
- `Forja` como framework HTTP/backend
- `React` como shell UI actual
- `Estructa` como base UI propia del ecosistema
- `JMN` como motor semántico/relacional nativo

Hoy `NúcleoDB` ya tiene una base funcional real para persistencia, API, búsqueda inicial y una interfaz responsive moderna, aunque todavía sigue en etapa de construcción.

## Estado Actual

Actualmente `NúcleoDB` ya incluye:

- persistencia básica por colección en archivos `.ndb`
- WAL simple en `data/transacciones/registro.wal`
- indexación semántica inicial usando `mem_asociar`, `recordar` y `propagar_activacion`
- relaciones tipo grafo sobre la JMN
- API HTTP servida por `Forja`
- interfaz `React` responsive servida desde la misma app `jasb`

Actualmente `NúcleoDB` **no está terminado como motor de producción**. La base ya existe, pero todavía hay áreas en proceso:

- lectura/consulta todavía en fase de endurecimiento
- búsqueda semántica aún simplificada
- endpoints `POST` con parsing manual todavía por endurecer
- UI conectada parcialmente a datos reales y parcialmente a datos de demostración
- falta consolidar más pruebas end-to-end

## Estructura

```txt
apps/nucleodb/
├── principal.jasb
├── README.md
├── assets/
│   ├── app.css
│   └── app.js
├── imagenes/
│   ├── disenio.png
│   ├── nucleoDB_icono.png
│   └── nucleoDB_icono.base64.txt
├── data/
│   ├── cerebro.jmn
│   ├── nodos/
│   ├── grafos/
│   └── transacciones/
└── src/
    ├── almacenamiento/
    │   ├── archivos.jasb
    │   ├── wal.jasb
    │   ├── cache.jasb
    │   └── transacciones.jasb
    ├── busqueda/
    │   ├── semantica.jasb
    │   └── hibrida.jasb
    ├── nucleo/
    │   ├── api.jasb
    │   ├── vectores.jasb
    │   └── grafos.jasb
    └── protocolo/
        └── forja.jasb
```

## Cómo Arranca

Archivo principal:

- `apps/nucleodb/principal.jasb`

Ese archivo:

- crea la memoria neuronal en `data/cerebro.jmn`
- asegura la estructura mínima de carpetas
- levanta el servidor HTTP en `http://127.0.0.1:18302`

## UI Actual

La interfaz actual ya no depende del HTML grande embebido anterior. Ahora corre como una shell `React` servida por `Forja`.

### Qué incluye hoy

- dashboard responsive
- vista de exploración responsive
- vista de superficie API
- sidebar, topbar y paneles laterales adaptables
- assets separados:
  - `assets/app.css`
  - `assets/app.js`

### Rutas de UI

- `GET /`
- `GET /explorar`
- `GET /api-demo`
- `GET /assets/app.css`
- `GET /assets/app.js`

### Endpoints UI para React

- `GET /api/ui/config`
- `GET /api/ui/dashboard`
- `GET /api/ui/explorar`
- `GET /api/ui/api`

Estos endpoints hoy sirven la información necesaria para la shell React. Parte de esos datos ya viene del motor; otra parte sigue siendo de demostración.

## Persistencia

La persistencia actual usa archivos por colección:

- ruta base: `data/nodos/<coleccion>.ndb`
- formato actual por línea:

```txt
id|nombre|contenido
```

Implementación principal:

- `src/almacenamiento/archivos.jasb`

Funciones relevantes:

- `ndb_insertar(...)`
- `ndb_leer_todos(...)`
- `ndb_buscar_por_id(...)`
- `ndb_actualizar_contenido(...)`
- `ndb_eliminar_por_id(...)`
- `ndb_contar(...)`

## WAL

El motor registra operaciones básicas antes de aplicarlas:

- archivo: `data/transacciones/registro.wal`

Implementación:

- `src/almacenamiento/wal.jasb`

Tipos actuales:

- `INS`
- `UPD`
- `DEL`
- `COMMIT`
- `ROLLBACK`

## Capa Núcleo

Punto de entrada principal del SDK:

- `src/nucleo/api.jasb`

Funciones expuestas actualmente:

- `nucleodb_guardar(...)`
- `nucleodb_obtener(...)`
- `nucleodb_actualizar(...)`
- `nucleodb_eliminar(...)`
- `nucleodb_buscar_similar(...)`
- `nucleodb_buscar_hibrida(...)`
- `nucleodb_buscar_donde(...)`
- `nucleodb_conectar(...)`
- `nucleodb_relacionados(...)`
- `nucleodb_fuerza_relacion(...)`
- `nucleodb_mantenimiento()`
- `nucleodb_total(...)`

## Motor Semántico y Grafo

### Vectorización semántica

Implementación:

- `src/nucleo/vectores.jasb`

Base actual:

- tokenización simple por palabras
- asociaciones con `mem_asociar`
- activación con `propagar_activacion`
- recuperación mediante `rastro_activacion_*`

Funciones principales:

- `vec_indexar(...)`
- `vec_buscar_similares(...)`
- `vec_similitud(...)`
- `vec_mantenimiento()`

### Grafo

Implementación:

- `src/nucleo/grafos.jasb`

Capacidades actuales:

- conectar nodos
- consultar fuerza
- listar relacionados

## API HTTP Actual

Implementación:

- `src/protocolo/forja.jasb`

Rutas disponibles hoy:

- `GET /`
- `GET /explorar`
- `GET /api-demo`
- `GET /api/ui/config`
- `GET /api/ui/dashboard`
- `GET /api/ui/explorar`
- `GET /api/ui/api`
- `POST /nodos`
- `GET /nodos/obtener`
- `GET /nodos/crear`
- `POST /nodos/actualizar`
- `GET /nodos/actualizar-get`
- `POST /nodos/eliminar`
- `GET /nodos/eliminar-get`
- `GET /buscar`
- `POST /grafos/conectar`
- `GET /grafos/relacionados`
- `GET /sistema/status`

## Lo Que Ya Funciona Bien

- el servidor compila y levanta
- la app sirve una UI React responsive
- los assets CSS y JS se sirven desde Jasboot
- el logo de `NúcleoDB` ya está integrado
- existe persistencia básica en `.ndb`
- existe WAL básico
- existe indexación semántica inicial sobre JMN
- existe CRUD base a nivel de módulos

## Lo Que Sigue Pendiente

Estas son las áreas que todavía deben endurecerse para considerar a `NúcleoDB` más robusto:

- conectar toda la UI React a datos vivos del motor
- mejorar el parsing HTTP de `POST`
- endurecer lectura y recuperación por ID
- mejorar búsqueda semántica y ranking
- agregar más pruebas automáticas
- enriquecer el modelo de nodos más allá de `id|nombre|contenido`
- estabilizar la capa de transacciones
- añadir manejo más sólido de errores y validación

## Cómo Ejecutarlo

Desde el workspace:

```powershell
node .\.vscode\run-jasb.cjs "C:\src\jasboot\apps\nucleodb\principal.jasb"
```

URL actual:

- [http://127.0.0.1:18302](http://127.0.0.1:18302)

## Cómo Usarlo

Hoy `NúcleoDB` puede usarse de dos formas:

- desde la interfaz web responsive
- desde la API HTTP directamente

### Uso desde la UI

Una vez arrancado el servidor, abre:

- `http://127.0.0.1:18302/`

Vistas disponibles:

- `http://127.0.0.1:18302/` : dashboard principal
- `http://127.0.0.1:18302/explorar` : exploración/búsqueda
- `http://127.0.0.1:18302/api-demo` : superficie de API disponible

### Uso desde la API

#### 1. Verificar salud del sistema

```powershell
curl.exe -s http://127.0.0.1:18302/sistema/status
```

#### 2. Crear un nodo con la ruta GET de trabajo

Esta es actualmente la forma más estable mientras se endurece el parsing completo de `POST`.

```powershell
curl.exe -s "http://127.0.0.1:18302/nodos/crear?coleccion=usuarios&id=juan_001&nombre=JuanPerez&contenido=tecnologia&"
```

#### 3. Obtener un nodo

```powershell
curl.exe -s "http://127.0.0.1:18302/nodos/obtener?coleccion=usuarios&id=juan_001&"
```

#### 4. Actualizar un nodo con la ruta GET de trabajo

```powershell
curl.exe -s "http://127.0.0.1:18302/nodos/actualizar-get?coleccion=usuarios&id=juan_001&contenido=ia_aplicada&"
```

#### 5. Eliminar un nodo con la ruta GET de trabajo

```powershell
curl.exe -s "http://127.0.0.1:18302/nodos/eliminar-get?coleccion=usuarios&id=juan_001&"
```

#### 6. Buscar por similitud

```powershell
curl.exe -s "http://127.0.0.1:18302/buscar?coleccion=usuarios&q=tecnologia&top=5&"
```

#### 7. Conectar nodos en el grafo

```powershell
curl.exe -s -X POST http://127.0.0.1:18302/grafos/conectar -H "Content-Type: application/json" -d "{\"desde\":\"usuarios_juan_001\",\"hacia\":\"interes_ia\"}"
```

#### 8. Consultar relacionados

```powershell
curl.exe -s "http://127.0.0.1:18302/grafos/relacionados?id=usuarios_juan_001&profundidad=2&"
```

### Uso desde la UI React interna

La UI actual consume estos endpoints internos:

- `GET /api/ui/config`
- `GET /api/ui/dashboard`
- `GET /api/ui/explorar`
- `GET /api/ui/api`

También sirve estos assets:

- `GET /assets/app.css`
- `GET /assets/app.js`

### Qué rutas usar hoy

En el estado actual del proyecto:

- para UI: usa `/`, `/explorar`, `/api-demo`
- para CRUD manual: prioriza `/nodos/crear`, `/nodos/actualizar-get`, `/nodos/eliminar-get`
- para lecturas simples: usa `/nodos/obtener`, `/buscar`, `/grafos/relacionados`, `/sistema/status`

### Nota importante

Aunque existen rutas `POST` como `POST /nodos`, `POST /nodos/actualizar` y `POST /nodos/eliminar`, la documentación recomienda por ahora usar primero las variantes `GET` de trabajo cuando lo importante sea validar flujo funcional, porque el parsing HTTP todavía está en fase de endurecimiento.

## Visión

`NúcleoDB` busca convertirse en un motor de datos nativo para Jasboot que una:

- persistencia
- semántica
- relaciones
- reactividad
- UI moderna

La base actual ya demuestra que `jasboot + Forja + React` pueden convivir en una sola aplicación. El siguiente gran paso es terminar de conectar esta interfaz responsive con el motor real para que `NúcleoDB` deje de ser una demo avanzada y pase a ser una plataforma consistente.
