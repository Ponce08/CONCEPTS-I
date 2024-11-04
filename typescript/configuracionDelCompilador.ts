// La configuración y optimización del compilador en TypeScript se controla principalmente a través del archivo de configuración tsconfig.json, donde puedes definir cómo quieres que TypeScript compile el código y ajuste el rendimiento. Aquí te explico los aspectos más importantes de esta configuración y las opciones de optimización.

// 1. Creación del Archivo tsconfig.json
// Para crear un archivo de configuración de TypeScript, usa el comando:
/**
 **      tsc --init
 */
//  Esto generará un archivo tsconfig.json con varias opciones configurables. Aquí puedes establecer configuraciones específicas para el compilador, directorios de salida, opciones de depuración, entre otros


// 2. Opciones Principales del Compilador
// Algunas de las opciones más importantes del compilador para configuraciones básicas y optimización incluyen:

// target: Especifica la versión de JavaScript a la que se compilará el código (por ejemplo, es5, es6, es2017).
/**
 **      "target": "es6"
 */

// module: Determina el sistema de módulos que TypeScript usará para la salida, como commonjs, es6, amd, etc.
/**
 **      "module": "commonjs"
 */

// outDir: Define la carpeta donde se colocará el código compilado.
/**
 **      "outDir": "./dist"
 */

// rootDir: Especifica la carpeta raíz de los archivos de entrada, ideal para organizar bien el proyecto.
/**
 **      "rootDir": "./src"
 */

// strict: Activa el modo estricto de TypeScript, que incluye varias comprobaciones para garantizar un código más seguro.
/**
 **      "strict": true
 */


//  3. Opciones de Optimización
//  Las opciones de optimización del compilador ayudan a reducir el tamaño del archivo de salida y mejorar el rendimiento de la compilación. Aquí te muestro algunas de las opciones más importantes para optimizar la salida:
 
//  noEmitOnError: Impide la generación de archivos de salida si hay errores en el código, asegurando que solo se compile el código sin errores.
/**
 **      "noEmitOnError": true
 */

// skipLibCheck: Omite la verificación de tipos en los archivos .d.ts de las bibliotecas, lo que puede acelerar la compilación si tienes muchas dependencias.
/**
 **      "skipLibCheck": true
 */

// noUnusedLocals y noUnusedParameters: Emiten advertencias si tienes variables o parámetros sin usar, ayudando a mantener el código limpio y optimizado.
/**
 **     "noUnusedLocals": true,
 **     "noUnusedParameters": true
 */

//removeComments: Elimina los comentarios en la salida de JavaScript, lo que reduce el tamaño del archivo final.
/**
 **      "removeComments": true
 */

// downlevelIteration: Permite la iteración de manera más eficiente cuando se hace una compilación a ES5.
/**
 **      "downlevelIteration": true
 */

// incremental: Habilita la compilación incremental, creando archivos de caché para que en la próxima compilación solo se recompilen los archivos modificados. Esto es especialmente útil en proyectos grandes.
/**
 **      "incremental": true
 */


//  4. Configuración para el Desarrollo y la Producción
//  Puedes crear configuraciones específicas para entornos de desarrollo y producción en tu proyecto. Esto se logra mediante múltiples archivos tsconfig.json o extensiones de configuración.
 
//  Ejemplo de tsconfig.prod.json para producción:
/**
**      {
**         "extends": "./tsconfig.json",
**        "compilerOptions": {
**            "removeComments": true,
**            "sourceMap": false,
**            "noEmitOnError": true
**        }
**      }
 */

// Ejemplo de tsconfig.dev.json para desarrollo:
/**
**      {
**        "extends": "./tsconfig.json",
**        "compilerOptions": {
**          "sourceMap": true,  // Para ayudar en la depuración
**          "noEmitOnError": false
**        }
**      }
 */

// Luego, puedes compilar utilizando una configuración específica:
/**
 **      tsc -p tsconfig.prod.json
 */

// 5. sourceMap para Depuración
// Habilitar los sourceMap permite que el navegador o la herramienta de depuración mapée el archivo JavaScript compilado al archivo TypeScript original, lo que facilita la depuración.
/**
 **      "sourceMap": true
 */
// Esto es útil en desarrollo, pero es mejor desactivarlo en producción para evitar exponer el código fuente.


// 6. Otras Opciones Útiles
// declaration: Genera archivos .d.ts que contienen las declaraciones de tipos del código. Esto es útil cuando quieres compartir tu código TypeScript como una biblioteca para otros desarrolladores.
/**
 **      "declaration": true
 */

//  outFile: Combina todos los archivos de salida en un solo archivo JavaScript. Es útil para proyectos en AMD o SystemJS.
/**
 **      "outFile": "./dist/bundle.js"
 */

//  lib: Permite especificar las bibliotecas estándar de JavaScript a las que el código tendrá acceso (por ejemplo, es6, dom), permitiendo optimizar según el entorno de ejecución esperado.
/**
 **      "lib": ["es6", "dom"]
 */


//  7. Ejemplo Completo de un tsconfig.json Optimizado
//  Este archivo de configuración puede servir como punto de partida para optimizar la compilación en TypeScript:
/**
 **     {
 **      "compilerOptions": {
 **        "target": "es6",
 **        "module": "commonjs",
 **        "outDir": "./dist",
 **        "rootDir": "./src",
 **        "strict": true,
 **        "noEmitOnError": true,
 **        "skipLibCheck": true,
 **        "removeComments": true,
 **        "incremental": true,
 **        "noUnusedLocals": true,
 **        "noUnusedParameters": true,
 **        "sourceMap": false,
 **        "declaration": true,
 **        "lib": ["es6", "dom"]
 **        },
 **       ....Aqui va la linea 155...
 **      "exclude": ["node_modules", "dist"]
**      }
*/
//   "include": ["src/**/*.ts"],...esto va en la linea 151


// Resumen
// Estas configuraciones te permitirán mejorar tanto el tiempo de compilación como el rendimiento en ejecución del código TypeScript. Para proyectos grandes, la compilación incremental y el uso de skipLibCheck pueden marcar una gran diferencia. Además, recuerda ajustar las opciones de depuración (sourceMap) y la limpieza de comentarios (removeComments) según el entorno (desarrollo o producción) para optimizar aún más el resultado final.
