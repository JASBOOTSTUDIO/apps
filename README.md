# Jasboot Apps — Proyectos de Ejemplo

Colección oficial de aplicaciones escritas en **Jasboot** (`.jasb`).  
Cada carpeta es un proyecto independiente que demuestra distintas capacidades del lenguaje.

---

## Cómo Ejecutar un Proyecto

1. Abre el archivo `.jasb` principal del proyecto en el IDE.
2. Presiona **F5**.
3. El compilador genera el bytecode (`.jbo`) y lo ejecuta automáticamente en la VM.

> **Nota:** El directorio de trabajo (CWD) debe ser la carpeta del proyecto para que las rutas relativas funcionen correctamente.

---

## Proyectos Disponibles

| #  | Carpeta                        | Archivo Principal                  | Tipo           | Descripción                                           |
|----|--------------------------------|------------------------------------|----------------|-------------------------------------------------------|
| 1  | `aurora_ia/`                   | `aurora_ia.jasb`                   | IA / Consola   | Asistente de IA con memoria persistente               |
| 2  | `base_de_datos/`               | `principal.jasb`                   | Consola        | Ejemplo de módulos e importaciones                    |
| 3  | `bd_json_crud/`                | `bd_json_crud_demo.jasb`           | CRUD / Consola | Base de datos JSON con colecciones dinámicas           |
| 4  | `clase_polimorfismo_demo/`     | `simulador_polimorfico.jasb`       | Consola / Demo | Clases, herencia, polimorfismo y vec2                 |
| 5  | `colmado/`                     | `colmado.jasb`                     | Consola / CRUD | Inventario de colmado (tienda) con persistencia TSV   |
| 6  | `crud_archivos_interactivo/`   | `crud_notas.jasb`                  | CRUD / Consola | CRUD de notas con archivos de texto                   |
| 7  | `nucleodb/`                    | `principal.jasb`                   | Servidor HTTP  | Motor de datos con API HTTP (puerto 18302)            |
| 8  | `rapido_api_prueba/`           | `rapido_api_prueba.jasb`           | API REST       | API REST estilo Express con Supabase opcional          |
| 9  | `rapido_demo/`                 | `rapido_demo.jasb`                 | API REST       | API mínima estilo Express (GET /, GET /saludo/:nombre)|
| 10 | `rrhh_gestion/`               | `rrhh_app.jasb`                    | Consola / CRUD | Gestión de empleados y nóminas con persistencia TSV   |
| 11 | `supabase_smoke/`             | `supabase_smoke.jasb`              | Test           | Prueba rápida del cliente REST de Supabase            |
| 12 | `Cajero_ATM/`                 | *(vacío)*                          | —              | Proyecto pendiente                                    |

---

## Detalle de Cada Proyecto

### 1. Aurora IA (`aurora_ia/`)

**Archivo:** `aurora_ia.jasb`  
**Tipo:** Asistente de IA con memoria neuronal persistente.

Presenta un menú interactivo con tres opciones:
- **Consultar Sabiduría** — pregunta a Aurora y ella responde con su memoria; si no sabe, te pide la respuesta y la aprende.
- **Sincronizar Datasets** — entrena desde archivos `.txt` en formato `clave : valor`.
- **Salir** — consolida la memoria y cierra.

**Ejecutar:**
1. Abrir `aurora_ia/aurora_ia.jasb`
2. Presionar **F5**

**Datos de entrenamiento incluidos** (`entrenamiento/`):
- `biblia_sabiduria_total.txt` — Proverbios y sabiduría bíblica
- `cultura_general.txt` — Conocimiento general
- `espanol_fluidez.txt` — Gramática y fluidez del español
- `estructuras_datos.txt` — Algoritmos y estructuras de datos
- `finanzas_y_negocios.txt` — Conceptos financieros
- `historia_y_cultura.txt` — Historia universal
- `inteligencia_emocional.txt` — Psicología e inteligencia emocional
- `jasboot_doc.txt` — Documentación del propio lenguaje Jasboot
- `lenguaje_c.txt` — Programación en C
- `software_senior.txt` — Ingeniería de software avanzada

**Funciones IA utilizadas:** `crear_memoria`, `recordar`, `aprender`, `buscar`, `reforzar`, `asociar`, `consolidar_memoria`, `cerrar_memoria`.

---

### 2. Base de Datos (`base_de_datos/`)

**Archivo:** `principal.jasb`  
**Tipo:** Demo de sistema modular con importaciones.

