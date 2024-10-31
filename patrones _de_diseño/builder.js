// El patrón de diseño Builder es un patrón creacional que se utiliza para construir objetos complejos paso a paso. Es útil cuando un objeto tiene muchas propiedades opcionales o cuando la creación del objeto requiere varios pasos. En lugar de tener un constructor con muchos parámetros o múltiples constructores, se usa una clase Builder que permite establecer las propiedades del objeto de manera fluida y controlada.

// Este patrón se usa comúnmente para objetos que necesitan configuraciones detalladas y personalización, como en la creación de un perfil de usuario, la configuración de una conexión, o un sistema de construcción de vehículos o casas.

// Ejemplo del patrón Builder en JavaScript
// Supongamos que estamos construyendo un objeto Casa que tiene varias propiedades opcionales: número de habitaciones, número de baños, una piscina, un jardín, y un garaje. Cada propiedad es opcional, y queremos un método controlado y claro para construir una casa con diferentes configuraciones.

// Paso 1: Definir la clase Casa
// La clase Casa tendrá solo propiedades y un constructor privado, ya que la instancia de Casa solo debe poder construirse a través de la clase CasaBuilder.

class Casa {
    constructor(builder) {
      this.habitaciones = builder.habitaciones;
      this.baños = builder.baños;
      this.piscina = builder.piscina;
      this.jardin = builder.jardin;
      this.garaje = builder.garaje;
    }
  
    descripcion() {
      console.log(`Casa con ${this.habitaciones} habitaciones, ${this.baños} baños, ` +
        `${this.piscina ? 'con' : 'sin'} piscina, ` +
        `${this.jardin ? 'con' : 'sin'} jardín, ` +
        `${this.garaje ? 'con' : 'sin'} garaje.`);
    }
  }

//   Paso 2: Crear la clase CasaBuilder
//   La clase CasaBuilder permite configurar las propiedades de Casa de forma fluida y luego construir el objeto final llamando al método build.

class CasaBuilder {
    constructor() {
      // Valores predeterminados
      this.habitaciones = 0;
      this.baños = 0;
      this.piscina = false;
      this.jardin = false;
      this.garaje = false;
    }
  
    setHabitaciones(cantidad) {
      this.habitaciones = cantidad;
      return this; // Devuelve el builder para permitir el encadenamiento
    }
  
    setBaños(cantidad) {
      this.baños = cantidad;
      return this;
    }
  
    setPiscina(piscina) {
      this.piscina = piscina;
      return this;
    }
  
    setJardin(jardin) {
      this.jardin = jardin;
      return this;
    }
  
    setGaraje(garaje) {
      this.garaje = garaje;
      return this;
    }
  
    build() {
      // Devuelve una nueva instancia de Casa con las configuraciones establecidas
      return new Casa(this);
    }
  }

// Paso 3: Construir objetos usando el Builder
// Ahora usamos CasaBuilder para construir una Casa con las configuraciones deseadas. Gracias al encadenamiento de métodos, es fácil ver y ajustar cada paso de la configuración.

// Crear una casa con 3 habitaciones, 2 baños, con piscina y jardín, sin garaje
const casa1 = new CasaBuilder()
  .setHabitaciones(3)
  .setBaños(2)
  .setPiscina(true)
  .setJardin(true)
  .build();

casa1.descripcion(); // Casa con 3 habitaciones, 2 baños, con piscina, con jardín, sin garaje.

// Crear otra casa con 5 habitaciones, 4 baños, sin piscina, con jardín y garaje
const casa2 = new CasaBuilder()
  .setHabitaciones(5)
  .setBaños(4)
  .setJardin(true)
  .setGaraje(true)
  .build();

casa2.descripcion(); // Casa con 5 habitaciones, 4 baños, sin piscina, con jardín, con garaje.

