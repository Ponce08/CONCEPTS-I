// En JavaScript, la herencia es un concepto de la programación orientada a objetos que permite crear clases derivadas que heredan características de otras clases. Esto facilita la reutilización de código y la creación de estructuras jerárquicas entre clases, donde las clases "hijas" pueden usar y extender las funcionalidades de las clases "padres".

// Herencia en JavaScript con la palabra clave extends
// JavaScript introdujo la sintaxis de clases en ES6, donde el operador extends se usa para crear una clase hija que herede de una clase padre. La clase hija puede acceder a los métodos y propiedades de la clase padre y puede también sobrescribirlos (esto se llama polimorfismo).

// Ejemplo de herencia simple
// Clase padre
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    hacerSonido() {
        console.log("El animal hace un sonido");
    }
}

// Clase hija
class Perro extends Animal {
    constructor(nombre, raza) {
        super(nombre); // Llama al constructor de la clase padre
        this.raza = raza;
    }

    hacerSonido() {
        console.log("El perro ladra"); // Sobrescribe el método de la clase padre
    }
}

const miPerro = new Perro("Firulais", "Labrador");
console.log(miPerro.nombre); // Firulais
console.log(miPerro.raza);   // Labrador
miPerro.hacerSonido();       // El perro ladra
// En este ejemplo:
// Animal es la clase padre, y tiene una propiedad nombre y un método hacerSonido.
// Perro es la clase hija que extiende de Animal, e incluye una propiedad adicional raza y sobrescribe el método hacerSonido.
// super(nombre) en el constructor de Perro llama al constructor de Animal, lo que permite inicializar la propiedad nombre

// Usando super para acceder a métodos de la clase padre
// La palabra clave super se usa no solo para llamar al constructor de la clase padre sino también para acceder a otros métodos de la clase padre
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    hacerSonido() {
        console.log("El animal hace un sonido");
    }
}

class Perro extends Animal {
    hacerSonido() {
        super.hacerSonido(); // Llama al método hacerSonido de la clase padre
        console.log("El perro ladra"); // Agrega funcionalidad adicional
    }
}

const miPerro2 = new Perro("Firulais");
miPerro2.hacerSonido();
// Output:
// El animal hace un sonido
// El perro ladra

// Herencia de múltiples niveles
// JavaScript permite herencia en varios niveles (herencia en cadena). Esto significa que una clase hija puede actuar como clase padre para otra clase.
class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Perro extends Animal {
    constructor(nombre, raza) {
        super(nombre);
        this.raza = raza;
    }
}

class PastorAleman extends Perro {
    constructor(nombre) {
        super(nombre, "Pastor Alemán");
    }

    describir() {
        console.log(`${this.nombre} es un ${this.raza}`);
    }
}

const miPastor = new PastorAleman("Max");
miPastor.describir(); // Max es un Pastor Alemán
// Aquí:
// PastorAleman hereda de Perro, que a su vez hereda de Animal.
// La clase PastorAleman hereda las propiedades nombre y raza, y puede añadir métodos adicionales como describir.

/**---------------------------------------------------------------------------------------------------------------------- */

// Ventajas de la herencia
// Reutilización de código: La herencia permite que una clase hija reutilice los métodos y propiedades de la clase padre.
// Organización lógica: Facilita la creación de jerarquías lógicas, donde los elementos comparten atributos comunes y específicos.
// Extensibilidad: Las clases hijas pueden extender el comportamiento de las clases padres mediante métodos adicionales o sobrescritura de métodos.
