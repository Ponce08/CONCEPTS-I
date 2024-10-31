// El Principio de Inversión de Dependencias (Dependency Inversion Principle, DIP) es uno de los cinco principios SOLID de la programación orientada a objetos. Este principio establece que:

// Las entidades de alto nivel no deben depender de las entidades de bajo nivel. Ambas deben depender de abstracciones (por ejemplo, interfaces).
// Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.
// En otras palabras, este principio promueve una arquitectura donde las clases de alto nivel (que contienen la lógica de negocio) no están directamente acopladas a clases de bajo nivel (que implementan detalles específicos). En su lugar, ambas deben interactuar a través de interfaces o abstracciones. Esto reduce el acoplamiento y mejora la flexibilidad y la mantenibilidad del código.

// Ejemplo en JavaScript
// Supongamos que estamos creando una aplicación que envía notificaciones. Primero, veamos un diseño que no sigue el principio de inversión de dependencias.

// Sin aplicar el DIP
class Notificador {
    enviarNotificacion(mensaje) {
        // Aquí se envía una notificación por email
        console.log(`Enviando email: ${mensaje}`);
    }
}

class Servicio {
    constructor() {
        this.notificador = new Notificador(); // Dependencia directa
    }

    realizarAccion() {
        // Lógica de negocio
        this.notificador.enviarNotificacion("Acción realizada.");
    }
}

const servicio = new Servicio();
servicio.realizarAccion(); // Enviando email: Acción realizada.
// Problemas con este enfoque:
// Acoplamiento fuerte: La clase Servicio está directamente acoplada a la clase Notificador. Esto dificulta realizar pruebas y cambios en el futuro.
// Dificultad para cambiar el tipo de notificación: Si quisiéramos enviar notificaciones por SMS o por otra vía, tendríamos que modificar la clase Servicio.

// Aplicando el DIP
// Ahora veamos cómo aplicar el principio de inversión de dependencias utilizando interfaces (o clases base) para desacoplar las dependencias.
// Interfaz para Notificación
class Notificacion {
    enviarNotificacion(mensaje) {
        throw new Error("Método no implementado");
    }
}

// Clase que implementa la interfaz de notificación por email
class NotificadorEmail extends Notificacion {
    enviarNotificacion(mensaje) {
        console.log(`Enviando email: ${mensaje}`);
    }
}

// Clase que implementa la interfaz de notificación por SMS
class NotificadorSMS extends Notificacion {
    enviarNotificacion(mensaje) {
        console.log(`Enviando SMS: ${mensaje}`);
    }
}

// Clase de servicio
class Servicio {
    constructor(notificador) {
        this.notificador = notificador; // Dependencia a través de la interfaz
    }

    realizarAccion() {
        // Lógica de negocio
        this.notificador.enviarNotificacion("Acción realizada.");
    }
}

// Uso
const notificadorEmail = new NotificadorEmail();
const servicioConEmail = new Servicio(notificadorEmail);
servicioConEmail.realizarAccion(); // Enviando email: Acción realizada.

const notificadorSMS = new NotificadorSMS();
const servicioConSMS = new Servicio(notificadorSMS);
servicioConSMS.realizarAccion(); // Enviando SMS: Acción realizada.


// Ventajas de este enfoque:
// Desacoplamiento: La clase Servicio ya no depende de una implementación concreta de Notificador. Puede funcionar con cualquier clase que implemente la interfaz Notificacion.
// Flexibilidad: Se pueden agregar nuevos tipos de notificaciones (como notificaciones por push) sin modificar la clase Servicio.
// Facilidad de prueba: Se pueden crear mocks o stubs de la interfaz Notificacion para probar la clase Servicio sin enviar realmente notificaciones.