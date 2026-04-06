# Colmado — inventario (Jasboot)

Aplicación de consola para gestionar inventario de un colmado: altas, bajas lógicas, entradas/salidas de stock, búsqueda, valorización, alertas por stock bajo y persistencia en archivo TSV.

## Requisitos

- Compilador `jbc` y VM `jasboot-ir-vm` del repo (mismas versiones que el resto del boot).

## Cómo ejecutar

Desde esta carpeta (`apps/colmado`), para que el archivo de datos quede aquí:

```powershell
Set-Location c:\src\jasboot\apps\colmado
& ..\..\sdk-dependiente\jas-compiler-c\bin\jbc.exe colmado.jasb -e
```

Si no usas `-e`, compila a `colmado.jbo` y ejecuta la VM con ese binario como suelas en el proyecto.

## Datos

- Archivo por defecto: `colmado_inventario.tsv` (ruta relativa al directorio de trabajo).
- Formato: una fila de cabecera opcional y líneas `id|nombre|categoria|precio_cent|stock|activo`.
- **Precio** en **centavos** de peso (100 = RD$1.00). Ejemplo: 45000 → RD$450.00.
- No uses el carácter `|` en nombres ni categorías.
- **Baja lógica**: `activo` pasa a 0; el ítem no se borra del archivo al guardar, pero deja de mostrarse en listados de activos.

## Límites (configurables)

En `colmado_const.jasb`:

- `COLM_MAX_ITEMS` — máximo de filas en memoria (incluye inactivos).
- `COLM_ALERTA_STOCK` — umbral para la opción “stock bajo”.
- `COLM_ARCHIVO` — nombre del archivo de persistencia.

## Nota técnica

El compilador Jasboot actual solo admite **hasta cuatro argumentos** en llamadas a funciones definidas por el usuario; por eso el estado del inventario vive en **variables globales** en `colmado.jasb` en lugar de pasar muchas listas como parámetros.

## Primera ejecución

Si no existe el archivo TSV, el programa arranca vacío y carga **unos pocos productos de ejemplo** para poder probar el menú en seguida. Tras la primera salida con guardado, los datos quedan en disco.
