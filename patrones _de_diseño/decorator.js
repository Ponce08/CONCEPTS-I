// El patrón de diseño Decorator (o Decorador) es un patrón estructural que permite agregar comportamientos o responsabilidades adicionales a un objeto de forma dinámica, sin modificar su estructura. Este patrón es útil cuando deseas extender la funcionalidad de una clase sin crear una nueva subclase para cada nueva funcionalidad.

// El patrón Decorator es especialmente útil en sistemas donde los objetos tienen diversas combinaciones de funcionalidades, ya que permite construir nuevas características en tiempo de ejecución.

// Ejemplo del patrón Decorator en JavaScript
// Imaginemos que estamos desarrollando una aplicación que maneja bebidas. Tenemos una clase base Bebida que representa una bebida simple, y queremos agregar diferentes decoradores para extender la funcionalidad de las bebidas, como añadir leche, azúcar, o saborizantes.

// Paso 1: La clase base
// Definimos la clase Bebida que tendrá un método para obtener el costo y la descripción de la bebida.
class Bebida {
    constructor() {
      this.descripcion = "Bebida desconocida"; // Descripción por defecto
    }
  
    costo() {
      return 0; // Costo por defecto
    }
  
    getDescripcion() {
      return this.descripcion;
    }
  }
//   Paso 2: Clases concretas de bebidas
//   Creamos algunas bebidas concretas que extenderán la clase base Bebida.  
class Cafe extends Bebida {
    constructor() {
      super();
      this.descripcion = "Café";
    }
  
    costo() {
      return 5; // Costo del café
    }
  }
  
  class Te extends Bebida {
    constructor() {
      super();
      this.descripcion = "Té";
    }
  
    costo() {
      return 3; // Costo del té
    }
  }
//   Paso 3: Crear el decorador base
//   El decorador también debe extender la clase Bebida. Este decorador base tendrá una referencia a un objeto Bebida que se va a decorar.  
class BebidaDecorator extends Bebida {
    constructor(bebida) {
      super();
      this.bebida = bebida; // Referencia a la bebida que se va a decorar
    }
  
    getDescripcion() {
      return this.bebida.getDescripcion(); // Delegar la descripción
    }
  
    costo() {
      return this.bebida.costo(); // Delegar el costo
    }
  }
//   Paso 4: Clases decoradoras concretas
//   Ahora, podemos crear decoradores concretos que añaden funcionalidades a la bebida.  
class Leche extends BebidaDecorator {
    constructor(bebida) {
      super(bebida);
    }
  
    getDescripcion() {
      return `${this.bebida.getDescripcion()}, con leche`; // Añadir leche a la descripción
    }
  
    costo() {
      return this.bebida.costo() + 1; // Añadir costo de la leche
    }
  }
  
  class Azucar extends BebidaDecorator {
    constructor(bebida) {
      super(bebida);
    }
  
    getDescripcion() {
      return `${this.bebida.getDescripcion()}, con azúcar`; // Añadir azúcar a la descripción
    }
  
    costo() {
      return this.bebida.costo() + 0.5; // Añadir costo del azúcar
    }
  }
//   Paso 5: Usar los decoradores
//   Ahora podemos crear bebidas y decorarlas con diferentes opciones.  
// Crear un café simple
let bebida = new Cafe();
console.log(`${bebida.getDescripcion()} cuesta $${bebida.costo()}`); // Café cuesta $5

// Decorar el café con leche
bebida = new Leche(bebida);
console.log(`${bebida.getDescripcion()} cuesta $${bebida.costo()}`); // Café, con leche cuesta $6

// Decorar el café con azúcar
bebida = new Azucar(bebida);
console.log(`${bebida.getDescripcion()} cuesta $${bebida.costo()}`); // Café, con leche, con azúcar cuesta $6.5

// Ejemplo 2

function Customer(name, age) {
    this.name = name
    this.age = age
 
    this.printInfo = function() {
        console.log("Customer:nName : " + this.name + " | Age: " + this.age)
    }
 }
 
 function DecoratedCustomer(customer, location) {
    this.customer = customer
    this.name = customer.name
    this.age = customer.age
    this.location = location
 
    this.printInfo = function() {
        console.log("Decorated Customer:nName: " + this.name + " | Age: " + this.age + " | Location: " + this.location)
    }
 }
 
 function run() {
    let customer = new Customer("John,", 25)
    customer.printInfo()
    // Output:
    // Customer:
    // Name : John | Age: 25
 
    let decoratedCustomer = new DecoratedCustomer(customer, "FL")
    decoratedCustomer.printInfo()
    // Output:
    // Customer:
    // Name : John | Age: 25 | Location: FL
 }
 
 run()

//  Ventajas del Patrón Decorator
//  Flexibilidad: Permite agregar y quitar comportamientos en tiempo de ejecución, sin modificar la clase original.
//  Composición: Las funcionalidades pueden combinarse de varias maneras, creando objetos altamente configurables.
//  No es necesario modificar las clases existentes: Facilita la extensión de la funcionalidad sin afectar la implementación original.