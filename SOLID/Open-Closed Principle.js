// El Open-Closed Principle (OCP), o Principio de Abierto/Cerrado, es uno de los principios SOLID de la programación orientada a objetos. Este principio establece que una clase debe estar abierta para la extensión pero cerrada para la modificación. En otras palabras, deberías poder añadir nuevas funcionalidades a una clase sin cambiar su código existente.

// Aplicación del OCP en JavaScript
// Para aplicar el OCP en JavaScript, puedes usar diversas técnicas, como la herencia, la composición o el uso de interfaces. Aquí te muestro algunas formas de implementar este principio.

// 1. Uso de la herencia
// Puedes crear una clase base y luego extenderla con clases derivadas que añadan o modifiquen el comportamiento.
class Vehiculo {
    constructor(marca) {
        this.marca = marca;
    }

    descripcion() {
        return `Este es un vehículo de marca ${this.marca}`;
    }
}

// Clase hija que extiende el comportamiento
class Coche extends Vehiculo {
    constructor(marca, modelo) {
        super(marca);
        this.modelo = modelo;
    }

    descripcion() {
        return `${super.descripcion()} y modelo ${this.modelo}`;
    }
}

const miCoche = new Coche("Toyota", "Corolla");
console.log(miCoche.descripcion()); // Este es un vehículo de marca Toyota y modelo Corolla
// En este ejemplo:
// La clase Vehiculo está cerrada para modificaciones (no se modifica directamente), pero abierta para la extensión (se puede crear una clase Coche que extienda su funcionalidad).

// 2. Uso de la composición
// La composición permite crear objetos complejos combinando objetos más simples. Esto es útil para agregar funcionalidades sin modificar el código existente.
class Rueda {
    constructor(tamaño) {
        this.tamaño = tamaño;
    }

    descripcion() {
        return `Rueda de tamaño ${this.tamaño}`;
    }
}

class Coche {
    constructor(marca, modelo, rueda) {
        this.marca = marca;
        this.modelo = modelo;
        this.rueda = rueda; // Composición
    }

    descripcion() {
        return `Coche ${this.marca} ${this.modelo} con ${this.rueda.descripcion()}`;
    }
}

const rueda = new Rueda(17);
const miCoche2 = new Coche("Ford", "Fiesta", rueda);
console.log(miCoche2.descripcion()); // Coche Ford Fiesta con Rueda de tamaño 17
// Aquí, Coche se compone de un objeto Rueda. Si necesitas agregar otra funcionalidad relacionada con las ruedas, simplemente puedes crear otra clase o modificar Rueda sin cambiar la implementación de Coche.

// 3. Uso de interfaces (en forma de funciones o clases)
// Aunque JavaScript no tiene interfaces en el sentido estricto como otros lenguajes, puedes simular este concepto con funciones que esperan ciertos métodos.
class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Proveedor {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Gestor {
    procesar(tipo) {
        console.log(`Procesando ${tipo.nombre}`);
    }
}

const cliente = new Cliente("Juan");
const proveedor = new Proveedor("Proveedor S.A.");

const gestor = new Gestor();
gestor.procesar(cliente);   // Procesando Juan
gestor.procesar(proveedor);  // Procesando Proveedor S.A.
// En este ejemplo, Gestor puede procesar tanto Cliente como Proveedor, y si se agrega un nuevo tipo (como Usuario), Gestor puede seguir funcionando sin modificaciones.

// Ventajas del Open-Closed Principle
// Mantenimiento más fácil: Al evitar cambios en el código existente, reduces el riesgo de introducir errores en partes del sistema que ya funcionan.
// Escalabilidad: Facilita la adición de nuevas características sin afectar el comportamiento del sistema existente.
// Mejor organización del código: Fomenta una arquitectura más limpia y organizada, al separar el comportamiento base de las extensiones.