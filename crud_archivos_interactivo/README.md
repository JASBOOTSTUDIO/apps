# CRUD interactivo con archivos (Jasboot)

Mini aplicación de consola que persiste **notas** en `crud_notas.tsv` (formato `id|titulo|notas`), usando las APIs de archivo del lenguaje: `abrir_archivo`, `cerrar_archivo`, `escribir_archivo`, `leer_linea_archivo`, `fin_archivo`, `existe_archivo`, `fs_leer_texto`, listas y `dividir_texto`, más `ingresar_texto` para el menú.

## Estructura del código

| Ruta | Rol |
|------|-----|
| `crud_notas.jasb` | Punto de entrada: `usar` de los módulos y bucle del **menú** interactivo. |
| `lib/const.jasb` | `enviar` **CRUD_ARCH** y **CRUD_SEP** (ruta del TSV y separador de campos). |
| `lib/crud_leer.jasb` | Consultas: **crud_max_id**, **crud_buscar_linea_por_id** (solo lectura del archivo). |
| `lib/crud_escribir.jasb` | Mutaciones: **crud_archivo_sin_id**, **crud_reemplazar_linea**, **crud_guardar_texto**. |

Los `.jasb` de `lib/` importan `const.jasb` con rutas relativas **desde su propia carpeta** (`usar todas de "const.jasb"`). El programa raíz importa con `lib/…`. Solo los símbolos marcados con **`enviar`** son visibles al enlazar.

## Menú

| Tecla | Acción |
|-------|--------|
| 1 | Crear (asigna el siguiente id automático) |
| 2 | Listar todo el archivo |
| 3 | Ver una fila por id |
| 4 | Editar titulo y notas por id (reescribe el archivo) |
| 5 | Borrar por id (reescribe el archivo) |
| 0 | Salir |

Línea vacía en la opción (p. ej. **EOF** en stdin) termina el programa con un mensaje claro.

## Consola

Antes de cada vuelta del menú se llama **`limpiar_consola`** (ANSI + `cls` en Windows al recompilar `jbc`). Tras cada acción (crear, listar, etc.) hay **«Enter para volver al menu»**: así la pantalla no se borra hasta que confirmes y puedes leer el listado. **`demo_stdin.txt`** incluye líneas en blanco extra para simular esas pulsaciones en tuberías.

## Ejecutar

Desde esta carpeta (el `.tsv` se crea **aquí** como `crud_notas.tsv`):

```bat
..\..\sdk-dependiente\jas-compiler-c\bin\jbc.exe crud_notas.jasb -o %TEMP%\crud.jbo
..\..\sdk-dependiente\jasboot-ir\bin\jasboot-ir-vm.exe --continuo %TEMP%\crud.jbo
```

Sin `--continuo`, un **EOF** temprano en stdin puede detener la VM; con menú interactivo conviene `--continuo`.

**Demostración con entrada prefijada** (`demo_stdin.txt`):

```bat
type demo_stdin.txt | ..\..\sdk-dependiente\jasboot-ir\bin\jasboot-ir-vm.exe --continuo %TEMP%\crud.jbo
```

## Notas

- No uses el carácter `|` dentro de título o notas (es el separador de campos).
- Tras **editar** o **borrar**, el archivo se guarda en modo `"wb"` con saltos `\n` entre líneas.
- **Crear** abre en `"a"` para añadir al final (comportamiento típico de log).