Ejemplo básico que demuestra:
- `usar {PI} de "./src/utils/constantes.jasb"` — importar constantes
- `usar {menu_principal} de "./src/utils/menu.jasb"` — importar funciones

**Ejecutar:**
1. Abrir `base_de_datos/principal.jasb`
2. Presionar **F5**

**Estructura:**
```
base_de_datos/
├── principal.jasb          ← punto de entrada
└── src/utils/
    ├── constantes.jasb     ← constante PI
    └── menu.jasb           ← función menu_principal()
```

---

### 3. BD JSON CRUD (`bd_json_crud/`)

**Archivo:** `bd_json_crud_demo.jasb`  
**Tipo:** Base de datos JSON interactiva por consola.

Sistema completo de base de datos con colecciones dinámicas que persiste en `bd_demo.json`. Menú con 10 operaciones:

| Opción | Acción                |
|--------|-----------------------|
| 1      | Crear fila            |
| 2      | Listar tabla          |
| 3      | Ver por ID            |
| 4      | Editar fila           |
| 5      | Borrar fila           |
| 6      | Nueva colección       |
| 7      | Elegir colección      |
| 8      | Añadir columna        |
| 9      | Ver esquema (columnas)|
| A      | Listar colecciones    |
| 0      | Salir                 |

**Ejecutar:**
1. Abrir `bd_json_crud/bd_json_crud_demo.jasb`
2. Presionar **F5**

**Módulo núcleo:** `bd_json_core.jasb` (motor JSON interno con ~25k caracteres de lógica).

---

### 4. Clases y Polimorfismo (`clase_polimorfismo_demo/`)

**Archivo:** `simulador_polimorfico.jasb`  
**Tipo:** Simulador de mazmorra que demuestra el sistema de clases de Jasboot.

Conceptos demostrados:
- **Clases:** `clase Entidad`, `clase Jugador extiende Entidad`, `clase Trampa extiende Tesoro`
- **Herencia** en dos niveles
- **Polimorfismo en caliente** — cambio dinámico de comportamiento (`m_baba.reaccionar` cambia en ronda 4)
- **vec2** — posición y distancia euclidiana
- **Mapas:** `mapa_crear()`, `mapa_poner()`
- **Listas tipadas:** `lista<texto>`, `lista<entero>`
- **`seleccionar`/`caso`** — switch/case
- **`para_cada`** — iteración sobre listas

**Ejecutar:**
1. Abrir `clase_polimorfismo_demo/simulador_polimorfico.jasb`
2. Presionar **F5**

**Módulo auxiliar:** `motor_mazmorra.jasb` — funciones exportadas con `enviar funcion`.

---

### 5. Colmado — Inventario (`colmado/`)

**Archivo:** `colmado.jasb`  
**Tipo:** Sistema de inventario para tienda/colmado (consola interactiva).

Aplicación completa con 12 opciones de menú:

| Opción | Acción                         |
|--------|--------------------------------|
| 1      | Listado completo (activos)     |
| 2      | Buscar por texto en nombre     |
| 3      | Alta de producto               |
| 4      | Baja lógica (ocultar por ID)   |
| 5      | Entrada de mercancía (+stock)  |
| 6      | Venta / salida (-stock)        |
| 7      | Carrito de venta (varias líneas)|
| 8      | Valor del inventario           |
| 9      | Productos con stock bajo       |
| 10     | Cambiar precio                 |
| 11     | Guardar a disco                |
| 12     | Recargar desde disco           |
| 0      | Salir (guarda automático)      |

**Ejecutar:**
1. Abrir `colmado/colmado.jasb`
2. Presionar **F5**

**Persistencia:** Archivo `colmado_inventario.tsv` (separador `|`). Precios en centavos (100 = RD$1.00).  
**Constantes:** `colmado_const.jasb` — `COLM_ARCHIVO`, `COLM_MAX_ITEMS` (2500), `COLM_ALERTA_STOCK` (12).  
**Datos semilla:** Si el archivo está vacío, se generan 6 productos automáticamente (Arroz, Aceite, Azúcar, Sal, Cloro, Jabón).

---

### 6. CRUD Notas (`crud_archivos_interactivo/`)

**Archivo:** `crud_notas.jasb`  
**Tipo:** CRUD interactivo de notas con persistencia en archivo de texto.

