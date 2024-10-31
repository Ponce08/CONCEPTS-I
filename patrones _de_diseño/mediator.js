// El patrón de diseño Mediator (o Mediador) es un patrón de comportamiento que facilita la comunicación entre objetos en un sistema sin que estos se conozcan directamente, promoviendo el desacoplamiento. En lugar de permitir que los objetos se comuniquen entre sí directamente, el patrón Mediator introduce un objeto mediador que maneja toda la interacción entre ellos.

// Este patrón es especialmente útil cuando un sistema tiene muchos objetos que interactúan entre sí y quieres evitar la alta interdependencia, manteniendo el código más limpio y fácil de mantener.

// Ejemplo del patrón Mediator en JavaScript
// Supongamos que estamos desarrollando un chat grupal donde los usuarios pueden enviar mensajes entre ellos. Sin el patrón Mediator, cada usuario tendría que conocer directamente a los otros para enviarles mensajes, lo que generaría un acoplamiento alto. Con un mediador, cada usuario solo interactúa con el mediador, y este se encarga de la comunicación entre ellos.

// Paso 1: Crear la clase Mediador (Chat)
// Definimos la clase ChatMediator, que será responsable de gestionar la comunicación entre los usuarios. Esta clase tendrá métodos para agregar usuarios y para enviar mensajes de un usuario a otro.

class ChatMediator {
    constructor() {
      this.usuarios = []; // Lista de usuarios en el chat
    }
  
    // Agrega un usuario al chat
    agregarUsuario(usuario) {
      this.usuarios.push(usuario);
      usuario.establecerMediator(this); // Configura el mediador del usuario
    }
  
    // Envia un mensaje desde un usuario específico a todos los demás
    enviarMensaje(mensaje, remitente) {
      this.usuarios.forEach(usuario => {
        if (usuario !== remitente) {
          usuario.recibir(mensaje, remitente); // Enviar el mensaje solo a los demás usuarios
        }
      });
    }
  }
//   Paso 2: Crear la clase de Usuario
//   Definimos la clase Usuario, que representa a cada usuario en el chat. Cada usuario solo necesita saber cómo enviar y recibir mensajes a través del ChatMediator. 
class Usuario {
    constructor(nombre) {
      this.nombre = nombre;
      this.mediator = null;
    }
  
    // Establece el mediador
    establecerMediator(mediator) {
      this.mediator = mediator;
    }
  
    // Envía un mensaje a través del mediador
    enviar(mensaje) {
      console.log(`${this.nombre} envía: ${mensaje}`);
      this.mediator.enviarMensaje(mensaje, this);
    }
  
    // Recibe un mensaje de otro usuario
    recibir(mensaje, remitente) {
      console.log(`${this.nombre} recibe de ${remitente.nombre}: ${mensaje}`);
    }
  }
//   Paso 3: Usar el Mediador y los Usuarios
//   Creamos una instancia del ChatMediator y varios usuarios, agregándolos al mediador. Los usuarios enviarán mensajes a través del mediador, que gestionará su distribución.  
// Crear instancia de ChatMediator
const chat = new ChatMediator();

// Crear usuarios
const usuario1 = new Usuario("Alice");
const usuario2 = new Usuario("Bob");
const usuario3 = new Usuario("Charlie");

// Agregar usuarios al chat
chat.agregarUsuario(usuario1);
chat.agregarUsuario(usuario2);
chat.agregarUsuario(usuario3);

// Enviar mensajes
usuario1.enviar("Hola a todos!");
usuario2.enviar("Hola Alice!");
usuario3.enviar("¿Cómo están?");

// Salida esperada en la consola

/**
Alice envía: Hola a todos!
Bob recibe de Alice: Hola a todos!
Charlie recibe de Alice: Hola a todos!
Bob envía: Hola Alice!
Alice recibe de Bob: Hola Alice!
Charlie recibe de Bob: Hola Alice!
Charlie envía: ¿Cómo están?
Alice recibe de Charlie: ¿Cómo están?
Bob recibe de Charlie: ¿Cómo están?
 */

// Ejemplo 2

