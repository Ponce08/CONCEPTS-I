// El patrón de diseño State permite a un objeto cambiar su comportamiento cuando cambia su estado interno. En lugar de usar muchas condiciones (if o switch), el patrón State permite encapsular cada estado en una clase separada. Esto facilita la modificación, la adición y la eliminación de estados sin afectar al resto del código.

// En JavaScript, puedes implementar este patrón creando una clase para el contexto (el objeto principal que cambia de comportamiento) y diferentes clases para cada estado específico. Cada estado tiene su propio comportamiento que el contexto usará cuando esté en ese estado.

// Ejemplo: Máquina de Estados de una Conexión
// Imaginemos una aplicación de red en la que tenemos diferentes estados de conexión: desconectado, conectando y conectado. Dependiendo del estado actual, el comportamiento del sistema cambiará (por ejemplo, si estamos desconectados, intentar conectarse; si estamos conectados, enviar datos).

// Paso 1: Crear la Clase Connection
// Primero, creamos la clase contexto Connection, que es el objeto que cambia de comportamiento dependiendo de su estado.

class Connection {
    constructor() {
        this.state = new DisconnectedState(this); // Estado inicial
    }

    setState(state) {
        this.state = state;
    }

    connect() {
        this.state.connect();
    }

    disconnect() {
        this.state.disconnect();
    }

    sendData(data) {
        this.state.sendData(data);
    }
}
// En esta clase, el método setState permite cambiar el estado, mientras que los métodos connect, disconnect y sendData delegan las acciones al estado actual.

// Paso 2: Crear Clases de Estado
// Creamos clases para cada estado. Cada clase implementa su propio comportamiento para connect, disconnect y sendData
class DisconnectedState {
    constructor(connection) {
        this.connection = connection;
    }

    connect() {
        console.log("Conectando...");
        this.connection.setState(new ConnectingState(this.connection));
    }

    disconnect() {
        console.log("Ya estamos desconectados.");
    }

    sendData(data) {
        console.log("No se puede enviar datos. No estamos conectados.");
    }
}

class ConnectingState {
    constructor(connection) {
        this.connection = connection;
    }

    connect() {
        console.log("Ya estamos intentando conectar.");
    }

    disconnect() {
        console.log("Cancelando conexión...");
        this.connection.setState(new DisconnectedState(this.connection));
    }

    sendData(data) {
        console.log("No se puede enviar datos mientras estamos conectando.");
    }
}

class ConnectedState {
    constructor(connection) {
        this.connection = connection;
    }

    connect() {
        console.log("Ya estamos conectados.");
    }

    disconnect() {
        console.log("Desconectando...");
        this.connection.setState(new DisconnectedState(this.connection));
    }

    sendData(data) {
        console.log(`Enviando datos: ${data}`);
    }
}
// Paso 3: Usar los Estados en el Contexto
// Finalmente, probamos el comportamiento de nuestra conexión.
const connection = new Connection();

connection.connect();      // Conectando...
connection.sendData("Hola"); // No se puede enviar datos mientras estamos conectando.
connection.disconnect();   // Cancelando conexión...
connection.sendData("Hola"); // No se puede enviar datos. No estamos conectados.

connection.connect();      // Conectando...
connection.setState(new ConnectedState(connection)); // Simula que la conexión fue exitosa
connection.sendData("Hola"); // Enviando datos: Hola
connection.disconnect();   // Desconectando...

// Salida Esperada

/**
Conectando...
No se puede enviar datos mientras estamos conectando.
Cancelando conexión...
No se puede enviar datos. No estamos conectados.
Conectando...
Enviando datos: Hola
Desconectando...
 */

// Ejemplo 2

// Create titles for all states of a task
const STATE_TODO = "TODO"
const STATE_IN_PROGRESS = "IN_PROGRESS"
const STATE_READY_FOR_REVIEW = "READY_FOR_REVIEW"
const STATE_DONE = "DONE"

// Create the task class with a title, assignee, and duration of the task
function Task(title, assignee) {
    this.title = title
    this.assignee = assignee

    // Helper function to update the assignee of the task
    this.setAssignee = function (assignee) {
        this.assignee = assignee
    }

    // Function to update the state of the task
    this.updateState = function (state) {

        switch (state) {
            case STATE_TODO:
                this.state = new TODO(this)
                break
            case STATE_IN_PROGRESS:
                this.state = new IN_PROGRESS(this)
                break
            case STATE_READY_FOR_REVIEW:
                this.state = new READY_FOR_REVIEW(this)
                break
            case STATE_DONE:
                this.state = new DONE(this)
                break
            default:
                return
        }
        // Invoke the callback function for the new state after it is set
        this.state.onStateSet()
    }

    // Set the initial state of the task as TODO
    this.updateState(STATE_TODO)
}

// TODO state
function TODO(task) {

    this.onStateSet = function () {
        console.log(task.assignee + " notified about new task " + task.title + "")
    }
}

// IN_PROGRESS state
function IN_PROGRESS(task) {

    this.onStateSet = function () {
        console.log(task.assignee + " started working on the task " + task.title + "")
    }
}

// READY_FOR_REVIEW state that updates the assignee of the task to be the manager of the developer
// for the review
function READY_FOR_REVIEW(task) {
    this.getAssignee = function () {
        return "Manager 1"
    }

    this.onStateSet = function () {
        task.setAssignee(this.getAssignee())
        console.log(task.assignee + " notified about completed task " + task.title + "")
    }
}

// DONE state that removes the assignee of the task since it is now completed
function DONE(task) {
    this.getAssignee = function () {
        return ""
    }

    this.onStateSet = function () {
        task.setAssignee(this.getAssignee())
        console.log("Task " + task.title + " completed")
    }
}

function run() {
    // Create a task
    let task1 = new Task("Create a login page,", "Developer 1")
    // Output: Developer 1 notified about new task "Create a login page"

    // Set it to IN_PROGRESS
    task1.updateState(STATE_IN_PROGRESS)
    // Output: Developer 1 started working on the task "Create a login page"

    // Create another task
    let task2 = new Task("Create an auth server,", "Developer 2")
    // Output: Developer 2 notified about new task "Create an auth server"


    // Set it to IN_PROGRESS as well
    task2.updateState(STATE_IN_PROGRESS)
    // Output: Developer 2 started working on the task "Create an auth server"

    // Update the states of the tasks until they are done
    task2.updateState(STATE_READY_FOR_REVIEW)
    // Output: Manager 1 notified about completed task "Create an auth server"
    task1.updateState(STATE_READY_FOR_REVIEW)
    // Output: Manager 1 notified about completed task "Create a login page"


    task1.updateState(STATE_DONE)
    // Output: Task "Create a login page" completed
    task2.updateState(STATE_DONE)
    // Output: Task "Create an auth server" completed

}

run()

/**Ventajas del Patrón State
Código más claro: Al encapsular cada estado en su propia clase, evitamos una gran cantidad de if-else o switch en el código.
Fácil de mantener y extender: Los estados se pueden agregar o modificar sin afectar a otros estados o al contexto principal.
Separación de responsabilidades: Cada clase de estado se centra solo en el comportamiento correspondiente a ese estado, mejorando el mantenimiento.

Consideraciones
El patrón State es útil cuando el comportamiento de un objeto cambia de forma significativa en función de su estado interno. Sin embargo, puede ser excesivo en situaciones donde solo hay uno o dos estados con diferencias mínimas en el comportamiento */