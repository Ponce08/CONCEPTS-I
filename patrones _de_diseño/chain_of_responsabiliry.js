// El patrón de diseño Chain of Responsibility permite crear una cadena de objetos que se encargan de procesar una solicitud de manera secuencial. Cada objeto en la cadena decide si maneja la solicitud o la pasa al siguiente objeto. Este patrón es útil cuando varios objetos pueden manejar una solicitud, pero el objeto específico que debe hacerlo no se conoce hasta el tiempo de ejecución.

// Ejemplo: Sistema de Soporte Técnico
// Imaginemos un sistema de soporte técnico donde existen diferentes niveles de soporte: soporte básico, soporte intermedio y soporte avanzado. Cuando un cliente realiza una solicitud, el sistema verifica en cada nivel de soporte si puede resolver el problema. Si no puede, pasa la solicitud al siguiente nivel.

// Paso 1: Definir una Clase Base de Handler
// Primero, creamos una clase SupportHandler que actuará como base para todos los niveles de soporte. Esta clase tendrá un método setNext para definir el siguiente objeto en la cadena y un método handle para procesar la solicitud.

class SupportHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        } else {
            console.log("Nadie pudo manejar la solicitud.");
        }
    }
}
// Paso 2: Crear los Handlers Concretos
// Ahora, creamos clases específicas para cada nivel de soporte, cada una de las cuales extiende SupportHandler e implementa el método handle para procesar la solicitud si el nivel es adecuado.
class BasicSupport extends SupportHandler {
    handle(request) {
        if (request.level <= 1) {
            console.log("Soporte Básico: La solicitud fue manejada.");
        } else {
            console.log("Soporte Básico: Pasando al siguiente nivel.");
            super.handle(request);
        }
    }
}

class IntermediateSupport extends SupportHandler {
    handle(request) {
        if (request.level <= 2) {
            console.log("Soporte Intermedio: La solicitud fue manejada.");
        } else {
            console.log("Soporte Intermedio: Pasando al siguiente nivel.");
            super.handle(request);
        }
    }
}

class AdvancedSupport extends SupportHandler {
    handle(request) {
        if (request.level <= 3) {
            console.log("Soporte Avanzado: La solicitud fue manejada.");
        } else {
            console.log("Soporte Avanzado: No se pudo manejar la solicitud.");
        }
    }
}
// Paso 3: Configurar la Cadena de Responsabilidad
// Ahora configuramos la cadena, comenzando con el soporte básico, seguido del intermedio y terminando con el avanzado.
const basicSupport = new BasicSupport();
const intermediateSupport = new IntermediateSupport();
const advancedSupport = new AdvancedSupport();

// Configurar la cadena de responsabilidad
basicSupport.setNext(intermediateSupport).setNext(advancedSupport);

// Paso 4: Realizar Solicitudes
// Probamos la cadena de responsabilidad enviando solicitudes de diferentes niveles y viendo cómo se manejan.
console.log("Solicitud de nivel 1:");
basicSupport.handle({ level: 1 });

console.log("\nSolicitud de nivel 2:");
basicSupport.handle({ level: 2 });

console.log("\nSolicitud de nivel 3:");
basicSupport.handle({ level: 3 });

console.log("\nSolicitud de nivel 4:");
basicSupport.handle({ level: 4 });

// Salida esperada:

/**Solicitud de nivel 1:
Soporte Básico: La solicitud fue manejada.

Solicitud de nivel 2:
Soporte Básico: Pasando al siguiente nivel.
Soporte Intermedio: La solicitud fue manejada.

Solicitud de nivel 3:
Soporte Básico: Pasando al siguiente nivel.
Soporte Intermedio: Pasando al siguiente nivel.
Soporte Avanzado: La solicitud fue manejada.

Solicitud de nivel 4:
Soporte Básico: Pasando al siguiente nivel.
Soporte Intermedio: Pasando al siguiente nivel.
Soporte Avanzado: No se pudo manejar la solicitud.
 */

// Ejemplo 2

// Complaint class that stores title and severity of a complaint
// Higher value of severity indicates a more severe complaint
function Complaint (title, severity) {
    this.title = title
    this.severity = severity
}

// Base level handler that receives all complaints
function Representative () {
    // If this handler can not handle the complaint, it will be forwarded to the next level
    this.nextLevel = new Management()

    this.handleComplaint = function (complaint) {
        if (complaint.severity === 0)
            console.log("Representative resolved the following complaint: " + complaint.title)
        else
            this.nextLevel.handleComplaint(complaint)
    }
}

// Second level handler to handle complaints of severity 1
function Management() {
    // If this handler can not handle the complaint, it will be forwarded to the next level
    this.nextLevel = new Leadership()

    this.handleComplaint = function (complaint) {
        if (complaint.severity === 1)
            console.log("Management resolved the following complaint: " + complaint.title)
        else
            this.nextLevel.handleComplaint(complaint)
    }
}

// Highest level handler that handles all complaints unhandled so far
function Leadership() {
    this.handleComplaint = function (complaint) {
        console.log("Leadership resolved the following complaint: " + complaint.title)
    }
}

function run() {
    // Create an instance of the base level handler
    let customerSupport = new Representative()

    // Create multiple complaints of varying severity and pass them to the base handler

    let complaint1 = new Complaint("Submit button doesn't work,", 0)
    customerSupport.handleComplaint(complaint1)
    // Output: Representative resolved the following complaint: Submit button doesn't work

    let complaint2 = new Complaint("Payment failed,", 1)
    customerSupport.handleComplaint(complaint2)
    // Output: Management resolved the following complaint: Payment failed

    let complaint3 = new Complaint("Employee misdemeanour,", 2)
    customerSupport.handleComplaint(complaint3)
    // Output: Leadership resolved the following complaint: Employee misdemeanour
}

run()

/**Ventajas del Patrón Chain of Responsibility
Desacoplamiento: El patrón desacopla el emisor de la solicitud de los manejadores, permitiendo que los manejadores actúen de manera independiente.
Flexibilidad: Los manejadores pueden añadirse, eliminarse o reorganizarse fácilmente en la cadena sin afectar el flujo principal.
Responsabilidad Distribuida: Divide la responsabilidad de manejar la solicitud entre múltiples objetos, facilitando el manejo de casos específicos en cada nivel.
Consideraciones
El patrón Chain of Responsibility es ideal cuando se tienen múltiples objetos que podrían procesar una solicitud y se desea evitar la lógica compleja de decisiones en un solo objeto. Sin embargo, debe diseñarse con cuidado para evitar cadenas largas o manejo ineficiente de solicitudes. */