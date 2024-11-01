// Los tipos genéricos en TypeScript son una característica que permite crear componentes, funciones o clases que pueden trabajar con diferentes tipos de datos de manera flexible. Son similares a los tipos "placeholder" y permiten que se defina un tipo de dato en el momento de la ejecución en lugar de en el momento de la declaración. Esto es especialmente útil para crear código reutilizable y escalable.

// ¿Cómo funcionan los genéricos?
// Los genéricos funcionan mediante la definición de parámetros de tipo, que se representan con letras dentro de los corchetes angulares < > al declarar una función, clase, interfaz o tipo. Este parámetro actúa como un placeholder que luego se sustituye por un tipo específico en el momento en que el código se ejecuta.

// Ejemplo básico de una función genérica
// A continuación, un ejemplo de una función genérica en TypeScript que toma un tipo genérico T:
function identity<T>(value: T): T {
    return value;
}
// En esta función, T es un parámetro de tipo que representa cualquier tipo de dato. Cuando llamamos a identity, podemos especificar el tipo de T o dejar que TypeScript lo infiera:
let result1 = identity<number>(42);  // Especificamos el tipo
let result2 = identity("Hello");     // TypeScript infiere el tipo como string

/**Ventajas de usar genéricos
Flexibilidad: Permiten crear funciones y clases que pueden trabajar con cualquier tipo de dato.
Seguridad: Al usar genéricos, TypeScript puede verificar que los tipos sean correctos en el momento de compilación.
Reutilización de código: Los genéricos permiten definir funciones y clases que pueden ser reutilizadas con diferentes tipos. */

// Ejemplo en clases genéricas
// Las clases también pueden usar genéricos para manejar datos de manera más flexible:
class DataStorage<T> {
    private items: T[] = [];

    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    getItems(): T[] {
        return this.items;
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");
console.log(textStorage.getItems()); // ["Hello", "World"]
// En este ejemplo, DataStorage<T> puede almacenar elementos de cualquier tipo T, como string, number, o cualquier otro tipo específico que se defina al crear una instancia de la clase.

// Restricciones de los genéricos
// TypeScript permite añadir restricciones a los genéricos usando extends para limitar los tipos de datos que un genérico puede aceptar. Por ejemplo:
function printLength<T extends { length: number }>(item: T): void {
    console.log(item.length);
}

printLength("Hello");     // Funciona, ya que el string tiene una propiedad `length`
printLength([1, 2, 3]);   // Funciona, ya que el array tiene una propiedad `length`
// En este caso, T debe ser un tipo que tenga una propiedad length, lo que permite usar printLength con cualquier tipo que cumpla esta condición.

// Ejemplo: Combinación de dos objetos con genéricos
// Aquí definimos una función llamada merge que toma dos objetos de cualquier tipo (T y U) y los combina en un solo objeto. La función retorna el objeto combinado con todas las propiedades de ambos objetos, y gracias a los genéricos, TypeScript conoce el tipo resultante.
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

// Ahora podemos usar la función con diferentes tipos de objetos
const person = { name: "Alice" };
const details = { age: 25, job: "Engineer" };

const mergedObj = merge(person, details);
console.log(mergedObj);  // { name: "Alice", age: 25, job: "Engineer" }

// Podemos acceder a las propiedades con seguridad de tipos
console.log(mergedObj.name);  // Alice
console.log(mergedObj.age);   // 25
console.log(mergedObj.job);   // Engineer

// Ejemplo: Interfaz genérica de par clave-valor
// Supongamos que queremos una estructura para almacenar pares de clave-valor, donde tanto la clave como el valor pueden ser de cualquier tipo. Podemos lograr esto fácilmente con genéricos:
// Interfaz genérica para un par clave-valor
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

// Función para imprimir el par clave-valor
function printKeyValuePair<K, V>(pair: KeyValuePair<K, V>): void {
    console.log(`Key: ${pair.key}, Value: ${pair.value}`);
}

// Usamos la interfaz genérica con diferentes tipos
const numberPair: KeyValuePair<string, number> = { key: "Age", value: 30 };
const stringPair: KeyValuePair<string, string> = { key: "Name", value: "Alice" };

printKeyValuePair(numberPair);  // Output: Key: Age, Value: 30
printKeyValuePair(stringPair);  // Output: Key: Name, Value: Alice


