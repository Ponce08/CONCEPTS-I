// La abstracción en la programación orientada a objetos (POO) es el proceso de simplificar un sistema complejo destacando solo los detalles esenciales y ocultando aquellos que no son relevantes para el usuario. En JavaScript, la abstracción ayuda a estructurar el código de forma que los usuarios o programadores que utilicen la clase o el objeto solo accedan a lo que es necesario sin preocuparse por los detalles internos.

// Ejemplo básico de abstracción en JavaScript
// Supongamos que queremos crear una clase Coche para manejar los detalles básicos de un coche, como acelerar y frenar. Los detalles internos, como el motor o el sistema de combustible, no deben ser accesibles desde fuera de la clase.

class Coche {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
        this.velocidad = 0;
    }

    // Método para acelerar
    acelerar(incremento) {
        this.velocidad += incremento;
        console.log(`La velocidad del coche es ahora ${this.velocidad} km/h`);
    }

    // Método para frenar
    frenar(decremento) {
        this.velocidad -= decremento;
        if (this.velocidad < 0) this.velocidad = 0;
        console.log(`La velocidad del coche es ahora ${this.velocidad} km/h`);
    }
}

// Uso de la clase
const miCoche = new Coche("Toyota", "Corolla");
miCoche.acelerar(50);  // La velocidad del coche es ahora 50 km/h
miCoche.frenar(20);    // La velocidad del coche es ahora 30 km/h

/**---------------------------------------------------------------------------------------------------------------------- */

/**Beneficios de la abstracción
Simplicidad: Los usuarios solo interactúan con los métodos esenciales.
Mantenimiento: Facilita cambios en los detalles internos sin afectar el código que utiliza la clase.
Seguridad: Se evitan modificaciones indebidas de los detalles internos. */