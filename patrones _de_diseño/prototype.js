// Prototype:
// El patrón de diseño Prototype es un patrón creacional que se utiliza para crear nuevos objetos clonando o copiando una instancia existente en lugar de crear una desde cero. Es útil cuando la creación de un objeto es costosa o compleja y se quiere duplicar la estructura y estado de un objeto existente. En JavaScript, esto se implementa fácilmente con el método Object.create() o con el uso de métodos de clonación personalizados.
// Ejemplo del patrón Prototype en JavaScript:
// Supongamos que tenemos una aplicación de dibujo y queremos clonar figuras (como círculos y cuadrados) que tienen diferentes propiedades (como color, tamaño y posición). En lugar de crear una nueva figura cada vez, clonaremos una figura base y modificaremos sus propiedades cuando sea necesario.

// Paso 1: Crear una clase base con el método de clonación
// Creamos una clase Figura con un método clone que devolverá una copia del objeto.
class Figura {
  constructor(color, posicionX, posicionY) {
    this.color = color;
    this.posicionX = posicionX;
    this.posicionY = posicionY;
  }

  clone() {
    // Clona el objeto usando Object.create
    const clon = Object.create(this);
    clon.posicionX = this.posicionX;
    clon.posicionY = this.posicionY;
    clon.color = this.color;
    return clon;
  }

  info() {
    console.log(`Figura de color ${this.color} en posición (${this.posicionX}, ${this.posicionY})`);
  }
}

// Paso 2: Crear clases específicas que heredan de Figura
// Creamos clases específicas como Círculo y Cuadrado que extienden de Figura.
class Circulo extends Figura {
  constructor(color, posicionX, posicionY, radio) {
    super(color, posicionX, posicionY);
    this.radio = radio;
  }

  // Método de clonación específico que incluye el radio
  clone() {
    const clon = super.clone();
    clon.radio = this.radio;
    return clon;
  }

  info() {
    console.log(`Círculo de color ${this.color} en posición (${this.posicionX}, ${this.posicionY}) con radio ${this.radio}`);
  }
}

class Cuadrado extends Figura {
  constructor(color, posicionX, posicionY, tamaño) {
    super(color, posicionX, posicionY);
    this.tamaño = tamaño;
  }

  // Método de clonación específico que incluye el tamaño
  clone() {
    const clon = super.clone();
    clon.tamaño = this.tamaño;
    return clon;
  }

  info() {
    console.log(`Cuadrado de color ${this.color} en posición (${this.posicionX}, ${this.posicionY}) con tamaño ${this.tamaño}`);
  }
}

// Paso 3: Crear instancias y clonarlas
// Ahora creamos una instancia de cada figura y la clonamos, cambiando algunas propiedades.
// Crear instancias de las figuras originales
const circuloOriginal = new Circulo('rojo', 10, 20, 15);
const cuadradoOriginal = new Cuadrado('azul', 30, 40, 25);

// Clonar las figuras
const circuloClon = circuloOriginal.clone();
circuloClon.color = 'verde'; // Cambiamos el color del clon
circuloClon.posicionX = 50;

const cuadradoClon = cuadradoOriginal.clone();
cuadradoClon.color = 'amarillo'; // Cambiamos el color del clon
cuadradoClon.posicionY = 60;

// Mostrar información de los objetos originales y sus clones
circuloOriginal.info(); // Círculo de color rojo en posición (10, 20) con radio 15
circuloClon.info(); // Círculo de color verde en posición (50, 20) con radio 15

cuadradoOriginal.info(); // Cuadrado de color azul en posición (30, 40) con tamaño 25
cuadradoClon.info(); // Cuadrado de color amarillo en posición (30, 60) con tamaño 25

// Ejemplo 2
// Defining how a document would look like
function Document() {
  this.header = "Acme Co"
  this.footer = "For internal use only"
  this.pages = 2
  this.text = ""
 
  this.addText = function(text) {
      this.text += text
  }

  // Method to help you see the contents of the object
  this.printInfo = function() {
      console.log("nnHeader: " + this.header + "nFooter: " + this.footer + "nPages: " + this.pages + "nText: " + this.text)
  }

 
}

// A protype (or template) for creating new blank documents with boilerplate information
function DocumentPrototype(baseDocument) {
  this.baseDocument = baseDocument
 
  // This is where the magic happens. A new document object is created and is assigned the values of the current object
  this.clone = function() {
      let document = new Document();

      document.header = this.baseDocument.header
      document.footer = this.baseDocument.footer
      document.pages = this.baseDocument.pages
      document.text = this.baseDocument.text

      return document
  }
}

function run() {
  // Create a document to use as the base for the prototype
  let baseDocument = new Document()

  // Make some changes to the prototype
  baseDocument.addText("This text was added before cloning and will be common in both documents. ")

  let prototype = new DocumentPrototype(baseDocument)

  // Create two documents from the prototype
  let doc1 = prototype.clone()
  let doc2 = prototype.clone()

  // Make some changes to both objects
  doc1.pages = 3

  doc1.addText("This is document 1")
  doc2.addText("This is document 2")

  // Print their values
  doc1.printInfo()
  /* Output:
      Header: Acme Co
      Footer: For internal use only
      Pages: 3
      Text: This text was added before cloning and will be common in both documents. This is document 1
   */

  doc2.printInfo()
  /** Output:
      Header: Acme Co
      Footer: For internal use only
      Pages: 2
      Text: This text was added before cloning and will be common in both documents. This is document 2
   */
}

run()