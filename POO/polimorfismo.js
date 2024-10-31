// En JavaScript, el polimorfismo es un concepto clave de la Programación Orientada a Objetos (POO) que permite que diferentes clases usen el mismo método de formas distintas. Esto es posible cuando las clases derivadas (o "hijas") sobrescriben los métodos de la clase base (o "padre") para adaptarlos a su propio comportamiento.

// Tipos de Polimorfismo en JavaScript
// El polimorfismo en JavaScript se presenta principalmente en dos formas:

// Polimorfismo de Sobreescritura (Override): Es cuando una subclase redefine un método heredado de la clase base. La clase hija puede proporcionar una implementación específica de este método, adaptando el comportamiento a su contexto.

// Polimorfismo de Subtipo (Subtyping): Se refiere a la capacidad de tratar objetos de distintas subclases como si fueran del mismo tipo base, generalmente en el contexto de herencia. Esto permite usar un método de la clase base y que JavaScript seleccione automáticamente la implementación correspondiente según el objeto.

// Ejemplo de Polimorfismo en JavaScript
// Supongamos que tenemos una clase base Animal y varias subclases como Perro y Gato. En Animal, hay un método llamado hacerSonido, pero cada subclase redefine este método con su propio sonido.

// Clase base
class Animal {
    hacerSonido() {
        console.log("Este es un sonido de un animal.");
    }
}

// Subclase Perro
class Perro extends Animal {
    hacerSonido() {
        console.log("El perro ladra.");
    }
}

// Subclase Gato
class Gato extends Animal {
    hacerSonido() {
        console.log("El gato maúlla.");
    }
}

// Función que usa polimorfismo
function emitirSonido(animal) {
    animal.hacerSonido(); // Aquí JavaScript llama al método correspondiente según el tipo de objeto
}

// Uso del polimorfismo
const miPerro = new Perro();
const miGato = new Gato();

emitirSonido(miPerro); // "El perro ladra."
emitirSonido(miGato);  // "El gato maúlla."
/**
Explicación del Ejemplo
*Sobreescritura de Métodos: Tanto Perro como Gato sobrescriben el método hacerSonido de la clase Animal con sus propios comportamientos ("El perro ladra." y "El gato maúlla.", respectivamente).

*Polimorfismo en Acción: La función emitirSonido recibe un objeto del tipo Animal como argumento, pero gracias al polimorfismo, puede aceptar cualquier subclase de Animal. Dependiendo del tipo de objeto (miPerro o miGato), JavaScript llama al método hacerSonido correspondiente en cada caso. */

/**---------------------------------------------------------------------------------------------------------------------- */

/**Ventajas del Polimorfismo
Flexibilidad y Mantenimiento: Permite diseñar funciones y clases que funcionen con distintos tipos de objetos sin modificarse.
Código Reutilizable: Se pueden crear estructuras más genéricas y reutilizables, ya que el comportamiento de los objetos se adapta según su tipo.
Extensibilidad: Es fácil añadir nuevas subclases con implementaciones personalizadas sin modificar la lógica de las funciones existentes. */