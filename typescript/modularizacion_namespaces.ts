// En TypeScript, modularización y namespaces son dos técnicas que ayudan a organizar el código en proyectos grandes, mejorando su mantenibilidad, claridad y reusabilidad. Aunque comparten un propósito similar, existen diferencias importantes entre ellas, especialmente en cómo se utilizan y en el contexto en el que son más útiles.

// 1. Modularización en TypeScript
// La modularización se refiere a la práctica de dividir el código en archivos y módulos independientes que se pueden importar y exportar entre sí. TypeScript (al igual que JavaScript moderno) utiliza el sistema de módulos de ES6, lo cual es ideal para proyectos grandes, aplicaciones web, y proyectos que necesitan agrupar lógicamente funcionalidades en componentes reutilizables.

// Características clave de la Modularización
// Los módulos en TypeScript son archivos separados que utilizan las palabras clave export e import para definir y consumir funcionalidades.
// Cada archivo TypeScript se considera un módulo si contiene al menos una declaración export o import.
// Los módulos son altamente compatibles con las herramientas de construcción y empaquetado como Webpack, es decir, permiten que el código se ejecute en navegadores o entornos Node.js.
// Ejemplo de Modularización en TypeScript
// Supongamos que tenemos un archivo mathUtils.ts que exporta algunas funciones matemáticas:
// mathUtils.ts
export function sumar(a: number, b: number): number {
    return a + b;
  }
  
  export function multiplicar(a: number, b: number): number {
    return a * b;
  }
// Para usar estas funciones en otro archivo, podemos importarlas:
// main.ts
/**
**      import { sumar, multiplicar } from //'./mathUtils';

**      console.log(sumar(2, 3)); // 5
**      console.log(multiplicar(4, 5)); // 20 
*/

// Ventajas de la Modularización
// Encapsulación: Puedes mantener el código relacionado junto y ocultar los detalles de implementación.
// Reutilización: Funciones, clases y constantes se pueden reutilizar en diferentes archivos sin necesidad de reescribirlas.
// Soporte de herramientas: Herramientas como Webpack o Rollup pueden optimizar los módulos para que funcionen en entornos específicos.
// Tipos de Exportaciones
// Exportaciones nombradas (export {}): Exporta cada función, variable o clase de manera individual.
// Exportación por defecto (export default): Permite exportar un solo valor o entidad por defecto del módulo. Al importar, no es necesario usar llaves {}.
// Ejemplo de exportación por defecto:
// logger.ts
export default function log(message: string): void {
    console.log(message);
  }
  
  // main.ts
 /**
  **    import log from './logger';
  **    log("Hola, TypeScript!"); // Llama la función importada
  */
  
//   2. Namespaces en TypeScript
//   Namespaces (o espacios de nombres) en TypeScript son una forma de agrupar código dentro de un solo archivo o a través de múltiples archivos sin utilizar el sistema de módulos. Los namespaces son útiles cuando se necesita una organización de código dentro de un solo proyecto que no depende de herramientas de empaquetado o exportación/importación de ES6, como en aplicaciones que deben correr de manera inmediata en el navegador sin un proceso de empaquetado.
  
//   Sintaxis y Uso de Namespaces
//   Un namespace se define con la palabra clave namespace y puede contener funciones, clases, interfaces y variables. Todo lo que se define dentro de un namespace debe ser accesible a través del nombre del namespace, a menos que se marque como export.
namespace Matemáticas {
    export function sumar(a: number, b: number): number {
      return a + b;
    }
  
    export function multiplicar(a: number, b: number): number {
      return a * b;
    }
  }
  
  // Usando el namespace
  console.log(Matemáticas.sumar(2, 3)); // 5
  console.log(Matemáticas.multiplicar(4, 5)); // 20

//   Namespaces en Múltiples Archivos
//   TypeScript permite extender namespaces en múltiples archivos, siempre y cuando se use la opción --outFile del compilador para combinarlos en un solo archivo JavaScript.  
// archivo1.ts
namespace MiNamespace {
  export function saludar() {
    console.log("¡Hola desde archivo1!");
  }
}

// archivo2.ts
namespace MiNamespace {
  export function despedir() {
    console.log("¡Adiós desde archivo2!");
  }
}
// Luego, compilar y combinar:
/**
 * tsc archivo1.ts archivo2.ts --outFile salida.js
 */
// Esto creará un solo archivo salida.js que contendrá el código de ambos archivos bajo el mismo namespace MiNamespace.


// Ventajas y Desventajas de Namespaces
// Ventajas:

// Facilita la agrupación de código sin necesidad de utilizar el sistema de módulos.
// Funciona bien en proyectos que no usan herramientas de empaquetado, especialmente si solo se necesita un archivo de salida.
// Desventajas:

// Menos flexible para grandes proyectos o aplicaciones escalables en comparación con los módulos.
// Menor compatibilidad con el ecosistema de herramientas modernas (Webpack, Babel).
// Namespaces pueden causar confusión y problemas de alcance en proyectos grandes.