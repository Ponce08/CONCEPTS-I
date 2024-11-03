// En TypeScript, Control de Flujo y Narrowing son conceptos clave que permiten al compilador refinar el tipo de una variable a lo largo de diferentes caminos de ejecución. Estas características mejoran la seguridad del código al ayudar a prevenir errores de tipo y permitir al programador tener un mejor control sobre los tipos en diferentes contextos.

// 1. Control de Flujo de Tipos
// El Control de Flujo de Tipos en TypeScript analiza cómo los tipos de las variables cambian en el transcurso del código en función de las verificaciones y las ramas de ejecución. Esto es especialmente útil cuando se trabaja con tipos union o any, porque permite que TypeScript entienda el tipo más específico de una variable en cada parte del flujo.

// Ejemplo de control de flujo:
function printValue(value: string | number) {
    if (typeof value === 'string') {
      // Aquí TypeScript sabe que `value` es un string
      console.log("String value: " + value.toUpperCase());
    } else {
      // Aquí TypeScript sabe que `value` es un número
      console.log("Number value: " + (value * 2));
    }
  }
//   En este ejemplo:
//   TypeScript verifica el tipo de value con typeof.
//   Dentro de cada rama (if y else), el compilador entiende el tipo específico de value, permitiendo el uso de métodos y operaciones adecuadas para cada tipo.


//   2. Narrowing
//   Narrowing (o "estrechamiento de tipo") es el proceso mediante el cual TypeScript reduce o "estrecha" el tipo de una variable a un subconjunto más específico. Esto ocurre a través de varias técnicas de control de flujo, como:
  
//   Type Guards (guardas de tipo): verificaciones explícitas de tipo (typeof, instanceof, entre otros).
//   Cheques de igualdad: comparaciones que determinan qué tipo tiene una variable.
//   Cheques de presencia: comprobaciones que verifican si un valor es null o undefined.
//   Cheques personalizados: guardas de tipo personalizadas mediante funciones.
//   Ejemplo de Narrowing con instanceof y cheques de igualdad: 
class Dog {
    bark() {
      console.log("Woof!");
    }
  }
  
  class Cat {
    meow() {
      console.log("Meow!");
    }
  }
  
  function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
      animal.bark(); // TypeScript sabe que `animal` es de tipo `Dog`
    } else {
      animal.meow(); // TypeScript sabe que `animal` es de tipo `Cat`
    }
  }
//   En este caso:
//   Usamos instanceof para determinar si animal es un Dog o un Cat.
//   TypeScript "estrecha" el tipo de animal en cada rama, permitiendo que usemos métodos específicos (bark o meow).


//   Otros ejemplos de Narrowing
//   TypeScript también admite otras técnicas de Narrowing, como verificar si una variable no es null o undefined:  
function process(input: string | null | undefined) {
    if (input) {
      // Aquí `input` es seguro de usar como `string`, no es ni `null` ni `undefined`
      console.log(input.toUpperCase());
    } else {
      console.log("No hay valor proporcionado.");
    }
  }

//   Narrowing con guardas de tipo personalizadas
//   Es posible definir funciones que actúen como guardas de tipo personalizadas para realizar Narrowing, usando input is Type:  
function isDog(animal: Dog | Cat): animal is Dog {
    return (animal as Dog).bark !== undefined;
  }
  
  function makeSound2(animal: Dog | Cat) {
    if (isDog(animal)) {
      animal.bark();
    } else {
      animal.meow();
    }
  }
//   En este ejemplo:

// La función isDog verifica si animal es un Dog.
// TypeScript usa esta información en el flujo de control para determinar el tipo de animal.
  

// Los User-defined type guards o guardas de tipo definidas por el usuario en TypeScript son funciones personalizadas que permiten a TypeScript refinar el tipo de una variable en función de una verificación específica. Estas guardas de tipo ayudan al compilador a entender qué tipo exacto tiene una variable después de una comprobación personalizada, mejorando la precisión de tipos y facilitando el trabajo con tipos union.

// ¿Cómo funcionan los User-defined Type Guards?
// Una guarda de tipo definida por el usuario es una función que realiza una comprobación y devuelve un valor booleano, indicando si el argumento cumple con cierto tipo. La clave es la sintaxis especial en el tipo de retorno de la función, param is Type, donde param es el nombre del parámetro y Type es el tipo específico que queremos verificar. Esto le dice a TypeScript que, si la función retorna true, el parámetro es del tipo Type.

// Ejemplo básico de un User-defined Type Guard
// Supongamos que tenemos dos clases: Perro y Gato. Queremos crear una función que verifique si un objeto es una instancia de Perro.
class Perro {
    ladrar() {
      console.log("¡Guau!");
    }
  }
  
  class Gato {
    maullar() {
      console.log("¡Miau!");
    }
  }
  
  // Guarda de tipo personalizada
  function esPerro(animal: Perro | Gato): animal is Perro {
    return (animal as Perro).ladrar !== undefined;
  }
  
  // Usando la guarda de tipo
  function hacerSonido(animal: Perro | Gato) {
    if (esPerro(animal)) {
      animal.ladrar(); // Aquí TypeScript sabe que `animal` es de tipo `Perro`
    } else {
      animal.maullar(); // Aquí TypeScript sabe que `animal` es de tipo `Gato`
    }
  }
//   En este ejemplo:
//   esPerro es una guarda de tipo definida por el usuario.
//   La sintaxis animal is Perro en el tipo de retorno le indica a TypeScript que, si esPerro devuelve true, animal es de tipo Perro.
//   Dentro de la función hacerSonido, al llamar esPerro(animal), TypeScript ajusta el tipo de animal según el resultado:
//   Si es true, trata animal como un Perro.
//   Si es false, trata animal como un Gato.


//   ¿Cuándo usar User-defined Type Guards?
//   Las guardas de tipo definidas por el usuario son útiles cuando:
//   Trabajas con tipos union y necesitas refinar el tipo dentro de diferentes ramas de código.
//   Tipos complejos: cuando los tipos no se pueden verificar fácilmente con operadores de tipo nativos como typeof o instanceof.
//   Interfaces: cuando quieres verificar si un objeto cumple con una interfaz específica (que TypeScript normalmente no puede inferir automáticamente).


//   Ejemplo con interfaces
//   Si estás trabajando con interfaces en lugar de clases, puedes usar guardas de tipo para identificar si un objeto cumple con una interfaz específica. 
interface Coche {
    conducir(): void;
  }
  
  interface Barco {
    navegar(): void;
  }
  
  function esCoche(vehiculo: Coche | Barco): vehiculo is Coche {
    return (vehiculo as Coche).conducir !== undefined;
  }
  
  function moverVehiculo(vehiculo: Coche | Barco) {
    if (esCoche(vehiculo)) {
      vehiculo.conducir(); // TypeScript sabe que `vehiculo` es de tipo `Coche`
    } else {
      vehiculo.navegar(); // TypeScript sabe que `vehiculo` es de tipo `Barco`
    }
  }
//   En este caso:
//   La función esCoche verifica si vehiculo es un Coche verificando si el método conducir está definido.
//   Esto permite a TypeScript saber dentro de moverVehiculo qué métodos están disponibles en vehiculo dependiendo del tipo.  