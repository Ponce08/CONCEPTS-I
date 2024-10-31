// El patrón de diseño Memento permite capturar y restaurar el estado de un objeto sin violar su encapsulamiento. Este patrón es especialmente útil en aplicaciones que necesitan funcionalidad de "deshacer" o "rehacer", ya que guarda estados anteriores del objeto para poder restaurarlos más tarde.

// En JavaScript, el patrón Memento se puede implementar creando tres componentes clave:

// Originador: El objeto cuyo estado se quiere guardar y restaurar.
// Memento: Una representación del estado del Originador.
// Caretaker: El objeto que solicita el guardado y la restauración de los estados.
// Ejemplo: Editor de Texto con Función de Deshacer
// Imaginemos un editor de texto simple en el que podemos escribir, y queremos poder deshacer cambios.

// Paso 1: Crear el Originador
// El Originador es la clase que tiene el estado que queremos guardar. En este caso, es una clase Editor, que representa el contenido de un editor de texto.
class Editor {
    constructor() {
        this.content = '';
    }

    setContent(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    createMemento() {
        return new Memento(this.content);
    }

    restoreMemento(memento) {
        this.content = memento.getContent();
    }
}
// Paso 2: Crear el Memento
// El Memento es la clase que almacena el estado de Editor. Solo necesita almacenar el contenido y devolverlo.
class Memento {
    constructor(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }
}
// Paso 3: Crear el Caretaker
// El Caretaker es la clase que gestiona los mementos, permitiendo al Editor guardar y restaurar estados. Aquí, utilizamos una pila para almacenar los estados en el orden en que se crean, permitiendo una funcionalidad de "deshacer".
class History {
    constructor() {
        this.mementos = [];
    }

    saveMemento(memento) {
        this.mementos.push(memento);
    }

