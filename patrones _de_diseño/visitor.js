// El patrón de diseño Visitor permite añadir nuevas operaciones a una jerarquía de clases sin modificar las clases existentes. En lugar de implementar cada operación dentro de las clases de la jerarquía, se crea un "visitante" externo que realiza estas operaciones. Esto es útil en situaciones donde se desea realizar múltiples operaciones sobre una estructura de objetos compleja y se quiere evitar contaminar las clases con muchos métodos adicionales.

// En JavaScript, el patrón Visitor se puede implementar creando dos componentes principales:

// Visitor: Define las operaciones que se pueden realizar en los elementos de una estructura de objetos.
// Elementos: Las clases en las que se realizarán las operaciones, cada una acepta un visitante que ejecuta una acción específica en el elemento.
// Ejemplo: Sistema de Visitas en Formas Geométricas
// Supongamos que tenemos un sistema que maneja formas geométricas, como círculos y rectángulos. Queremos aplicar operaciones como calcular el área o el perímetro de estas formas sin modificar las clases originales.

// Paso 1: Crear las Clases de Elemento
// Definimos las clases de forma (Circle y Rectangle) que representan los elementos sobre los que se aplicarán las operaciones. Cada clase tiene un método accept que acepta un visitante.

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    accept(visitor) {
        visitor.visitCircle(this);
    }
}

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    accept(visitor) {
        visitor.visitRectangle(this);
    }
}
// Método accept: Este método acepta un objeto visitor y llama a su método correspondiente para ejecutar la operación adecuada en cada elemento.

// Paso 2: Crear la Clase Visitor
// Creamos la clase Visitor, que define las operaciones que se pueden realizar en cada tipo de forma. En este caso, crearemos visitantes para calcular el área y el perímetro.
class AreaCalculator {
    visitCircle(circle) {
        const area = Math.PI * Math.pow(circle.radius, 2);
        console.log(`Área del Círculo: ${area}`);
    }

    visitRectangle(rectangle) {
        const area = rectangle.width * rectangle.height;
        console.log(`Área del Rectángulo: ${area}`);
    }
}

class PerimeterCalculator {
    visitCircle(circle) {
        const perimeter = 2 * Math.PI * circle.radius;
        console.log(`Perímetro del Círculo: ${perimeter}`);
    }

    visitRectangle(rectangle) {
        const perimeter = 2 * (rectangle.width + rectangle.height);
        console.log(`Perímetro del Rectángulo: ${perimeter}`);
    }
}
// AreaCalculator: Calcula el área de un Circle o un Rectangle dependiendo del tipo de objeto que reciba.
// PerimeterCalculator: Calcula el perímetro de un Circle o un Rectangle.
// Cada clase Visitor tiene un método visitCircle y visitRectangle, lo que le permite realizar la operación adecuada en cada tipo de forma.

// Paso 3: Usar los Visitantes con las Formas
// Finalmente, creamos instancias de Circle y Rectangle, y las pasamos a los visitantes AreaCalculator y PerimeterCalculator para aplicar las operaciones.
// Crear elementos
const circle = new Circle(5);
const rectangle = new Rectangle(10, 20);

// Crear visitantes
const areaCalculator = new AreaCalculator();
const perimeterCalculator = new PerimeterCalculator();

// Calcular áreas
console.log("Cálculo de Áreas:");
circle.accept(areaCalculator);       // Área del Círculo
rectangle.accept(areaCalculator);    // Área del Rectángulo

// Calcular perímetros
console.log("\nCálculo de Perímetros:");
circle.accept(perimeterCalculator);  // Perímetro del Círculo
rectangle.accept(perimeterCalculator); // Perímetro del Rectángulo

// Salida Esperada:

/**
Cálculo de Áreas:
Área del Círculo: 78.53981633974483
Área del Rectángulo: 200

Cálculo de Perímetros:
Perímetro del Círculo: 31.41592653589793
Perímetro del Rectángulo: 60
 */

// Ejemplo 2

// Visitor class that defines the methods to be called when visiting each place
function Reader(name, cash) {
    this.name = name
    this.cash = cash

    // The visit methods can access the place object and invoke available functions
    this.visitBookstore = function(bookstore) {
        console.log(this.name + " visited the bookstore and bought a book")
        bookstore.purchaseBook(this)
    }

    this.visitLibrary = function() {
        console.log(this.name + " visited the library and read a book")
    }

    // Helper function to demonstrate a transaction
    this.pay = function(amount) {
        this.cash -= amount
    }
}

// Place class for a library
function Library () {
    this.accept = function(reader) {
        reader.visitLibrary()
    }
}

// Place class for a bookstore that allows purchasing book
function Bookstore () {
    this.accept = function(reader) {
        reader.visitBookstore(this)
    }

    this.purchaseBook = function (visitor) {
        console.log(visitor.name + " bought a book")
        visitor.pay(8)
    }
}


function run() {
    // Create a reader (the visitor)
    let reader = new Reader("Rick,", 30)

    // Create the places
    let booksInc = new Bookstore()
    let publicLibrary = new Library()

    // The reader visits the library
    publicLibrary.accept(reader)
    // Output: Rick visited the library and read a book
    console.log(reader.name + " has $" + reader.cash)
    // Output: Rick has $30

    // The reader visits the bookstore
    booksInc.accept(reader)
    // Output: Rick visited the bookstore and bought a book
    console.log(reader.name + " has $" + reader.cash)
    // Output: Rick has $22
}

run()

/**Ventajas del Patrón Visitor
Añadir Nuevas Operaciones Sin Modificar las Clases Existentes: Es posible añadir nuevas operaciones a los elementos sin modificar las clases de los elementos.
Principio de Responsabilidad Única: El patrón separa las operaciones del resto de la clase, reduciendo la cantidad de código y manteniendo cada clase enfocada en su propósito principal.
Fácil de Ampliar: Si se necesitan nuevas operaciones en el futuro, solo se añade un nuevo visitante sin afectar el código existente.

Consideraciones
Complejidad Incrementada: Este patrón puede hacer que el diseño del sistema sea más complejo, ya que introduce nuevas clases (visitantes) y requiere que los elementos llamen a los visitantes.
Acceso a Detalles Internos: Para ejecutar las operaciones, los visitantes a veces necesitan acceder a los detalles internos de los elementos, lo cual puede romper el encapsulamiento. */