// El patrón de diseño Proxy permite actuar como un intermediario para otro objeto, controlando el acceso a él. Este patrón es útil cuando se necesita realizar operaciones como la creación de objetos pesados, la protección de acceso a objetos sensibles, o la implementación de funcionalidades como el caching y la lazy loading.

// En JavaScript, puedes implementar el patrón Proxy para gestionar el acceso a un objeto, añadiendo una capa de lógica adicional antes de delegar en el objeto real.

// Ejemplo: Proxy para una API
// Supongamos que estás desarrollando un proyecto en el que necesitas acceder a una API externa, pero quieres controlar el acceso a la misma para incluir funciones de caching y manejo de errores.

// Paso 1: Crear el Objeto Real
// Primero, definimos un objeto que simule una API. Este objeto tendrá un método que realiza una llamada (simulada) y devuelve datos.

class ApiService {
    fetchData() {
        console.log("Llamando a la API...");
        // Simulación de datos que serían devueltos por la API
        return { data: "Datos de la API" };
    }
}
// Paso 2: Crear el Proxy
// A continuación, creamos un Proxy que controla el acceso a ApiService. Este proxy manejará el caching y la gestión de errores.
class ApiServiceProxy {
    constructor() {
        this.apiService = new ApiService();
        this.cache = {};
    }

    fetchData() {
        if (this.cache["data"]) {
            console.log("Devuelto desde cache:", this.cache["data"]);
            return this.cache["data"];
        }
        
        try {
            const result = this.apiService.fetchData();
            this.cache["data"] = result;
            return result;
        } catch (error) {
            console.error("Error al llamar a la API:", error);
        }
    }
}
// Ahora podemos utilizar el proxy para acceder a la API. Si llamamos a fetchData varias veces, notaremos que la llamada a la API solo se realiza una vez, gracias al caching.
const apiProxy = new ApiServiceProxy();

console.log(apiProxy.fetchData()); // Llamando a la API... { data: "Datos de la API" }
console.log(apiProxy.fetchData()); // Devuelto desde cache: { data: "Datos de la API" }

// Salida esperada:

/**
Llamando a la API...
{ data: "Datos de la API" }
Devuelto desde cache: { data: "Datos de la API" }
 */

// Ejemplo 2

function DatabaseHandler() {
    const data = {}
 
    this.set = function (key, val) {
        data[key] = val;
    }
    this.get = function (key, val) {
        return data[key]
    }
    this.remove = function (key) {
        data[key] = null;
    }
 
 
 }
 
 function DatabaseProxy(databaseInstance) {
 
    this.set = function (key, val) {
        if (key === "") {
            console.log("Invalid input")
            return
        }
 
        if (val === undefined) {
            console.log("Setting value to undefined not allowed!")
            return
        }
 
        databaseInstance.set(key, val)
    }
 
    this.get = function (key) {
        if (databaseInstance.get(key) === null) {
            console.log("Element deleted")
        }
 
        if (databaseInstance.get(key) === undefined) {
            console.log("Element not created")
        }
 
        return databaseInstance.get(key)
    }
 
    this.remove = function (key) {
        if (databaseInstance.get(key) === undefined) {
            console.log("Element not added")
            return
        }
 
        if (databaseInstance.get(key) === null) {
            console.log("Element removed already")
            return
        }
 
        return databaseInstance.remove(key)
    }
 
 }
 
 function run() {
    let databaseInstance = new DatabaseHandler()
 
    databaseInstance.set("foo,", "bar")
    databaseInstance.set("foo,", undefined)
    console.log("#1: " + databaseInstance.get("foo"))
    // #1: undefined
 
    console.log("#2: " + databaseInstance.get("baz"))
    // #2: undefined
 
    databaseInstance.set(",", "something")
 
    databaseInstance.remove("foo")
    console.log("#3: " + databaseInstance.get("foo"))
    // #3: null
 
    databaseInstance.remove("foo")
    databaseInstance.remove("baz")
 
    // Create a fresh database instance to try the same operations
    // using the proxy
    databaseInstance = new DatabaseHandler()
    let proxy = new DatabaseProxy(databaseInstance)
 
    proxy.set("foo,", "bar")
    proxy.set("foo,", undefined)
    // Proxy jumps in:
    // Output: Setting value to undefined not allowed!
 
    console.log("#1: " + proxy.get("foo"))
    // Original value is retained:
    // Output: #1: bar
 ,
    console.log("#2: " + proxy.get("baz"))
    // Proxy jumps in again
    // Output:
    // Element not created
    // #2: undefined
 
 
    proxy.set(",", "something")
    // Proxy jumps in again
    // Output: Invalid input
 
    proxy.remove("foo")
 
    console.log("#3: " + proxy.get("foo"))
    // Proxy jumps in again
    // Output:
    // Element deleted
    // #3: null
 
    proxy.remove("foo")
    // Proxy output: Element removed already
    proxy.remove("baz")
    // Proxy output: Element not added
 
 }
 
 run()

/**Ventajas del Patrón Proxy
Control de Acceso: Permite controlar el acceso a un objeto, añadiendo lógica adicional como autenticación o autorización.
Optimización: Puede ayudar a optimizar el rendimiento mediante el uso de caching o lazy loading.
Desacoplamiento: Aísla la lógica de negocio del manejo de la interacción con el objeto real, lo que facilita la mantenibilidad y extensibilidad del código. */