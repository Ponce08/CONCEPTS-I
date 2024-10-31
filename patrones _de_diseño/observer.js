// El patrón de diseño Observer (u Observador) es un patrón de comportamiento que permite que un objeto (denominado Sujeto o Subject) notifique automáticamente a otros objetos (denominados Observadores o Observers) sobre cualquier cambio en su estado. Este patrón es ideal cuando un objeto necesita notificar a múltiples objetos acerca de un cambio, sin que estos estén acoplados directamente.

// Es común en sistemas de suscripción/publicación y es ampliamente utilizado en aplicaciones de interfaz gráfica, comunicación de componentes y programación reactiva.

// Ejemplo del Patrón Observer en JavaScript
// Imaginemos un ejemplo simple de un sistema de noticias. Tenemos un Sujeto (Noticias) que representa una fuente de noticias, y varios Observadores (Lector) que están suscritos para recibir las últimas noticias cuando se publican.

// Paso 1: Crear la clase Sujeto (Noticias)
// La clase Noticias tiene métodos para agregar y remover observadores, así como para notificarlos cada vez que haya una noticia nueva.

class Noticias {
    constructor() {
      this.observadores = []; // Lista de observadores suscritos
    }
  
    // Agrega un observador
    agregarObservador(observador) {
      this.observadores.push(observador);
    }
  
    // Elimina un observador
    eliminarObservador(observador) {
      this.observadores = this.observadores.filter(obs => obs !== observador);
    }
  
    // Notifica a todos los observadores sobre la noticia
    notificarObservadores(noticia) {
      this.observadores.forEach(observador => observador.actualizar(noticia));
    }
  
    // Publica una noticia nueva y notifica a los observadores
    publicarNoticia(noticia) {
      console.log(`Noticia publicada: ${noticia}`);
      this.notificarObservadores(noticia);
    }
  }
//   Paso 2: Crear la clase Observador (Lector)
//   Cada Lector representa un observador que quiere recibir las noticias publicadas. Esta clase debe implementar un método actualizar, que será llamado cuando haya nuevas noticias.
class Lector {
    constructor(nombre) {
      this.nombre = nombre;
    }
  
    // Método para recibir la actualización de noticias
    actualizar(noticia) {
      console.log(`${this.nombre} recibió la noticia: ${noticia}`);
    }
  }
//   Paso 3: Usar el patrón Observer
//   Creamos una instancia de Noticias, agregamos varios Lectores como observadores y publicamos algunas noticias. Cada lector recibirá la notificación automáticamente.  
// Crear instancia del sujeto Noticias
const canalNoticias = new Noticias();

// Crear instancias de observadores (lectores)
const lector1 = new Lector("Alice");
const lector2 = new Lector("Bob");
const lector3 = new Lector("Charlie");

// Suscribir lectores al canal de noticias
canalNoticias.agregarObservador(lector1);
canalNoticias.agregarObservador(lector2);
canalNoticias.agregarObservador(lector3);

// Publicar noticias
canalNoticias.publicarNoticia("Nuevo récord en el mercado de criptomonedas.");
canalNoticias.publicarNoticia("Descubrimiento científico sobre Marte.");

// Salida esperada en la consola

/**
Noticia publicada: Nuevo récord en el mercado de criptomonedas.
Alice recibió la noticia: Nuevo récord en el mercado de criptomonedas.
Bob recibió la noticia: Nuevo récord en el mercado de criptomonedas.
Charlie recibió la noticia: Nuevo récord en el mercado de criptomonedas.
Noticia publicada: Descubrimiento científico sobre Marte.
Alice recibió la noticia: Descubrimiento científico sobre Marte.
Bob recibió la noticia: Descubrimiento científico sobre Marte.
Charlie recibió la noticia: Descubrimiento científico sobre Marte.
 */

// Ejemplo 2

// The newsletter class that can send out posts to its subscribers
function Newsletter() {
    // Maintain a list of subscribers
    this.subscribers = []
 
    // Subscribe a reader by adding them to the subscribers' list
    this.subscribe = function(subscriber) {
        this.subscribers.push(subscriber)
    }
 
    // Unsubscribe a reader by removing them from the subscribers' list
    this.unsubscribe = function(subscriber) {
        this.subscribers = this.subscribers.filter(
            function (element) {
                if (element !== subscriber) return element
            }
        )
    }
 
    // Publish a post by calling the receive function of all subscribers
    this.publish = function(post) {
        this.subscribers.forEach(function(element) {
            element.receiveNewsletter(post)
        })
    }
 }
 
 // The reader class that can subscribe to and receive updates from newsletters
 function Reader(name) {
    this.name = name
 
    this.receiveNewsletter = function(post) {
        console.log("Newsletter received by " + name + "!: " + post)
    }
 
 }
 
 function run() {
    // Create two readers
    let rick = new Reader("ed")
    let morty = new Reader("morty")
 
    // Create your newsletter
    let newsletter = new Newsletter()
 
    // Subscribe a reader to the newsletter
    newsletter.subscribe(rick)
 
    // Publish the first post
    newsletter.publish("This is the first of the many posts in this newsletter")
    /**
     * Output:
     * Newsletter received by ed!: This is the first of the many posts in this newsletter
     */
 
    // Subscribe another reader to the newsletter
    newsletter.subscribe(morty)
 
    // Publish the second post
    newsletter.publish("This is the second of the many posts in this newsletter")
    /**
     * Output:
     * Newsletter received by ed!: This is the second of the many posts in this newsletter
     * Newsletter received by morty!: This is the second of the many posts in this newsletter
     */
 
    // Unsubscribe the first reader
    newsletter.unsubscribe(rick)
 
    // Publish the third post
    newsletter.publish("This is the third of the many posts in this newsletter")
    /**
     * Output:
     * Newsletter received by morty!: This is the third of the many posts in this newsletter
     */
 
 }
 
 run()

/**Ventajas del Patrón Observer
Desacoplamiento: El sujeto no necesita conocer los detalles de los observadores, solo se asegura de notificar a todos los suscritos.
Escalabilidad: Se pueden agregar o quitar observadores sin modificar el sujeto.
Automatización de cambios: Los observadores se mantienen actualizados de forma automática sin intervención directa.

Desventajas del Patrón Observer
Posible alto consumo de recursos: Si hay muchos observadores, pueden consumir recursos al recibir actualizaciones constantemente.
Dificultad de depuración: La relación de notificación entre sujeto y observadores puede hacer el sistema más complejo y difícil de depurar. */