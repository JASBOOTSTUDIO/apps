# RRHH — gestión de empleados y nóminas (Jasboot)

Aplicación de **consola interactiva** para una PYME: alta/baja lógica de empleados, salario base en **centavos**, registro de **líneas de nómina** por periodo (`AAAA-MM`), liquidación, búsqueda por nombre o documento, listados y resumen. Persistencia en **TSV** (texto separado por `|`).

**Aviso:** es una **demo educativa / interna** en Jasboot, no sustituye software homologado ni asesoría laboral o fiscal. Revise importes, retenciones y normativa de su país con un profesional.

## Requisitos

- `jbc` y `jasboot-ir-vm` del SDK en este monorepo (mismas versiones que el resto del proyecto).

## Ejecutar

Desde esta carpeta (`apps/rrhh_gestion`), para que los `.tsv` se creen junto al programa:

```powershell
Set-Location c:\src\jasboot\apps\rrhh_gestion
& ..\..\sdk-dependiente\jas-compiler-c\bin\jbc.exe rrhh_app.jasb -e
```

## Archivos de datos

| Archivo | Contenido |
|---------|-----------|
| `RRHH_empleados.tsv` | `id`, nombre, documento, departamento, cargo, `salario_cent`, activo (1/0) |
| `RRHH_nominas.tsv` | `id`, `empleado_id`, periodo, `bruto_cent`, `deducciones_cent`, liquidada (0=borrador, 1=sí) |

El **neto** mostrado en listados es `bruto - deducciones` (no se guarda duplicado).

**No** use el carácter `|` en campos de texto libres.

## Estructura del código

| Ruta | Rol |
|------|-----|
| `rrhh_app.jasb` | Punto de entrada: `usar todo` de los módulos y el `principal` (menú). |
| `mod/rrhh_const.jasb` | Constantes (archivos, separador, límites). |
| `mod/rrhh_estado.jasb` | Listas globales, IDs siguientes, buffers de formulario, `rrhh_init`. |
| `mod/rrhh_util.jasb` | Utilidades de texto y `rrhh_poner_entero_lista`. |
| `mod/rrhh_empleados.jasb` | Empleados y TSV de empleados (`rrhh_emp_alta`, listados, etc.). |
| `mod/rrhh_alta_empleado.jasb` | Consola: flujo **agregar empleado** (`rrhh_interactivo_agregar_empleado`). |
| `mod/rrhh_nominas.jasb` | Nóminas y TSV de nóminas. |
| `mod/rrhh_reportes.jasb` | Resumen y datos de ejemplo (`rrhh_semilla`). |
| `mod/rrhh_persist.jasb` | `rrhh_guardar_todo` (empleados + nóminas). |

## Configuración

En `mod/rrhh_const.jasb`:

- `RRHH_ARCH_EMP`, `RRHH_ARCH_NOM` — nombres de archivo.
- `RRHH_MAX_EMP`, `RRHH_MAX_NOM` — límites en memoria.

## Funciones del menú (resumen)

1. Listar empleados activos  
2. Listar todos (incluye baja lógica)  
3. Alta de empleado  
4. Baja lógica por ID  
5. Buscar por texto (`buscar_en_texto` sobre nombre o documento)  
6. Cambiar salario base (centavos)  
7. Registrar nómina (bruto / deducciones; valida deducción ≤ bruto)  
8. Nóminas de un empleado  
9. Nóminas de un periodo  
10. Marcar nómina como liquidada  
11. Resumen (activos, suma salarios, total registros nómina)  
12. Guardar  
13. Recargar desde disco (confirmar con `SI`)  
0. Salir (guarda automático)

Primera ejecución sin datos: se cargan **tres empleados de ejemplo**; puede borrarlos o sustituirlos y guardar.

## Limitación del compilador

Como en `apps/colmado`, las funciones de usuario admiten como máximo **cuatro parámetros**; por eso parte del estado va en **variables globales** y `g_buf_*` para altas y nóminas.

## Tecnologías Jasboot usadas (referencia)

Listas genéricas, `mem_lista_*`, `dividir_texto`, `concatenar`, `str_a_entero` / `str_desde_numero`, `longitud`, `buscar_en_texto`, `abrir_archivo` / `escribir_archivo` / `leer_linea_archivo` / `cerrar_archivo` / `existe_archivo` / `fin_archivo`, `ingresar_texto`, `imprimir` / `imprimir_sin_salto`, `limpiar_consola`, `seleccionar`/`caso`, `usar`/`enviar` entre módulos `.jasb`.
