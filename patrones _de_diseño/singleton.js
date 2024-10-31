// El patrón de diseño Singleton es un patrón creacional que asegura que una clase tenga una única instancia y proporciona un punto de acceso global a esa instancia. En JavaScript, se utiliza cuando queremos que una clase tenga solo una instancia en toda la aplicación, como cuando se maneja una conexión de base de datos o se almacena una configuración global que no debe duplicarse.

// Ejemplo del patrón Singleton en JavaScript
// En este ejemplo, crearemos una clase Configuracion que almacena configuraciones globales para nuestra aplicación. Queremos asegurarnos de que solo exista una instancia de Configuracion, sin importar cuántas veces intentemos crearla.

// Implementación básica del Singleton
// Para crear un Singleton, utilizamos una propiedad estática que guarda la instancia única de la clase. Si ya existe una instancia, el método constructor devolverá esa instancia en lugar de crear una nueva.

class Configuracion {
    constructor(tema, lenguaje) {
      if (Configuracion.instancia) {
        return Configuracion.instancia;
      }
  
      this.tema = tema;
      this.lenguaje = lenguaje;
      Configuracion.instancia = this; // Guardamos la instancia en una propiedad estática
    }
  
    // Método para mostrar la configuración actual
    mostrarConfiguracion() {
      console.log(`Tema: ${this.tema}, Lenguaje: ${this.lenguaje}`);
    }
  
    // Método para cambiar la configuración
    cambiarConfiguracion(tema, lenguaje) {
      this.tema = tema;
      this.lenguaje = lenguaje;
    }
  }
  
  // Intentamos crear dos instancias de Configuracion
  const config1 = new Configuracion("oscuro", "español");
  config1.mostrarConfiguracion(); // Tema: oscuro, Lenguaje: español
  
  const config2 = new Configuracion("claro", "inglés");
  config2.mostrarConfiguracion(); // Tema: oscuro, Lenguaje: español
  
  // Verificamos si ambas instancias son iguales
  console.log(config1 === config2); // true

// Ventajas del Patrón Singleton
// •	Consistencia global: Al tener una sola instancia, se puede compartir y gestionar el estado de manera centralizada.
// •	Ahorro de memoria: Al evitar crear múltiples instancias, ahorra recursos, especialmente en aplicaciones grandes.
// •	Fácil acceso: Como el Singleton tiene un único punto de acceso, es fácil obtener y manipular la misma instancia desde cualquier parte de la aplicación.

// Variación con el patrón de Módulo
// En JavaScript, también es común implementar el patrón Singleton usando módulos. Al exportar un objeto o instancia única desde un módulo, garantizamos que siempre se utilizará la misma instancia en toda la aplicación.

// config.js
const Configuracion = (() => {
    let instancia;
  
    function crearInstancia() {
      return {
        tema: "oscuro",
        lenguaje: "español",
      };
    }
  
    return {
      getInstancia: () => {
        if (!instancia) {
          instancia = crearInstancia();
        }
        return instancia;
      },
    };
  })();
  
  export default Configuracion;

// Luego, en cualquier otro archivo donde necesitemos la configuración, simplemente importamos Configuracion y accedemos a la misma instancia:

// // main.js
// import Configuracion from "./config.js";

// const config1 = Configuracion.getInstancia();
// console.log(config1); // { tema: 'oscuro', lenguaje: 'español' }

// const config2 = Configuracion.getInstancia();
// console.log(config1 === config2); // true, misma instancia