| Opción | Acción  |
|--------|---------|
| 1      | Crear   |
| 2      | Listar  |
| 3      | Ver     |
| 4      | Editar  |
| 5      | Borrar  |
| 0      | Salir   |

**Ejecutar:**
1. Abrir `crud_archivos_interactivo/crud_notas.jasb`
2. Presionar **F5**

**Estructura modular:**
```
crud_archivos_interactivo/
├── crud_notas.jasb        ← punto de entrada (menú)
└── lib/
    ├── const.jasb         ← constantes (separador, ruta archivo)
    ├── crud_leer.jasb     ← funciones de lectura
    └── crud_escribir.jasb ← funciones de escritura
```

---

### 7. NucleoDB (`nucleodb/`)

**Archivo:** `principal.jasb`  
**Tipo:** Motor de base de datos con servidor HTTP.

Servidor standalone que expone una API HTTP en `http://127.0.0.1:18302`. Usa el framework **Forja** (stdlib de Jasboot) y memoria neuronal.

**Ejecutar:**
1. Abrir `nucleodb/principal.jasb`
2. Presionar **F5**
3. El servidor queda escuchando en `http://127.0.0.1:18302`
4. **Ctrl+C** para detener

**Estructura:**
```
nucleodb/
├── principal.jasb              ← punto de entrada
├── data/                       ← datos persistidos (nodos, grafos, transacciones)
└── src/
    ├── almacenamiento/         ← motor de almacenamiento
    ├── busqueda/               ← motor de búsqueda
    ├── nucleo/                 ← lógica central
    └── protocolo/              ← despacho HTTP (forja.jasb)
```

---

### 8. Rapido API Prueba (`rapido_api_prueba/`)

**Archivo:** `rapido_api_prueba.jasb`  
**Tipo:** API REST completa estilo Express con integración Supabase.

Endpoints registrados:

| Método | Ruta                    | Descripción                |
|--------|-------------------------|----------------------------|
| GET    | `/`                     | Lista de endpoints         |
| GET    | `/items/:id`            | Item por ID                |
| GET    | `/saludo/:nombre`       | Saludo personalizado       |
| GET    | `/api/salud`            | Health check               |
| POST   | `/api/echo`             | Echo JSON                  |
| GET    | `/api/supabase/estado`  | Estado de conexión Supabase|
| GET    | `/api/supabase/muestra` | Consulta de prueba         |

**Ejecutar:**
1. Copiar `.env.example` a `.env` y configurar (opcional para Supabase)
2. Abrir `rapido_api_prueba/rapido_api_prueba.jasb`
3. Presionar **F5**
4. El servidor queda escuchando en `http://127.0.0.1:3000`

**Variables de entorno (`.env`):**
- `PORT` — Puerto (por defecto 3000)
- `RAPIDO_CLUSTER` — Número de workers para modo cluster
- `SUPABASE_DATABASE_URL` — URI del pooler Supabase
- `SUPABASE_ANON_KEY` — Llave API de Supabase

**Estructura:**
```
rapido_api_prueba/
├── rapido_api_prueba.jasb       ← punto de entrada
├── .env.example                 ← plantilla de configuración
└── controladores/
    ├── rutas_demo.jasb          ← rutas demo (/, /items/:id, /saludo)
    └── rutas_supabase.jasb      ← rutas Supabase (/estado, /muestra)
```

---

### 9. Rapido Demo (`rapido_demo/`)

**Archivo:** `rapido_demo.jasb`  
**Tipo:** API mínima estilo Express.

Demo simplificado del framework **Rapido** con solo 2 endpoints:
- `GET /` → `{"mensaje":"API funcionando"}`
- `GET /saludo/:nombre` → `{"mensaje":"Hola, <nombre>!"}`

**Ejecutar:**
1. Abrir `rapido_demo/rapido_demo.jasb`
2. Presionar **F5**
3. El servidor queda escuchando en `http://127.0.0.1:3000`

---

### 10. RRHH Gestión (`rrhh_gestion/`)

**Archivo:** `rrhh_app.jasb`  
**Tipo:** Sistema de gestión de empleados y nóminas (consola interactiva).

Aplicación empresarial completa con 13 opciones:

