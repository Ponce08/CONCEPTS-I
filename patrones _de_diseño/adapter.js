// El patrón de diseño Adapter (o Adaptador) es un patrón estructural que permite que clases con interfaces incompatibles trabajen juntas. Funciona como un "traductor" entre dos interfaces diferentes, adaptando una clase para que pueda ser usada como si tuviera una interfaz compatible con otra clase o función.

// En JavaScript, el patrón Adapter es útil cuando tienes un código existente que no quieres o no puedes modificar, pero necesitas que funcione con otro código que espera una interfaz específica.

// Ejemplo del patrón Adapter en JavaScript
// Imaginemos que estamos desarrollando una aplicación de pagos. Tenemos una clase de pagos ya existente, PagoPayPal, y queremos integrarla con un sistema que espera una interfaz específica para manejar pagos. En lugar de modificar PagoPayPal, creamos un adaptador para que funcione con el sistema existente.

// Paso 1: La clase existente
// PagoPayPal es una clase ya implementada que queremos usar, pero su interfaz no coincide con lo que el sistema espera.

class PagoPayPal {
    constructor() {
      this.monto = 0;
    }
  
    setCantidad(cantidad) {
      this.monto = cantidad;
    }
  
    procesarPago() {
      console.log(`Procesando pago de $${this.monto} mediante PayPal.`);
    }
  }
//   Paso 2: La interfaz esperada
//   Supongamos que nuestro sistema espera una interfaz de pago donde el método para realizar un pago es pagar y el método para configurar el monto es configurarMonto.
  
//   Para evitar cambiar el código de PagoPayPal, vamos a crear un adaptador.
  
//   Paso 3: Implementar el adaptador
//   El adaptador AdaptadorPagoPayPal implementa la interfaz esperada por el sistema y traduce las llamadas a los métodos de PagoPayPal de manera que funcione con el sistema actual.  
class AdaptadorPagoPayPal {
    constructor() {
      this.pagoPayPal = new PagoPayPal(); // Creamos una instancia de la clase que queremos adaptar
    }
  
    configurarMonto(cantidad) {
      // Adaptamos el método setCantidad para que funcione con el nombre configurarMonto
      this.pagoPayPal.setCantidad(cantidad);
    }
  
    pagar() {
      // Adaptamos el método procesarPago para que funcione con el nombre pagar
      this.pagoPayPal.procesarPago();
    }
  }
//   Paso 4: Uso del adaptador en el sistema
//   Ahora, en lugar de usar PagoPayPal directamente, utilizamos AdaptadorPagoPayPal, que implementa la interfaz esperada. 
// El sistema espera un objeto con los métodos configurarMonto y pagar
const pago = new AdaptadorPagoPayPal();

pago.configurarMonto(100); // Configuramos el monto a través del adaptador
pago.pagar(); // Procesamos el pago a través del adaptador

// Salida esperada en la consola:
// Output...
// Procesando pago de $100 mediante PayPal.

// Ejemplo 2

// Old bot
function Robot() {

    this.walk = function(numberOfSteps) {
        // code to make the robot walk
        console.log("walked " + numberOfSteps + " steps")
    }
 
    this.sit = function() {
        // code to make the robot sit
        console.log("sit")
    }
 
 }
 
 // New bot that does not have the walk function anymore
 // but instead has functions to control each step independently
 function AdvancedRobot(botName) {
    // the new bot has a name as well
    this.name = botName
 
    this.sit = function() {
        // code to make the robot sit
        console.log("sit")
    }
 
    this.rightStepForward = function() {
        // code to take 1 step from right leg forward
        console.log("right step forward")
    }
 
    this.leftStepForward = function () {
        // code to take 1 step from left leg forward
        console.log("left step forward")
    }
 }
 
 function RobotAdapter(botName) {
    // No references to the old interfact since that is usually
    // phased out of development
    const robot = new AdvancedRobot(botName)
 
    // The adapter defines the walk function by using the
    // two step controls. You now have room to choose which leg to begin/end with,
    // and do something at each step.
    this.walk = function(numberOfSteps) {
        for (let i=0; i<numberOfSteps; i++) {
           
            if (i % 2 === 0) {
                robot.rightStepForward()
            } else {
                robot.leftStepForward()
            }
        }
    }
 
    this.sit = robot.sit
 
 }
 
 function run() {
 
    let robot = new Robot()
 
    robot.sit()
    // Output: sit
    robot.walk(5)
    // Output: walked 5 steps
 
    robot = new RobotAdapter("my bot")
 
    robot.sit()
    // Output: sit
    robot.walk(5)
    // Output:
    // right step forward
    // left step forward
    // right step forward
    // left step forward
    // right step forward
 
 }
 
 run()

//  Ventajas del Patrón Adapter
// Reutilización de código: Permite usar clases existentes sin necesidad de modificar su código.
// Flexibilidad: Se pueden adaptar clases de distintas interfaces para trabajar en conjunto sin cambiar sus implementaciones originales.
// Desacoplamiento: El adaptador actúa como intermediario, lo que permite que el código cliente esté desacoplado de implementaciones específicas.