    getMemento() {
        return this.mementos.pop();
    }
}
// Paso 4: Implementar la Funcionalidad de Deshacer
// Ahora podemos usar estas clases para implementar el patrón Memento en el editor de texto.
// Crear instancias
const editor = new Editor();
const history = new History();

// Modificar el contenido y guardar estados
editor.setContent("Primera versión del texto");
history.saveMemento(editor.createMemento());

editor.setContent("Segunda versión del texto");
history.saveMemento(editor.createMemento());

editor.setContent("Tercera versión del texto");

// Deshacer cambios restaurando el estado anterior
console.log("Contenido actual:", editor.getContent());
editor.restoreMemento(history.getMemento());
console.log("Después de deshacer:", editor.getContent());

editor.restoreMemento(history.getMemento());
console.log("Después de deshacer otra vez:", editor.getContent());

// Salida esperada:

/**
Contenido actual: Tercera versión del texto
Después de deshacer: Segunda versión del texto
Después de deshacer otra vez: Primera versión del texto
 */

// Ejemplo 2

// The memento class that can hold one snapshot of the Originator class - document
function Text(contents) {
    // Contents of the document
    this.contents = contents

    // Accessor function for contents
    this.getContents = function () {
        return this.contents
    }

    // Helper function to calculate word count for the current document
    this.getWordCount = function () {
        return this.contents.length
    }
}

// The originator class that holds the latest version of the document
function Document(contents) {
    // Holder for the memento, i.e., the text of the document
    this.text = new Text(contents)

    // Function to save new contents as a memento
    this.save = function (contents) {
        this.text = new Text(contents)
        return this.text
    }

    // Function to revert to an older version of the text using a memento
    this.restore = function (text) {
        this.text = new Text(text.getContents())
    }

    // Helper function to get the current memento
    this.getText = function () {
        return this.text
    }

    // Helper function to get the word count of the current document
    this.getWordCount = function () {
        return this.text.getWordCount()
    }
}

// The caretaker class that providers helper functions to modify the document
function DocumentManager(document) {
    // Holder for the originator, i.e., the document
    this.document = document

    // Array to maintain a list of mementos
    this.history = []

    // Add the initial state of the document as the first version of the document
    this.history.push(document.getText())

    // Helper function to get the current contents of the documents
    this.getContents = function () {
        return this.document.getText().getContents()
    }

    // Helper function to get the total number of versions available for the document
    this.getVersionCount = function () {
        return this.history.length
    }

    // Helper function to get the complete history of the document
    this.getHistory = function () {
        return this.history.map(function (element) {
            return element.getContents()
        })

    }

    // Function to overwrite the contents of the document
    this.overwrite = function (contents) {
        let newVersion = this.document.save(contents)
        this.history.push(newVersion)
    }

    // Function to append new content to the existing contents of the document
    this.append = function (contents) {
        let currentVersion = this.history[this.history.length - 1]
        let newVersion
        if (currentVersion === undefined)
            newVersion = this.document.save(contents)
        else
            newVersion = this.document.save(currentVersion.getContents() + contents)
        this.history.push(newVersion)
    }

    // Function to delete all the contents of the document
    this.delete = function () {
        this.history.push(this.document.save(""))
    }

    // Function to get a particular version of the document
    this.getVersion = function (versionNumber) {
        return this.history[versionNumber - 1]
    }

    // Function to undo the last change
    this.undo = function () {
        let previousVersion = this.history[this.history.length - 2]
        this.document.restore(previousVersion)
        this.history.push(previousVersion)
    }

    // Function to revert the document to a previous version
    this.revertToVersion = function (version) {
        let previousVersion = this.history[version - 1]
        this.document.restore(previousVersion)
        this.history.push(previousVersion)
    }

    // Helper function to get the total word count of the document
    this.getWordCount = function () {
        return this.document.getWordCount()
    }

}

function run() {
    // Create a document
    let blogPost = new Document("")

    // Create a caretaker for the document
    let blogPostManager = new DocumentManager(blogPost)

    // Change #1: Add some text
    blogPostManager.append("Hello World!")
    console.log(blogPostManager.getContents())
    // Output: Hello World!

    // Change #2: Add some more text
    blogPostManager.append(" This is the second entry in the document")
    console.log(blogPostManager.getContents())
    // Output: Hello World! This is the second entry in the document

    // Change #3: Overwrite the document with some new text
    blogPostManager.overwrite("This entry overwrites everything in the document")
    console.log(blogPostManager.getContents())
    // Output: This entry overwrites everything in the document

    // Change #4: Delete the contents of the document
    blogPostManager.delete()
    console.log(blogPostManager.getContents())
    // Empty output

    // Get an old version of the document
    console.log(blogPostManager.getVersion(2).getContents())
    // Output: Hello World!

    // Change #5: Go back to an old version of the document
    blogPostManager.revertToVersion(3)
    console.log(blogPostManager.getContents())
    // Output: Hello World! This is the second entry in the document

    // Get the word count of the current document
    console.log(blogPostManager.getWordCount())
    // Output: 53

    // Change #6: Undo the last change
    blogPostManager.undo()
    console.log(blogPostManager.getContents())
    // Empty output

    // Get the total number of versions for the document
    console.log(blogPostManager.getVersionCount())
    // Output: 7

    // Get the complete history of the document
    console.log(blogPostManager.getHistory())
    /**
     * Output:
     * [
     *   '',
     *   'Hello World!',
     *   'Hello World! This is the second entry in the document',
     *   'This entry overwrites everything in the document',
     *   '',
     *   'Hello World! This is the second entry in the document',
     *   ''
     * ]
     */
}

run()

/**Ventajas del Patrón Memento
Deshacer y rehacer: Facilita la implementación de funciones de deshacer y rehacer, muy útiles en editores y otras aplicaciones donde el usuario puede revertir cambios.
Encapsulamiento de Estado: Permite almacenar el estado sin exponer los detalles de la implementación interna.
Simplicidad en el Manejo de Estado: Al encapsular el estado en un Memento, el objeto original (en este caso, Editor) permanece limpio y centrado en su funcionalidad principal.

Consideraciones
Consumo de Memoria: Almacenar muchos estados puede consumir una cantidad significativa de memoria, especialmente en aplicaciones complejas.
Acceso Restringido: El Caretaker no debería modificar el contenido de un Memento; su responsabilidad es solo guardarlo y restaurarlo. */