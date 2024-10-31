// El patrón de diseño Abstract Factory es un patrón creacional que permite crear familias de objetos relacionados sin especificar sus clases concretas. Este patrón es útil cuando el sistema necesita trabajar con diferentes tipos de productos, y no se quiere que el código dependa de la creación concreta de estos objetos. En cambio, se define una interfaz para crear estos productos y delegamos la creación a una "fábrica abstracta".

// Ejemplo en JavaScript
// Imaginemos una fábrica de componentes gráficos que genera diferentes elementos de UI para una aplicación, dependiendo del tipo de sistema operativo (Windows o MacOS). Cada sistema operativo puede crear su propia versión de una ventana (Window) y de un botón (Button).

// Paso 1: Define las interfaces de los productos
// Primero, definimos las interfaces de los productos que nuestras fábricas crearán. En JavaScript, podemos representarlas con clases básicas.

class Window {
    render() {
      throw new Error("Método 'render()' debe ser implementado.");
    }
  }
  
  class Button {
    click() {
      throw new Error("Método 'click()' debe ser implementado.");
    }
  }

//   Paso 2: Define las clases concretas de los productos
//   Creamos las implementaciones de Window y Button para cada sistema operativo. 

// Productos para Windows
class WindowsWindow extends Window {
    render() {
      console.log("Renderizando ventana de Windows.");
    }
  }
  
  class WindowsButton extends Button {
    click() {
      console.log("Click en botón de Windows.");
    }
  }
  
  // Productos para MacOS
  class MacWindow extends Window {
    render() {
      console.log("Renderizando ventana de MacOS.");
    }
  }
  
  class MacButton extends Button {
    click() {
      console.log("Click en botón de MacOS.");
    }
  }
  
// Paso 3: Crea la Abstract Factory
// Ahora definimos la interfaz de la fábrica abstracta que declara los métodos para crear productos abstractos.

class UIFactory {
    createWindow() {
      throw new Error("Método 'createWindow()' debe ser implementado.");
    }
  
    createButton() {
      throw new Error("Método 'createButton()' debe ser implementado.");
    }
  }

// Paso 4: Implementa las fábricas concretas
// Creamos fábricas específicas para cada sistema operativo que implementan la interfaz UIFactory y crean las versiones concretas de cada producto.

class WindowsFactory extends UIFactory {
    createWindow() {
      return new WindowsWindow();
    }
  
    createButton() {
      return new WindowsButton();
    }
  }
  
  class MacFactory extends UIFactory {
    createWindow() {
      return new MacWindow();
    }
  
    createButton() {
      return new MacButton();
    }
  }

// Paso 5: Usa la Abstract Factory
// Por último, puedes usar una de las fábricas concretas dependiendo del sistema operativo deseado, creando los productos sin conocer sus clases concretas.

function createUI(factory) {
    const window = factory.createWindow();
    const button = factory.createButton();
  
    window.render();
    button.click();
  }
  
  // Cliente elige una fábrica concreta
  const os = "Windows"; // Podría ser "MacOS"
  
  const factory = os === "Windows" ? new WindowsFactory() : new MacFactory();
  createUI(factory);

// Ejemplo 2

// A factory to create dogs
function DogFactory() {
    // Notice that the create function is now createPet instead of createDog, since we need
    // it to be uniform across the other factories that will be used with this
    this.createPet = function (breed) {
        let dog;
 
        if (breed === "labrador") {
            dog = new Labrador();
        } else if (breed === "pug") {
            dog = new Pug();
        }
 
        dog.breed = breed;
        dog.printInfo = function () {
            console.log("nnType: " + dog.type + "nBreed: " + dog.breed + "nSize: " + dog.size)
        }
 
        return dog;
    }
 }
 
 // A factory to create cats
 function CatFactory() {
    this.createPet = function (breed) {
        let cat;
 
        if (breed === "ragdoll") {
            cat = new Ragdoll();
        } else if (breed === "singapura") {
            cat = new Singapura();
        }
 
        cat.breed = breed;
        cat.printInfo = function () {
            console.log("nnType: " + cat.type + "nBreed: " + cat.breed + "nSize: " + cat.size)
        }
 
        return cat;
    }
 }
 
 // Dog and cat breed definitions
 function Labrador() {
    this.type = "dog"
    this.size = "large"
 }
 
 function Pug() {
    this.type = "dog"
    this.size = "small"
 }
 
 function Ragdoll() {
    this.type = "cat"
    this.size = "large"
 }
 
 function Singapura() {
    this.type = "cat"
    this.size = "small"
 }
 
 function run() {
 
    let pets = [];
 
    // Initialize the two factories
    let catFactory = new CatFactory();
    let dogFactory = new DogFactory();
 
    // Create a common petFactory that can produce both cats and dogs
    // Set it to produce dogs first
    let petFactory = dogFactory;
 
    pets.push(petFactory.createPet("labrador"));
    pets.push(petFactory.createPet("pug"));
 
    // Set the petFactory to produce cats
    petFactory = catFactory;
 
    pets.push(petFactory.createPet("ragdoll"));
    pets.push(petFactory.createPet("singapura"));
 
    for (var i = 0, len = pets.length; i < len; i++) {
        pets[i].printInfo();
    }
 }
 
 run()
 
 /**
 Output:
 
 Type: dog
 Breed: labrador
 Size: large
 
 
 Type: dog
 Breed: pug
 Size: small
 
 
 Type: cat
 Breed: ragdoll
 Size: large
 
 
 Type: cat
 Breed: singapura
 Size: small
 
 */