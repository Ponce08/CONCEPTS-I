// El patrón de diseño Facade (o Fachada) es un patrón estructural que proporciona una interfaz simplificada a un conjunto de interfaces en un subsistema. Este patrón oculta la complejidad del sistema y facilita su uso, permitiendo a los clientes interactuar con el sistema a través de una interfaz más simple. Es especialmente útil cuando un sistema es complejo y tiene múltiples subsistemas que interactúan entre sí.

// Ejemplo del patrón Facade en JavaScript
// Supongamos que estamos desarrollando una aplicación que interactúa con un sistema de gestión de pedidos. Este sistema tiene varios subsistemas, como el de inventario, envío, y facturación. En lugar de exponer la complejidad de estos subsistemas, creamos una clase PedidoFacade que proporciona una interfaz simple para realizar pedidos.

// Paso 1: Definir los subsistemas
// Creamos las clases para los subsistemas: Inventario, Envio, y Facturacion.

class Inventario {
    verificarDisponibilidad(producto) {
      console.log(`Verificando disponibilidad de ${producto} en inventario...`);
      return true; // Supongamos que siempre hay disponibilidad
    }
  }
  
  class Envio {
    prepararEnvio(pedido) {
      console.log(`Preparando envío para el pedido: ${pedido}.`);
    }
  }
  
  class Facturacion {
    procesarPago(pedido) {
      console.log(`Procesando pago para el pedido: ${pedido}.`);
    }
  }
//   Paso 2: Implementar la fachada
//   Creamos la clase PedidoFacade que interactúa con los subsistemas y proporciona un método sencillo para realizar un pedido.  
class PedidoFacade {
    constructor() {
      this.inventario = new Inventario();
      this.envio = new Envio();
      this.facturacion = new Facturacion();
    }
  
    realizarPedido(producto) {
      if (this.inventario.verificarDisponibilidad(producto)) {
        const pedido = `Pedido de ${producto}`;
        this.facturacion.procesarPago(pedido);
        this.envio.prepararEnvio(pedido);
        console.log(`Pedido ${pedido} realizado con éxito.`);
      } else {
        console.log(`Lo siento, ${producto} no está disponible.`);
      }
    }
  }
//   Paso 3: Usar la fachada
//   Ahora podemos usar la clase PedidoFacade para realizar pedidos de manera sencilla, sin preocuparnos por la complejidad de los subsistemas.  
const pedidoFacade = new PedidoFacade();
pedidoFacade.realizarPedido("Cafetera"); // Realiza el pedido
pedidoFacade.realizarPedido("Taza");      // Realiza el pedido

// Salida esperada en la consola

// Verificando disponibilidad de Cafetera en inventario...
// Procesando pago para el pedido: Pedido de Cafetera.
// Preparando envío para el pedido: Pedido de Cafetera.
// Pedido Pedido de Cafetera realizado con éxito.
// Verificando disponibilidad de Taza en inventario...
// Procesando pago para el pedido: Pedido de Taza.
// Preparando envío para el pedido: Pedido de Taza.
// Pedido Pedido de Taza realizado con éxito.

// Ejemplo 2

// Supongamos que estás intentando crear una tienda online. Tendrá varios componentes y
// una lógica empresarial compleja. En el siguiente ejemplo, encontrarás un pequeño segmento de una tienda online
// ​compuesta en conjunto utilizando el patrón de diseño Facade. En primer lugar, se definen las distintas clases de administrador y de ayuda.

function CartManager() {
    this.getItems = function() {
        // logic to return items
        return []
    }
   
    this.clearCart = function() {
        // logic to clear cart
    }
 }
 
 function InvoiceManager() {
    this.createInvoice = function(items) {
        // logic to create invoice
        return {}
    }
 
    this.notifyCustomerOfFailure = function(invoice) {
        // logic to notify customer
    }
 
    this.updateInvoicePaymentDetails = function(paymentResult) {
        // logic to update invoice after payment attempt
    }
 }
 
 function PaymentProcessor() {
    this.processPayment = function(invoice) {
        // logic to initiate and process payment
        return {}
    }
 }
 
 function WarehouseManager() {
    this.prepareForShipping = function(items, invoice) {
        // logic to prepare the items to be shipped
    }
 }
 
// Aquí es donde entra en juego la fachada. Crea una interfaz adicional sobre tus interfaces
// existentes para definir la lógica empresarial con claridad. Esta interfaz expone
// métodos muy simples y de alto nivel para el entorno de llamada.
 function OnlineStore() {
    this.name = "Online Store"
   
    this.placeOrder = function() {
        let cartManager = new CartManager()
        let items = cartManager.getItems()
 
        let invoiceManager = new InvoiceManager()
        let invoice = invoiceManager.createInvoice(items)
       
        let paymentResult = new PaymentProcessor().processPayment(invoice)
        invoiceManager.updateInvoicePaymentDetails(paymentResult)
 
        if (paymentResult.status === 'success') {
            new WarehouseManager().prepareForShipping(items, invoice)
            cartManager.clearCart()
        } else {
            invoiceManager.notifyCustomerOfFailure(invoice)
        }
       
    }
 }
 
// El entorno de llamada no sabe qué sucede cuando alguien hace clic en un botón para
// realizar el pedido. Puede cambiar fácilmente la lógica empresarial subyacente sin interrumpir
// su entorno de llamada.
 function run() {
    let onlineStore = new OnlineStore()
 
    onlineStore.placeOrder()
 }

//  Ventajas del Patrón Facade
//  Simplicidad: Proporciona una interfaz simple y clara a un sistema complejo.
//  Desacoplamiento: Reduce el acoplamiento entre los subsistemas y el código cliente, lo que hace que sea más fácil modificar o actualizar el sistema.
//  Facilidad de uso: Los clientes no necesitan interactuar con múltiples clases o métodos, lo que mejora la experiencia de desarrollo y reduce la posibilidad de errores.