// El patrón de diseño Factory es un patrón creacional que permite crear objetos sin especificar la clase exacta de objeto que se creará. En lugar de crear instancias directamente con el operador new, se utiliza una función o clase "fábrica" que decide cuál clase o tipo de objeto crear, permitiendo centralizar y simplificar la lógica de creación. Este patrón es útil cuando tenemos objetos similares que comparten una interfaz o clase base, pero tienen variaciones específicas.

// Ejemplo del patrón Factory en JavaScript
// Imaginemos que estamos creando una aplicación para manejar envíos de paquetes. Los paquetes pueden enviarse por distintos métodos: Aéreo, Marítimo y Terrestre. Cada método tiene diferentes costos y tiempos de entrega.

// Paso 1: Crear una clase base
// Definimos una clase base Envio, que será la interfaz común para los diferentes tipos de envíos.

class Envio {
    constructor() {
      if (this.constructor === Envio) {
        throw new Error("No se puede instanciar la clase abstracta Envio");
      }
    }
  
    calcularCosto() {
      throw new Error("Método 'calcularCosto()' debe ser implementado.");
    }
  
    calcularTiempoEntrega() {
      throw new Error("Método 'calcularTiempoEntrega()' debe ser implementado.");
    }
  }

//   Paso 2: Crear las clases concretas de envío
//   Creamos las clases EnvioAereo, EnvioMaritimo y EnvioTerrestre, que extienden de Envio y cada una implementa su lógica específica.

class EnvioAereo extends Envio {
    calcularCosto() {
      return 100; // Costo específico para envío aéreo
    }
  
    calcularTiempoEntrega() {
      return 1; // Tiempo en días para envío aéreo
    }
  }
  
  class EnvioMaritimo extends Envio {
    calcularCosto() {
      return 50; // Costo específico para envío marítimo
    }
  
    calcularTiempoEntrega() {
      return 10; // Tiempo en días para envío marítimo
    }
  }
  
  class EnvioTerrestre extends Envio {
    calcularCosto() {
      return 20; // Costo específico para envío terrestre
    }
  
    calcularTiempoEntrega() {
      return 5; // Tiempo en días para envío terrestre
    }
  }

// Paso 3: Crear la fábrica
// La clase EnvioFactory será la "fábrica" que decide qué tipo de envío crear, basándose en el tipo que se le pase como parámetro.

class EnvioFactory {
    static crearEnvio(tipo) {
      switch (tipo) {
        case "aereo":
          return new EnvioAereo();
        case "maritimo":
          return new EnvioMaritimo();
        case "terrestre":
          return new EnvioTerrestre();
        default:
          throw new Error("Tipo de envío no soportado");
      }
    }
  }

// Paso 4: Usar la fábrica para crear objetos
// La fábrica simplifica el proceso de creación y garantiza que el código cliente no necesite conocer las clases concretas de los envíos. El cliente simplemente llama a la fábrica y utiliza la interfaz común Envio.

const tipoEnvio = "aereo"; // Esto puede cambiar dinámicamente
const envio = EnvioFactory.crearEnvio(tipoEnvio);

console.log(`Costo de envío: $${envio.calcularCosto()}`); // Costo de envío: $100
console.log(`Tiempo de entrega: ${envio.calcularTiempoEntrega()} día(s)`); // Tiempo de entrega: 1 día(s)

// Ventajas del Patrón Factory
// Centraliza la lógica de creación: Elimina la necesidad de usar el operador new repetidamente en el código cliente.
// Flexibilidad y extensibilidad: Si necesitas agregar un nuevo tipo de envío, simplemente puedes agregar otra clase y ajustar la fábrica, sin cambiar el código cliente.
// Reducción de dependencias: El cliente solo necesita interactuar con la fábrica, sin importar los detalles internos de cada clase concreta.

// Ejemplo 2
function Factory() {
    this.createDog = function (breed) {
        let dog;
 
        if (breed === "labrador") {
            dog = new Labrador();
        } else if (breed === "bulldog") {
            dog = new Bulldog();
        } else if (breed === "golden retriever") {
            dog = new GoldenRetriever();
        } else if (breed === "german shepherd") {
            dog = new GermanShepherd();
        }
 
        dog.breed = breed;
        dog.printInfo = function () {
            console.log("nnBreed: " + dog.breed + "nShedding Level (out of 5): " + dog.sheddingLevel + "nCoat Length: " + dog.coatLength + "nCoat Type: " + dog.coatType)
        }
 
        return dog;
    }
 }
 
 function Labrador() {
    this.sheddingLevel = 4
    this.coatLength = "short"
    this.coatType = "double"
 }
 
 function Bulldog() {
    this.sheddingLevel = 3
    this.coatLength = "short"
    this.coatType = "smooth"
 }
 
 function GoldenRetriever() {
    this.sheddingLevel = 4
    this.coatLength = "medium"
    this.coatType = "double"
 }
 
 function GermanShepherd() {
    this.sheddingLevel = 4
    this.coatLength = "medium"
    this.coatType = "double"
 }
 
 function run() {
 
    let dogs = [];
    let factory = new Factory();
 
    dogs.push(factory.createDog("labrador"));
    dogs.push(factory.createDog("bulldog"));
    dogs.push(factory.createDog("golden retriever"));
    dogs.push(factory.createDog("german shepherd"));
 
    for (var i = 0, len = dogs.length; i < len; i++) {
        dogs[i].printInfo();
    }
 }
 
 run()
 
 /**
 Output:
 
 Breed: labrador
 Shedding Level (out of 5): 4
 Coat Length: short
 Coat Type: double
 
 
 Breed: bulldog
 Shedding Level (out of 5): 3
 Coat Length: short
 Coat Type: smooth
 
 
 Breed: golden retriever
 Shedding Level (out of 5): 4
 Coat Length: medium
 Coat Type: double
 
 
 Breed: german shepherd
 Shedding Level (out of 5): 4
 Coat Length: medium
 Coat Type: double
 */