// Writer class that receives an assignment, writes it in 2 seconds, and marks it as finished
function Writer(name, manager) {
    
    // Reference to the manager, writer's name, and a busy flag that the manager uses while assigning the article
    this.manager = manager
    this.name = name
    this.busy = false

    this.startWriting = function (assignment) {
        console.log(this.name + " started writing " + assignment + "")
        this.assignment = assignment
        this.busy = true

        // 2 s timer to replicate manual action
        setTimeout(() => { this.finishWriting() }, 2000)
    }

    this.finishWriting = function () {
        if (this.busy === true) {
            console.log(this.name + " finished writing " + this.assignment + "")
            this.busy = false
            return this.manager.notifyWritingComplete(this.assignment)
        } else {
            console.log(this.name + " is not writing any article")
        }
    }
}

// Editor class that receives an assignment, edits it in 3 seconds, and marks it as finished
function Editor(name, manager) {
    
    // Reference to the manager, writer's name, and a busy flag that the manager uses while assigning the article
    this.manager = manager
    this.name = name
    this.busy = false

    this.startEditing = function (assignment) {
        console.log(this.name + " started editing" + assignment + "")
        this.assignment = assignment
        this.busy = true

        // 3 s timer to replicate manual action
        setTimeout(() => { this.finishEditing() }, 3000)
    }

    this.finishEditing = function () {
        if (this.busy === true) {
            console.log(this.name + " finished editing " + "" + this.assignment + "")
            this.manager.notifyEditingComplete(this.assignment)
            this.busy = false
        } else {
            console.log(this.name + " is not editing any article")
        }
    }
}

// The mediator class
function Manager() {
    // Store arrays of workers
    this.editors = []
    this.writers = []

    this.setEditors = function (editors) {
        this.editors = editors
    }
    this.setWriters = function (writers) {
        this.writers = writers
    }

    // Manager receives new assignments via this method
    this.notifyNewAssignment = function (assignment) {
        let availableWriter = this.writers.find(function (writer) {
            return writer.busy === false
        })
        availableWriter.startWriting(assignment)
        return availableWriter
    }

    // Writers call this method to notify they're done writing
    this.notifyWritingComplete = function (assignment) {
        let availableEditor = this.editors.find(function (editor) {
            return editor.busy === false
        })
        availableEditor.startEditing(assignment)
        return availableEditor
    }

    // Editors call this method to notify they're done editing
    this.notifyEditingComplete = function (assignment) {
        console.log("" + assignment + "", "is ready to publish")
    }

}

function run() {
    // Create a manager
    let manager = new Manager()

    // Create workers
    let editors = [
        new Editor("Ed,", manager),
        new Editor("Phil,", manager),
    ]

    let writers = [
        new Writer("Michael,", manager),
        new Writer("Rick,", manager),
    ]

    // Attach workers to manager
    manager.setEditors(editors)
    manager.setWriters(writers)

    // Send two assignments to manager
    manager.notifyNewAssignment("var vs let in JavaScript")
    manager.notifyNewAssignment("JS promises")

    /**
     * Output:
     * Michael started writing "var vs let in JavaScript"
     * Rick started writing "JS promises"
     * 
     * After 2s, output:
     * Michael finished writing "var vs let in JavaScript"
     * Ed started editing "var vs let in JavaScript"
     * Rick finished writing "JS promises"
     * Phil started editing "JS promises"
     *
     * After 3s, output:
     * Ed finished editing "var vs let in JavaScript"
     * "var vs let in JavaScript" is ready to publish
     * Phil finished editing "JS promises"
     * "JS promises" is ready to publish
     */

}

run()

/**Ventajas del Patrón Mediator
Desacoplamiento: Los objetos interactúan sin depender unos de otros, ya que toda la comunicación es manejada por el mediador.
Fácil de modificar: Cambios en la lógica de interacción pueden implementarse en el mediador sin alterar los objetos individuales.
Código más claro: Ayuda a evitar conexiones complejas entre objetos, haciendo que el sistema sea más fácil de entender y mantener.

Desventajas del Patrón Mediator
Posible aumento en complejidad: El mediador puede volverse complejo a medida que gestiona más interacciones, lo que podría llevar a un código más difícil de manejar. */