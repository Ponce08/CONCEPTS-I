// En TypeScript, los decoradores y la metaprogramación son características avanzadas que permiten a los desarrolladores modificar o extender el comportamiento de clases, métodos, propiedades y parámetros de manera declarativa. Estas herramientas ofrecen una gran flexibilidad en el diseño de aplicaciones, especialmente en contextos de programación orientada a objetos, y son fundamentales en frameworks como Angular.

// 1. Decoradores en TypeScript
// Los decoradores son una forma de agregar funcionalidades o modificar el comportamiento de clases y miembros de clases mediante anotaciones. Funcionan como una capa adicional que envuelve o modifica la definición de una clase, método, propiedad o parámetro.

// Tipos de Decoradores
// TypeScript ofrece varios tipos de decoradores:

// Decoradores de Clases: Aplicados a clases para extender o modificar su comportamiento.
// Decoradores de Métodos: Aplicados a métodos dentro de clases.
// Decoradores de Propiedades: Aplicados a propiedades de clases.
// Decoradores de Parámetros: Aplicados a parámetros de métodos dentro de clases.
// Para habilitar los decoradores en un proyecto TypeScript, debes configurar el archivo tsconfig.json con "experimentalDecorators": true.
/** 
**      {
**          "compilerOptions": {
**            "experimentalDecorators": true
**          }
**      }
*/ 

// Ejemplo de Decorador de Clase
// Un decorador de clase recibe como parámetro el constructor de la clase y permite modificar o extender su funcionalidad. En el siguiente ejemplo, se crea un decorador que agrega una propiedad estática createdAt a una clase:
function Timestamped(constructor: Function) {
    constructor.prototype.createdAt = new Date();
  }
  
  @Timestamped
  class Usuario {
    nombre: string;
    constructor(nombre: string) {
      this.nombre = nombre;
    }
  }
  
  const user = new Usuario("Juan");
//   console.log(user.createdAt); // Muestra la fecha y hora de creación

// Ejemplo de Decorador de Método
// Un decorador de método permite modificar o interceptar la ejecución de un método. Este tipo de decorador recibe tres parámetros: el objeto prototipo de la clase, el nombre del método y una descripción del método.
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]) {
      console.log(`Llamando ${propertyKey} con argumentos: ${JSON.stringify(args)}`);
      return originalMethod.apply(this, args);
    };
  }
  
  class MathOperations {
    // @logMethod
    add(a: number, b: number): number {
      return a + b;
    }
  }
  
  const math = new MathOperations();
  math.add(2, 3); // Consola: Llamando add con argumentos: [2,3]


//   2. Metaprogramación en TypeScript
//   La metaprogramación es una técnica en la que el programa tiene la capacidad de analizar o modificar su propio código durante la ejecución. En TypeScript, la metaprogramación es posible gracias al uso de decoradores y herramientas de reflexión.
  
//   La reflexión permite acceder a metadatos sobre el programa en tiempo de ejecución, como el nombre de clases, métodos, propiedades y tipos de datos. En TypeScript, se puede utilizar la biblioteca reflect-metadata para trabajar con metadatos y hacer metaprogramación más avanzada.
  
//   Uso de Reflect Metadata
//   La biblioteca reflect-metadata se usa para almacenar y recuperar metadatos en clases y propiedades. Esto es útil en escenarios donde necesitamos hacer validaciones o inyecciones de dependencias en tiempo de ejecución.
  
//   Instala la biblioteca:
/**npm install reflect-metadata */

// Configura TypeScript para permitir la emisión de metadatos con "emitDecoratorMetadata": true en el archivo tsconfig.json.
/**
**      {
**        "compilerOptions": {
**          "experimentalDecorators": true,
**          "emitDecoratorMetadata": true
**        }
**      }
 */
  
// Ejemplo de Decoradores y Metadatos
// Usando reflect-metadata, podemos almacenar y recuperar metadatos de una propiedad o método en tiempo de ejecución.  

//**         import "reflect-metadata";

//**         function Required(target: any, propertyKey: string) {
//**           Reflect.defineMetadata("required", true, target, propertyKey);
//**         }


//**         function validate(obj: any): boolean {
//**           for (let key in obj) {
//**             const isRequired = Reflect.getMetadata("required", obj, key);
//**             if (isRequired && obj[key] === undefined) {
//**               console.log(`Error: La propiedad ${key} es obligatoria`);
//**               return false;
//**             }
//**           }
//**           return true;
//**         }

//**         class Persona {
//**           @Required
//**           nombre: string;

//**           constructor(nombre?: string) {
//**             this.nombre = nombre;
//**           }
//**         }

//**         const persona = new Persona();
//**         validate(persona); // Consola: Error: La propiedad nombre es obligatoria

// En este ejemplo:
// El decorador @Required establece un metadato en la propiedad nombre utilizando Reflect.defineMetadata.
// La función validate revisa los metadatos de las propiedades del objeto y lanza un error si alguna propiedad marcada como "obligatoria" (required) no tiene valor.
