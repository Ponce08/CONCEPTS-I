// El patrón de diseño Strategy es un patrón de comportamiento que permite definir una familia de algoritmos o estrategias, encapsularlas en clases separadas y hacerlas intercambiables. De esta manera, se puede cambiar la estrategia o algoritmo utilizado en tiempo de ejecución sin modificar el código del cliente.

// Este patrón es útil cuando se tienen varias maneras de realizar una tarea, y se quiere elegir cuál aplicar en un momento específico.

// Ejemplo del patrón Strategy en JavaScript
// Supongamos que tenemos una tienda en línea que calcula los costos de envío en función de varias estrategias de envío (por ejemplo, envío estándar, exprés y gratis). La elección de la estrategia depende de ciertos criterios (por ejemplo, la ubicación o preferencia del cliente).

// Paso 1: Crear las estrategias (algoritmos de cálculo)
// Creamos diferentes clases para cada estrategia de envío, cada una con su propio método calcular. Cada estrategia implementa el mismo método, permitiendo que sean intercambiables.

// Estrategia de envío estándar
class EnvioEstandar {
    calcular(costoBase) {
      return costoBase + 5; // Agrega una tarifa fija de $5
    }
  }
  
  // Estrategia de envío exprés
  class EnvioExpres {
    calcular(costoBase) {
      return costoBase + 10; // Agrega una tarifa fija de $10
    }
  }
  
  // Estrategia de envío gratis
  class EnvioGratis {
    calcular(costoBase) {
      return costoBase; // No se agrega tarifa adicional
    }
  }
//   Paso 2: Crear el contexto (Clase Pedido)
//   El contexto es la clase Pedido, que utilizará una estrategia de envío. Esta clase permite configurar la estrategia y calcular el costo final del envío usando esa estrategia.  
class Pedido {
    constructor(costoBase) {
      this.costoBase = costoBase; // Precio base del pedido
      this.estrategiaEnvio = null; // Estrategia que se aplicará
    }
  
    // Configura la estrategia de envío
    setEstrategia(estrategiaEnvio) {
      this.estrategiaEnvio = estrategiaEnvio;
    }
  
    // Calcula el costo de envío basado en la estrategia actual
    calcularEnvio() {
      if (!this.estrategiaEnvio) {
        throw new Error("Por favor, selecciona una estrategia de envío.");
      }
      return this.estrategiaEnvio.calcular(this.costoBase);
    }
  }
//   Paso 3: Usar el patrón Strategy
//   Creamos una instancia de Pedido, configuramos diferentes estrategias de envío y calculamos el costo final para cada una. 
// Crear un pedido con un costo base de $50
const pedido = new Pedido(50);

// Usar estrategia de envío estándar
pedido.setEstrategia(new EnvioEstandar());
console.log("Costo de envío estándar:", pedido.calcularEnvio()); // Salida: 55

// Usar estrategia de envío exprés
pedido.setEstrategia(new EnvioExpres());
console.log("Costo de envío exprés:", pedido.calcularEnvio()); // Salida: 60

// Usar estrategia de envío gratis
pedido.setEstrategia(new EnvioGratis());
console.log("Costo de envío gratis:", pedido.calcularEnvio()); // Salida: 50

// Salida esperada en la consola:

/**
Costo de envío estándar: 55
Costo de envío exprés: 60
Costo de envío gratis: 50
 */

// Ejemplo 2

// The strategy class that can encapsulate all hosting providers
function HostingProvider() {
    // store the provider
    this.provider = ""
 
    // set the provider
    this.setProvider = function(provider) {
        this.provider = provider
    }
 
    // set the website configuration for which each hosting provider would calculate costs
    this.setConfiguration = function(configuration) {
        this.configuration = configuration
    }
 
    // the generic estimate method that calls the provider's unique methods to calculate the costs
    this.estimateMonthlyCost = function() {
        return this.provider.estimateMonthlyCost(this.configuration)
    }
 }
 
 // Foo Hosting charges for each second and KB of hosting usage
 function FooHosting (){
    this.name = "FooHosting"
    this.rate = 0.0000027
 
    this.estimateMonthlyCost = function(configuration){
        return configuration.duration * configuration.workloadSize * this.rate
    }
 }
 
 // Bar Hosting charges per minute instead of seconds
 function BarHosting (){
    this.name = "BarHosting"
    this.rate = 0.00018
 
    this.estimateMonthlyCost = function(configuration){
        return configuration.duration / 60 * configuration.workloadSize * this.rate
    }
 }
 
 // Baz Hosting assumes the average workload to be of 10 MB in size
 function BazHosting (){
    this.name = "BazHosting"
    this.rate = 0.032
 
    this.estimateMonthlyCost = function(configuration){
        return configuration.duration * this.rate
    }
 }
 
 function run() {
 
    // Create a website configuration for a website that is up for 24 hours and takes 10 MB of hosting space
    let workloadConfiguration = {
        duration: 84700,
        workloadSize: 10240
    }
 
    // Create the hosting provider instances
    let fooHosting = new FooHosting()
    let barHosting = new BarHosting()
    let bazHosting = new BazHosting()
 
    // Create the instance of the strategy class
    let hostingProvider = new HostingProvider()
 
    // Set the configuration against which the rates have to be calculated
    hostingProvider.setConfiguration(workloadConfiguration)
 
    // Set each provider one by one and print the rates
    hostingProvider.setProvider(fooHosting)
    console.log("FooHosting cost: " + hostingProvider.estimateMonthlyCost())
    // Output: FooHosting cost: 2341.7856
 
    hostingProvider.setProvider(barHosting)
    console.log("BarHosting cost: " + hostingProvider.estimateMonthlyCost())
    // Output: BarHosting cost: 2601.9840
 
    hostingProvider.setProvider(bazHosting)
    console.log("BarHosting cost: " + hostingProvider.estimateMonthlyCost())
    // Output: BarHosting cost: 2710.4000
 
 }
 
 run()

//  Ventajas del Patrón Strategy
//  Flexibilidad: Permite cambiar el comportamiento de una clase de manera dinámica y en tiempo de ejecución.
//  Desacoplamiento: La lógica de cada estrategia se encuentra en clases separadas, por lo que el código del contexto permanece limpio y más mantenible.
//  Facilidad de ampliación: Se pueden añadir nuevas estrategias sin modificar el código del cliente o de las clases de estrategia existentes.

//  Desventajas del Patrón Strategy
//  Complejidad: Puede aumentar la complejidad del sistema si se tienen muchas estrategias, ya que se deben crear múltiples clases para cada algoritmo.
//  Sobrecarga de contexto: El contexto debe ser consciente de las diferentes estrategias disponibles, lo que puede requerir lógica adicional para seleccionar la estrategia correcta.