// Ventajas del Patrón Builder
// Control: Permite construir objetos de forma controlada, asegurando que todas las propiedades necesarias se configuren correctamente.
// Fluidez: Los métodos encadenados facilitan la lectura y personalización del objeto sin necesidad de múltiples constructores o parámetros largos en el constructor.
// Flexibilidad: Es sencillo agregar o quitar propiedades opcionales sin afectar el código cliente.

// Ejemplo 2

// Here's the PizzaBuilder (you can also call it the chef)
function PizzaBuilder() {
    let base
    let sauce
    let cheese
    let toppings = []
 
    // The definition of pizza is hidden from the customers
    function Pizza(base, sauce, cheese, toppings) {
        this.base = base
        this.sauce = sauce
        this.cheese = cheese
        this.toppings = toppings
 
        this.printInfo = function() {
            console.log("This pizza has " + this.base + " base with " + this.sauce + " sauce "
            + (this.cheese !== undefined ? "with cheese. " : "without cheese. ")
            + (this.toppings.length !== 0 ? "It has the following toppings: " + toppings.toString() : ""))
        }
    }
 
    // You can request the PizzaBuilder (/chef) to perform any of the following actions on your pizza
    return {
        addFlatbreadBase: function() {
            base = "flatbread"
            return this;
        },
        addTomatoSauce: function() {
            sauce = "tomato"
            return this;
        },
        addAlfredoSauce: function() {
            sauce = "alfredo"
            return this;
        },
        addCheese: function() {
            cheese = "parmesan"
            return this;
        },
        addOlives: function() {
            toppings.push("olives")
            return this
        },
        addJalapeno: function() {
            toppings.push("jalapeno")
            return this
        },
        cook: function() {
            if (base === null){
                console.log("Can't make a pizza without a base")
                return
            }
            return new Pizza(base, sauce, cheese, toppings)
        }
    }
 
 }
 
 // This is the Director for the PizzaBuilder, aka the PizzaShop.
 // It contains a list of preset steps that can be used to prepare common pizzas (aka recipes!)
 function PizzaShop() {
    return {
        makePizzaMargherita: function() {
            pizzaBuilder = new PizzaBuilder()
            pizzaMargherita = pizzaBuilder.addFlatbreadBase().addTomatoSauce().addCheese().addOlives().cook()
            return pizzaMargherita
        },
        makePizzaAlfredo: function() {
            pizzaBuilder = new PizzaBuilder()
            pizzaAlfredo = pizzaBuilder.addFlatbreadBase().addAlfredoSauce().addCheese().addJalapeno().cook()
            return pizzaAlfredo
        },
        makePizzaMarinara: function() {
            pizzaBuilder = new PizzaBuilder()
            pizzaMarinara = pizzaBuilder.addFlatbreadBase().addTomatoSauce().addOlives().cook()
            return pizzaMarinara
        }
    }
 }
 
 // Here's where the customer can request pizzas from
 function run() {
 
    let pizzaShop = new PizzaShop()
 
    // You can ask for one of the popular pizza recipes...
    let pizzaMargherita = pizzaShop.makePizzaMargherita()
    pizzaMargherita.printInfo()
    // Output: This pizza has flatbread base with tomato sauce with cheese. It has the following toppings: olives
 
    let pizzaAlfredo = pizzaShop.makePizzaAlfredo()
    pizzaAlfredo.printInfo()
    // Output: This pizza has flatbread base with alfredo sauce with cheese. It has the following toppings: jalapeno
 
    let pizzaMarinara = pizzaShop.makePizzaMarinara()
    pizzaMarinara.printInfo()
    // Output: This pizza has flatbread base with tomato sauce without cheese. It has the following toppings: olives
 
    // Or send your custom request directly to the chef!
    let chef = PizzaBuilder()
    let customPizza = chef.addFlatbreadBase().addTomatoSauce().addCheese().addOlives().addJalapeno().cook()
    customPizza.printInfo()
    // Output: This pizza has flatbread base with tomato sauce with cheese. It has the following toppings: olives,jalapeno
 
 }
 
 run()