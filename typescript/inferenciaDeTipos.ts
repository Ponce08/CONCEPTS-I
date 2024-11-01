// La inferencia de tipos avanzada en TypeScript permite que el compilador deduzca automáticamente el tipo de muchas variables, parámetros y valores de retorno sin necesidad de especificar el tipo explícitamente. Esto hace que el código sea más conciso y seguro, ya que TypeScript identifica tipos complejos y los ajusta según el contexto.

// 1. Inferencia de tipos avanzada
// TypeScript realiza una inferencia de tipos avanzada en varios contextos, como en funciones, objetos y tipos genéricos.

// Inferencia en variables y objetos
// TypeScript intenta deducir el tipo de una variable basada en su valor inicial. Esto también aplica para objetos complejos:
let numero = 10; // Inferido como `number`
let texto = 'Hola mundo'; // Inferido como `string`

const persona = {
  nombre: 'Alice',
  edad: 30
}; // Inferido como `{ nombre: string; edad: number }`
// Si intentamos cambiar numero a un string después de su declaración inicial, TypeScript lanzará un error, ya que ha inferido que numero es de tipo number.

// Inferencia en arreglos
// TypeScript también infiere el tipo de un arreglo en función de los elementos iniciales:
let numeros = [1, 2, 3]; // Inferido como `number[]`
let mixto = [1, 'hello', true]; // Inferido como `(string | number | boolean)[]`

// 2. Inferencia de tipos en funciones
// Inferencia de parámetros y tipos de retorno
// TypeScript infiere automáticamente el tipo de retorno de una función basándose en el valor devuelto en su implementación:
function sumar(a: number, b: number) {
  return a + b; // TypeScript infiere que el tipo de retorno es `number`
}

let resultado = sumar(5, 10); // `resultado` es inferido como `number`
// En el ejemplo anterior, aunque no especificamos el tipo de retorno de sumar, TypeScript deduce que es number porque el resultado de a + b es un number.

// Inferencia avanzada con funciones anidadas
// TypeScript también puede inferir tipos cuando hay funciones anidadas. Veamos un ejemplo en el que se infiere el tipo de transformar dentro de procesarNumeros:
function procesarNumeros(numeros: number[]) {
  const transformar = (n: number) => n * 2; // Inferido como `(n: number) => number`
  return numeros.map(transformar); // Inferido como `number[]`
}

const resultado2 = procesarNumeros([1, 2, 3]); // Inferido como `number[]`

// 3. Inferencia en funciones genéricas
// TypeScript utiliza la inferencia de tipos en funciones genéricas para deducir el tipo del parámetro genérico en función de los argumentos pasados:
function envolverEnArray<T>(valor: T): T[] {
  return [valor];
}

const arrayDeNumeros = envolverEnArray(5); // Inferido como `number[]`
const arrayDeTexto = envolverEnArray('hello'); // Inferido como `string[]`
// Aquí, TypeScript infiere el tipo de T según el tipo de argumento pasado a envolverEnArray. En el primer caso, T es number, y en el segundo caso, T es string.

// 4. Inferencia avanzada en tipos de retorno condicionales
// TypeScript también permite que los tipos de retorno de una función se ajusten condicionalmente basándose en los tipos de los parámetros mediante tipos condicionales:
/**
**      type IsArray<T> = T extends any[] ? "Es un array" : "No es un array";

**      function verificarTipo<T>(valor: T): IsArray<T> {
**          return Array.isArray(valor) ? "Es un array" : "No es un array";
**      }

**      const resultado1 = verificarTipo([1, 2, 3]);    // Inferido como "Es un array"
**      const resultado2_ = verificarTipo("hello");      // Inferido como "No es un array"
 */

// 5. Inferencia con tipos de retorno que dependen de múltiples parámetros
// Cuando una función recibe varios parámetros, TypeScript puede inferir el tipo de retorno en función de estos. Esto es útil, especialmente en funciones que procesan diferentes tipos de datos de manera flexible.
function combinar<T, U>(a: T, b: U): T | U {
  return Math.random() > 0.5 ? a : b;
}

const resultado3 = combinar(5, 'texto'); // Inferido como `number | string`

// Resumen
// Inferencia en variables y objetos: TypeScript deduce el tipo de una variable basada en su valor.
// Inferencia en funciones: Los tipos de retorno de funciones y parámetros se infieren automáticamente.
// Inferencia en funciones genéricas: Los tipos genéricos se infieren basándose en los argumentos pasados.
// Inferencia condicional: Permite deducir el tipo de retorno condicionalmente basándose en los tipos de los parámetros.