| Opción | Acción                               |
|--------|--------------------------------------|
| 1      | Listar empleados activos             |
| 2      | Listar todos (incluye baja lógica)   |
| 3      | Alta de empleado                     |
| 4      | Baja lógica de empleado              |
| 5      | Buscar por texto (nombre/documento)  |
| 6      | Cambiar salario base                 |
| 7      | Registrar línea de nómina            |
| 8      | Listar nóminas de un empleado        |
| 9      | Listar nóminas por periodo (AAAA-MM) |
| 10     | Marcar nómina como liquidada         |
| 11     | Resumen (headcount, masa salarial)   |
| 12     | Guardar todo a disco                 |
| 13     | Recargar desde disco                 |
| 0      | Salir (guarda automáticamente)       |

**Ejecutar:**
1. Abrir `rrhh_gestion/rrhh_app.jasb`
2. Presionar **F5**

**Persistencia:** `RRHH_empleados.tsv` y `RRHH_nominas.tsv` (separador `|`). Importes en centavos.

**Estructura modular:**
```
rrhh_gestion/
├── rrhh_app.jasb                ← punto de entrada
└── mod/
    ├── rrhh_const.jasb          ← constantes
    ├── rrhh_estado.jasb         ← estado global (listas)
    ├── rrhh_util.jasb           ← utilidades (trim, limpieza)
    ├── rrhh_empleados.jasb      ← lógica de empleados
    ├── rrhh_alta_empleado.jasb  ← alta de empleado
    ├── rrhh_nominas.jasb        ← lógica de nóminas
    ├── rrhh_reportes.jasb       ← reportes y resúmenes
    └── rrhh_persist.jasb        ← persistencia a disco
```

---

### 11. Supabase Smoke Test (`supabase_smoke/`)

**Archivo:** `supabase_smoke.jasb`  
**Tipo:** Prueba rápida del cliente REST de Supabase.

Conecta directamente a Supabase usando URI de PostgreSQL + llave API y hace un `SELECT * LIMIT 2` a una tabla.

**Ejecutar:**
1. Editar `supabase_smoke.jasb` y reemplazar:
   - `TU_REF_AQUI` por tu referencia de proyecto Supabase
   - `tu_clave_bd` por tu contraseña de base de datos
   - `PEGAR_SUPABASE_ANON_O_SERVICE_ROLE_JWT` por tu llave API
2. Presionar **F5**

> **Importante:** Requiere conexión a internet y un proyecto Supabase activo.

---

## Resumen de Tecnologías Demostradas

| Característica                 | Proyectos que la usan                              |
|--------------------------------|----------------------------------------------------|
| **Funciones y módulos** (`usar`)| Todos                                              |
| **Clases y herencia**          | `clase_polimorfismo_demo`                          |
| **Polimorfismo dinámico**      | `clase_polimorfismo_demo`                          |
| **vec2 y matemáticas**         | `clase_polimorfismo_demo`                          |
| **Mapas (`mapa`)**             | `clase_polimorfismo_demo`                          |
| **Listas tipadas**             | `colmado`, `clase_polimorfismo_demo`, `rrhh_gestion`|
| **Persistencia TSV**           | `colmado`, `rrhh_gestion`, `crud_archivos_interactivo`|
| **Persistencia JSON**          | `bd_json_crud`                                     |
| **Memoria neuronal**           | `aurora_ia`, `nucleodb`                            |
| **Servidor HTTP (Rapido)**     | `rapido_demo`, `rapido_api_prueba`                 |
| **Servidor HTTP (Forja)**      | `nucleodb`                                         |
| **Supabase REST**              | `rapido_api_prueba`, `supabase_smoke`              |
| **Variables de entorno (.env)**| `rapido_api_prueba`                                |
| **`seleccionar`/`caso`**       | `colmado`, `rrhh_gestion`, `clase_polimorfismo_demo`|
| **`para_cada`**                | `clase_polimorfismo_demo`                          |
| **Constantes exportadas**      | `colmado`, `base_de_datos`                         |

---

## Estructura General

```
apps/
├── README.md                        ← este archivo
├── .gitignore
├── aurora_ia/                       ← IA con memoria
├── base_de_datos/                   ← demo modular
├── bd_json_crud/                    ← BD JSON interactiva
├── Cajero_ATM/                      ← (pendiente)
├── clase_polimorfismo_demo/         ← clases y polimorfismo
├── colmado/                         ← inventario de tienda
├── crud_archivos_interactivo/       ← CRUD de notas
├── nucleodb/                        ← motor de datos + servidor HTTP
├── rapido_api_prueba/               ← API REST completa
├── rapido_demo/                     ← API REST mínima
├── rrhh_gestion/                    ← gestión empresarial RRHH
└── supabase_smoke/                  ← test Supabase
```