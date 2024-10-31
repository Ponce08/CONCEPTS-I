// El patrón de diseño Composite permite organizar objetos en una estructura jerárquica de árbol para representar relaciones de parte-todo. Este patrón permite a los clientes tratar de forma uniforme tanto a los objetos individuales como a las colecciones de objetos.

// En JavaScript, es útil para construir estructuras jerárquicas como menús, carpetas de archivos, o cualquier estructura que tenga componentes que puedan contener otros componentes.

// Aquí tienes un ejemplo sencillo para entender la implementación del patrón Composite en JavaScript:

// Ejemplo: Estructura de Archivos y Carpetas
// Imaginemos que queremos modelar un sistema de archivos, donde tenemos carpetas que pueden contener archivos o incluso otras carpetas. Usaremos el patrón Composite para organizar esta estructura de tal forma que se puedan tratar archivos y carpetas de la misma manera.

// Paso 1: Definir la Interfaz Común
// Primero, creamos una clase base FileSystemComponent que representa el contrato común para archivos y carpetas. Cada componente en la estructura de árbol (ya sea archivo o carpeta) debe tener un método para mostrar información.

class FileSystemComponent {
    constructor(name) {
        this.name = name;
    }

    show() {
        throw new Error("Método 'show()' debe ser implementado");
    }
}
// Paso 2: Crear la Clase File (Hoja)
// La clase File representa un archivo individual. Este es un "hoja" en el árbol, ya que no contiene otros elementos.
class File extends FileSystemComponent {
    show() {
        console.log(this.name);
    }
}
// Paso 3: Crear la Clase Folder (Compuesto)
// La clase Folder representa una carpeta, que puede contener tanto archivos como otras carpetas. Esta es la clase compuesta, ya que puede tener varios componentes dentro de ella.
class Folder extends FileSystemComponent {
    constructor(name) {
        super(name);
        this.children = [];
    }

    add(component) {
        this.children.push(component);
    }

    show() {
        console.log("📁 " + this.name);
        this.children.forEach(child => child.show());
    }
}
// Paso 4: Usar la Estructura Composite
// Ahora podemos construir una estructura de carpetas y archivos. Las carpetas pueden contener archivos individuales o incluso otras carpetas, y todos los componentes pueden ser tratados de la misma manera.
// Crear archivos
const file1 = new File("Archivo1.txt");
const file2 = new File("Archivo2.txt");
const file3 = new File("Archivo3.txt");

// Crear carpetas
const folder1 = new Folder("Carpeta1");
const folder2 = new Folder("Carpeta2");
const rootFolder = new Folder("Raíz");

// Construir la jerarquía
folder1.add(file1);
folder1.add(file2);
folder2.add(file3);

rootFolder.add(folder1);
rootFolder.add(folder2);

// Mostrar la estructura completa
rootFolder.show();

// Salida:
// 📁 Raíz
// 📁 Carpeta1
// Archivo1.txt
// Archivo2.txt
// 📁 Carpeta2
// Archivo3.txt

// Ejemplo 2

// A product class, that acts as a Leaf node
function Product(name, price) {
    this.name = name
    this.price = price
 
    this.getTotalPrice = function() {
        return this.price
    }
 }
 
 // A box class, that acts as a parent/child node
 function Box(name) {
    this.contents = []
    this.name = name
 
    // Helper function to add an item to the box
    this.add = function(content){
        this.contents.push(content)
    }
 
    // Helper function to remove an item from the box
    this.remove = function() {
        var length = this.contents.length;
        for (var i = 0; i < length; i++) {
            if (this.contents[i] === child) {
                this.contents.splice(i, 1);
                return;
            }
        }
    }
 
    // Helper function to get one item from the box
    this.getContent = function(position) {
        return this.contents[position]
    }
 
    // Helper function to get the total count of the items in the box
    this.getTotalCount = function() {
        return this.contents.length
    }
 
    // Helper function to calculate the total price of all items in the box
    this.getTotalPrice = function() {
        let totalPrice = 0;
 
        for (let i=0; i < this.getTotalCount(); i++){
            totalPrice += this.getContent(i).getTotalPrice()
        }
 
        return totalPrice
    }
 }
 
 function run() {
 
    // Let's create some electronics
    const mobilePhone = new Product("mobile phone,", 1000)
    const phoneCase = new Product("phone case,", 30)
    const screenProtector = new Product("screen protector,", 20)
 
    // and some stationery products
    const pen = new Product("pen,", 2)
    const pencil = new Product("pencil,", 0.5)
    const eraser = new Product("eraser,", 0.5)
    const stickyNotes = new Product("sticky notes,", 10)
 
    // and put them in separate boxes
    const electronicsBox = new Box("electronics")
    electronicsBox.add(mobilePhone)
    electronicsBox.add(phoneCase)
    electronicsBox.add(screenProtector)
   
    const stationeryBox = new Box("stationery")
    stationeryBox.add(pen)
    stationeryBox.add(pencil)
    stationeryBox.add(eraser)
    stationeryBox.add(stickyNotes)
 
    // and finally, put them into one big box for convenient shipping
    const package = new Box('package')
    package.add(electronicsBox)
    package.add(stationeryBox)
 
    // Here's an easy way to calculate the total order value
    console.log("Total order price: USD " + package.getTotalPrice())
    // Output: USD 1063
 }
 
 run()

//  Ventajas del Patrón Composite
//  Simplifica el Código del Cliente: Los clientes pueden tratar componentes y compuestos de manera uniforme, ya que ambos implementan la misma interfaz.
//  Facilita la Extensibilidad: Se pueden añadir más tipos de componentes (por ejemplo, enlaces simbólicos en un sistema de archivos) sin cambiar el código del cliente.
//  Estructuras Jerárquicas: Es ideal para estructuras jerárquicas como menús, árboles de archivos o gráficos de dependencias.
