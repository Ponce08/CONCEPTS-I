// El encapsulamiento es uno de los pilares de la programación orientada a objetos (POO) y se refiere a ocultar los detalles internos de un objeto, de modo que solo se pueda acceder a su comportamiento o propiedades de manera controlada. En JavaScript, el encapsulamiento permite controlar qué partes de un objeto o clase son accesibles y cuáles están ocultas al usuario.

// Ejemplo básico de encapsulamiento en JavaScript
// En JavaScript, el encapsulamiento se puede lograr utilizando:

// Variables privadas mediante closures o WeakMaps.
// Clases y modificadores de acceso.

// 1. Encapsulamiento con closures
function Persona(nombre, edad) {
    let _nombre = nombre; // Variable privada
    let _edad = edad;     // Variable privada

    this.getNombre = function() {
        return _nombre;
    };

    this.setNombre = function(nombre) {
        _nombre = nombre;
    };

    this.getEdad = function() {
        return _edad;
    };

    this.setEdad = function(edad) {
        if (edad >= 0) {
            _edad = edad;
        } else {
            console.log("La edad no puede ser negativa");
        }
    };
}

const persona = new Persona("Ana", 25);
console.log(persona.getNombre()); // Ana
persona.setEdad(26);
console.log(persona.getEdad());   // 26
/**En este ejemplo:

Las variables _nombre y _edad están protegidas, ya que son accesibles solo a través de los métodos getNombre, setNombre, getEdad y setEdad.
El acceso directo a las variables _nombre y _edad desde fuera del objeto está bloqueado. */

// 2. Encapsulamiento con clases y campos privados (con prefijo # en ES6+)
// JavaScript introdujo campos privados con el prefijo # en ES6+ para evitar el acceso directo a propiedades de una clase.
class Persona {
    #nombre; // Propiedad privada
    #edad;   // Propiedad privada

    constructor(nombre, edad) {
        this.#nombre = nombre;
        this.#edad = edad;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    getEdad() {
        return this.#edad;
    }

    setEdad(edad) {
        if (edad >= 0) {
            this.#edad = edad;
        } else {
            console.log("La edad no puede ser negativa");
        }
    }
}

const persona2 = new Persona("Luis", 30);
console.log(persona2.getNombre()); // Luis
persona2.setEdad(31);
console.log(persona2.getEdad());   // 31
// persona.#nombre; // Error: propiedad privada no accesible

/**---------------------------------------------------------------------------------------------------------------------- */

/**Beneficios del encapsulamiento
Seguridad: Protege los datos internos de un objeto contra modificaciones no autorizadas.
Modularidad: Simplifica el código al exponer solo las partes necesarias de una clase o función.
Mantenimiento: Facilita el mantenimiento y la actualización del código. */
