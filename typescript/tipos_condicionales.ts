// Los Tipos Condicionales en TypeScript permiten crear tipos basados en condiciones, lo que aporta una gran flexibilidad al sistema de tipos. Son útiles para construir tipos dinámicos que dependen de otros tipos, lo que permite realizar lógica condicional directamente en el nivel de tipos.

// La sintaxis de los tipos condicionales se basa en la estructura:
// T extends U ? X : Y

/**Aquí:

T es el tipo que se evalúa.
U es el tipo con el que T se compara.
Si T es un subtipo de U (es decir, T "extends" U), entonces el tipo resultante será X.
De lo contrario, el tipo resultante será Y. */

// Ejemplo básico de Tipo Condicional
// Supongamos que queremos definir un tipo que, dependiendo de si un tipo de entrada es string o no, devuelva un tipo específico:
type IsString<T> = T extends string ? "Yes, it's a string" : "No, it's not a string";

type Test1 = IsString<string>;  // "Yes, it's a string"
type Test2 = IsString<number>;  // "No, it's not a string"

// Ejemplo con Tipos Condicionales en Funciones
// Imaginemos que queremos crear una función que solo permita recibir strings o arrays y que retorne el tipo de elemento adecuado. Si el argumento es un string, el tipo de retorno debe ser string, y si es un array, debe ser el tipo de los elementos en el array.

// Podemos definirlo con un tipo condicional así:
type ElementType<T> = T extends (infer U)[] ? U : T;

function getFirstElement<T>(arr: T): ElementType<T> {
    return Array.isArray(arr) ? arr[0] : arr;
}

const firstString = getFirstElement("hello");        // string
const firstNumber = getFirstElement([1, 2, 3]);      // number
const firstBoolean = getFirstElement([true, false]); // boolean
/**Aquí:

ElementType<T> es un tipo condicional que verifica si T es un array (T extends (infer U)[]). Si es un array, U se infiere como el tipo de los elementos del array.
La función getFirstElement usa ElementType<T> para devolver el primer elemento si arr es un array; si no es un array, simplemente devuelve arr sin cambios. */



// Tipos Condicionales con Mapeos y Utilidades
// TypeScript ofrece una serie de utilidades predefinidas que aprovechan los tipos condicionales para manipular tipos complejos. Algunos ejemplos comunes incluyen Exclude, Extract, NonNullable, entre otros.

// Ejemplo: Exclude
// El tipo condicional Exclude es útil para eliminar un tipo de una unión:
type ExcludeString = Exclude<string | number | boolean, string>;
// Resultado: number | boolean
/**Aquí, Exclude<string | number | boolean, string> produce un tipo que excluye string de la unión, dejando solo number | boolean. */

// Ejemplo: Extract
// El tipo condicional Extract permite extraer un tipo específico de una unión:
type ExtractNumber = Extract<string | number | boolean, number>;
// Resultado: number
/**En este caso, Extract<string | number | boolean, number> devuelve solo el tipo number de la unión. */


// Ejemplo: Hacer que las propiedades opcionales de un tipo sean requeridas
// Supongamos que queremos crear un tipo llamado RequiredFields<T> que, a partir de un tipo dado, convierta todas sus propiedades opcionales en requeridas.

// Para lograr esto, podemos combinar tipos condicionales con operadores de mapeo:
type RequiredFields<T> = {
    [K in keyof T]-?: T[K];
};

interface Person {
    name?: string; 
    age?: number;
    country?: string;
}

// Aplicamos RequiredFields a Person
type RequiredPerson = RequiredFields<Person>;

// Ahora RequiredPerson es equivalente a:
// interface RequiredPerson {
//     name: string;
//     age: number;
//     country: string;
// }

/**Explicación
keyof T: Obtiene todas las claves del tipo T.
[K in keyof T]: Recorre todas las claves del tipo T para construir un nuevo tipo.
-?: El operador -? se usa para quitar el modificador opcional ? de cada propiedad, haciendo que todas las propiedades sean requeridas.En el ejemplo, la interfaz Person tiene propiedades opcionales (name, age, country). Al aplicar RequiredFields<Person>, todas esas propiedades opcionales se convierten en requeridas. */

// Ejemplo de tipo condicional para detectar propiedades opcionales
// Imaginemos ahora que queremos un tipo que identifique si una propiedad en un objeto es opcional. Podemos crear un tipo condicional IsOptional para este propósito:
type IsOptional<T, K extends keyof T> = {} extends Pick<T, K> ? true : false;

interface Person {
    name?: string;
    // age: number;
}

type NameIsOptional = IsOptional<Person, "name">;  // true
type AgeIsOptional = IsOptional<Person, "age">;    // false
/**Explicación
Pick<T, K>: Selecciona solo la propiedad K del tipo T.
{} extends Pick<T, K>: Verifica si un objeto vacío {} puede extenderse a Pick<T, K>. Esto es cierto si K es opcional (es decir, no se requiere para que el tipo sea válido).
Si K es opcional, el resultado es true; de lo contrario, es false.
En este caso:

NameIsOptional será true porque name es opcional en Person.
AgeIsOptional será false porque age es obligatorio en Person. */
