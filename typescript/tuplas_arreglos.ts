// En TypeScript, la manipulación de tuplas y arreglos se basa en las mismas bases que en JavaScript, pero con características adicionales, como la capacidad de definir tipos específicos para cada elemento en una tupla y el uso de métodos de arreglos con seguridad de tipos. A continuación, te explico cómo funcionan y algunos ejemplos:

// 1. Manipulación de Arreglos
// En TypeScript, puedes crear arreglos de un tipo específico. Aquí tienes algunos ejemplos de cómo definir y manipular arreglos:
// Definición de un arreglo de números
let numbers: number[] = [1, 2, 3, 4, 5];

// Métodos comunes
numbers.push(6); // Agrega un elemento al final
numbers.pop();   // Elimina el último elemento

// Iteración
numbers.forEach((num) => console.log(num * 2)); // Multiplica cada elemento por 2 y lo imprime

// Función para modificar valores
let doubledNumbers = numbers.map((num) => num * 2); // [2, 4, 6, 8, 10]

// Además, puedes crear arreglos utilizando el tipo genérico Array<T>:
let fruits: Array<string> = ['apple', 'banana', 'cherry'];
fruits.push('date'); // Agrega 'date' al final

// 2. Manipulación de Tuplas
// Las tuplas son una estructura de datos que permite almacenar un número fijo de elementos de diferentes tipos. En TypeScript, puedes definir una tupla con tipos específicos para cada posición.

// Ejemplo de definición de una tupla:
let person: [string, number, boolean] = ['Alice', 30, true];

// Aquí:
// person[0] es una cadena (string)
// person[1] es un número (number)
// person[2] es un booleano (boolean)


// Puedes manipular la tupla de manera similar a los arreglos:
person[1] = 31; // Modificar el segundo elemento
person.push('extra'); // Esto es permitido, pero no es seguro en términos de tipo, ya que no sigue la definición original de la tupla.

// Si quieres mantener la estructura fija, puedes usar un tipo para evitar el cambio de longitud, aunque TypeScript no evita los .push() de forma estricta. Sin embargo, una mejor práctica es tratar de mantener los elementos en el orden y tipo original.


// 3. Métodos comunes para trabajar con Arreglos y Tuplas
// TypeScript ofrece los métodos de manipulación de arreglos que hereda de JavaScript, pero con la ventaja de la seguridad de tipos. Algunos métodos comunes son:

// map(): aplica una función a cada elemento y devuelve un nuevo arreglo.
// filter(): devuelve un nuevo arreglo con elementos que cumplen una condición.
// reduce(): reduce los elementos a un único valor.
// concat(): une dos o más arreglos.
// slice(): extrae una sección de un arreglo.
// Ejemplo utilizando map, filter y reduce:
let numbersArray: number[] = [1, 2, 3, 4, 5];

// map - duplicar cada número
let doubled = numbersArray.map((num) => num * 2); // [2, 4, 6, 8, 10]

// filter - obtener solo los números pares
let evenNumbers = numbersArray.filter((num) => num % 2 === 0); // [2, 4]

// reduce - sumar todos los números
let sum = numbersArray.reduce((acc, num) => acc + num, 0); // 15


// 4. Tuplas con Longitud Variable
// TypeScript permite crear tuplas con tipos específicos y luego extenderlas con longitudes variables usando el operador de descanso (...):
let mixedTuple: [string, number, ...boolean[]] = ['text', 10, true, false, true];
// Aquí, el primer elemento debe ser una cadena, el segundo un número, y luego puede haber varios valores booleanos.

// Ejemplo de Función que Acepta Tuplas
// Puedes crear funciones que esperen tuplas como parámetros para tener un control más estricto del tipo de datos que manejan.
function displayPersonInfo(person: [string, number]) {
    console.log(`Name: ${person[0]}, Age: ${person[1]}`);
  }
  
  displayPersonInfo(['Alice', 30]); // Correcto
  // displayPersonInfo(['Alice', '30']); // Error: '30' no es un número
  
//   Con esto, TypeScript te ayuda a evitar errores al asegurarse de que solo se pasen datos del tipo correcto en cada posición de la tupla o arreglo.  