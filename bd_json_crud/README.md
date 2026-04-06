## BD en JSON (colecciones dinámicas)

Demo autocontenida: archivo `bd_demo.json`. El programa debe ejecutarse **desde esta carpeta** (CWD) para que encuentre `bd_demo.json` junto al `.jbo`.

### Formato

- **v2 (actual):** `version`, `current` (nombre de colección activa), `collections` (array de `{ name, nextId, columns, items }`).
- Cada **columna** es `{ "name": "...", "kind": "texto" | "json" }`. `json` permite objetos/arrays anidados: el valor se escribe como JSON en consola.
- **v1 legado:** `{"items":[],"nextId":n}` se **migra al cargar** a una colección `principal` con columnas `nombre` y `correo`.

### Código compartido

- `bd_json_core.jasb`: lógica de archivo v2 (migración, colecciones, filas, columnas). Lo usan la consola y la API.

### Compilar y ejecutar (consola)

```text
..\..\sdk-dependiente\jas-compiler-c\bin\jbc.exe bd_json_crud_demo.jasb -o bd_json_crud_demo.jbo
..\..\sdk-dependiente\jasboot-ir\bin\jasboot-ir-vm.exe bd_json_crud_demo.jbo
```

### API HTTP (backend)

Servidor JSON sobre el mismo `bd_demo.json`, con CORS `Access-Control-Allow-Origin: *` y cierre de conexión tras cada respuesta.

Escucha solo en **`127.0.0.1`** (IPv4). Abre **`http://127.0.0.1:8787/`** en el navegador: verás una **página de ayuda** en `/` y los JSON bajo `/api/...`. Si usas `http://localhost:...` y la pestaña se queda cargando, prueba **`127.0.0.1`** (en Windows a veces `localhost` va por IPv6 y no llega al servidor).

**Compilar y arrancar** (CWD = esta carpeta; puerto opcional, por defecto `8787`):

```text
..\..\sdk-dependiente\jas-compiler-c\bin\jbc.exe bd_json_api.jasb -o bd_json_api.jbo
..\..\sdk-dependiente\jasboot-ir\bin\jasboot-ir-vm.exe bd_json_api.jbo 8787
```

| Método y ruta | Descripción |
|---------------|-------------|
| `GET /` | Página HTML con enlaces a la API |
| `GET /api` | Resumen de rutas disponibles |
| `GET /api/health` | `{"ok":true}` |
| `GET /api/document` | Documento completo (JSON con sangría) |
| `PUT /api/document` | Cuerpo = documento v2 completo (reemplaza archivo) |
| `GET /api/collections` | `["nombre", ...]` |
| `POST /api/collections` | Cuerpo `{"name":"nueva_coleccion"}` (queda activa) |
| `GET /api/current` | `{"name":"..."}` colección activa |
| `PUT /api/current` | Cuerpo `{"name":"..."}` |
| `GET /api/schema` | Columnas de la colección activa |
| `POST /api/columns` | Cuerpo `{"name":"col","kind":"texto"\|"json"}` |
| `GET /api/rows` | `items` de la colección activa |
| `GET /api/row?id=n` | Una fila |
| `POST /api/rows` | Cuerpo JSON con **todas** las columnas del esquema; el `id` lo asigna el servidor |
| `PUT /api/row?id=n` | Cuerpo JSON con todas las columnas |
| `DELETE /api/row?id=n` | Borra la fila |
| `OPTIONS /*` | Preflight CORS (`204`) |

Ejemplo:

```powershell
Invoke-WebRequest http://127.0.0.1:8787/api/health -UseBasicParsing
```

### Menú

| Opción | Acción |
|--------|--------|
| 1 | Crear fila (pide valor por cada columna del esquema) |
| 2 | Listar tabla (colores ANSI) |
| 3 | Ver por id (detalle; columnas `json` con sangría) |
| 4–5 | Editar / borrar fila |
| 6 | Nueva colección (vacía; pasa a ser la activa) |
| 7 | Cambiar colección activa |
| 8 | Añadir columna (`1` texto, `2` json); rellena filas existentes con `""` o `null` |
| 9 | Listar columnas del esquema actual |
| A / a | Listar colecciones |
| 0 | Salir |

**Entrada por tubería** (`--continuo`):

```powershell
Get-Content demo_stdin.txt | ..\..\sdk-dependiente\jasboot-ir\bin\jasboot-ir-vm.exe --continuo bd_json_crud_demo.jbo
```

### Notas

- En columnas **json**, el texto debe ser JSON válido (objetos, arrays, números, etc.).
- Para **texto**, se escapan comillas y barras al guardar.
- El borrado conserva los caminos explícitos para listas de **0, 1 y 2** elementos en `items`, como en el demo anterior.
