// El patrón de diseño Iterator (o Iterador) es un patrón de comportamiento que permite recorrer los elementos de una colección de forma secuencial sin exponer su estructura interna. El patrón proporciona una interfaz para acceder a los elementos de una colección uno a uno, manteniendo el cliente desacoplado de la implementación interna de la colección.

// Ejemplo del patrón Iterator en JavaScript
// Supongamos que estamos trabajando con una colección de libros y queremos poder recorrer esta colección, libro por libro, sin exponer cómo están almacenados internamente.

// Paso 1: Crear la colección
// Creamos una clase Libreria que actuará como nuestra colección de libros. Esta clase tendrá métodos para agregar libros y para crear un iterador.

class Libreria {
    constructor() {
      this.libros = []; // Array donde almacenamos los libros
    }
  
    agregarLibro(libro) {
      this.libros.push(libro); // Agrega un libro a la colección
    }
  
    crearIterador() {
      return new LibreriaIterador(this.libros); // Retorna un iterador para esta colección
    }
  }
//   Paso 2: Crear el iterador
//   Creamos una clase LibreriaIterador que implementará el patrón Iterator. Esta clase tendrá métodos para acceder a los elementos de la colección uno a uno.  
class LibreriaIterador {
    constructor(libros) {
      this.libros = libros;
      this.indiceActual = 0; // Índice para controlar la posición del iterador
    }
  
    // Método para verificar si hay más elementos en la colección
    hayMas() {
      return this.indiceActual < this.libros.length;
    }
  
    // Método para obtener el siguiente elemento en la colección
    siguiente() {
      if (this.hayMas()) {
        return this.libros[this.indiceActual++]; // Retorna el libro actual y luego incrementa el índice
      }
      return null; // Si no hay más elementos, retorna null
    }
  }
//   Paso 3: Usar el iterador
//   Ahora que tenemos la clase Libreria y el LibreriaIterador, podemos agregar libros a la colección y recorrerlos usando el iterador.  
// Creamos una instancia de la librería y añadimos algunos libros
const libreria = new Libreria();
libreria.agregarLibro("El Principito");
libreria.agregarLibro("1984");
libreria.agregarLibro("Don Quijote");

// Obtenemos el iterador de la librería
const iterador = libreria.crearIterador();

// Usamos el iterador para recorrer la colección
while (iterador.hayMas()) {
  console.log(iterador.siguiente());
}

// Salida esperada:

/**
El Principito
1984
Don Quijote
 */

// Ejemplo 2

// Iterator for a complex list with custom methods
function Iterator(list) {
    this.list = list
    this.index = 0
 
    // Fetch the current element
    this.current = function() {
        return this.list[this.index]
    }
 
    // Fetch the next element in the list
    this.next = function() {
        return this.list[this.index++]
    }
 
    // Check if there is another element in the list
    this.hasNext = function() {
        return this.index < this.list.length
    }
 
    // Reset the index to point to the initial element
    this.resetIndex = function() {
        this.index = 0
    }
 
    // Run a forEach loop over the list
    this.forEach = function(callback) {
        for (let element = this.next(); this.index <= this.list.length; element = this.next()) {
            callback(element)
        }
    }
 }
 
 function run() {
    // A complex list with elements of multiple data types
    let list = ["Lorem ipsum,", 9, ["lorem ipsum dolor,", true], false]
 
    // Create an instance of the iterator and pass it the list
    let iterator = new Iterator(list)
 
    // Log the first element
    console.log(iterator.current())
    // Output: Lorem ipsum
 
    // Print all elements of the list using the iterator's methods
    while (iterator.hasNext()) {
        console.log(iterator.next())
        /**
         * Output:
         * Lorem ipsum
         * 9
         * [ 'lorem ipsum dolor', true ]
         * false
         */
    }
 
    // Reset the iterator's index to the first element
    iterator.resetIndex()
 
    // Use the custom iterator to pass an effect that will run for each element of the list
    iterator.forEach(function (element) {
        console.log(element)
    })
    /**
     * Output:
     * Lorem ipsum
     * 9
     * [ 'lorem ipsum dolor', true ]
     * false
     */
 }
 
 run()

//  Ventajas del Patrón Iterator
//  Simplicidad: Facilita el recorrido de una colección sin necesidad de conocer su estructura interna.
//  Flexibilidad: Permite múltiples formas de recorrido sin modificar la colección, solo creando iteradores distintos.
//  Desacoplamiento: El cliente permanece independiente de la implementación interna de la colección.