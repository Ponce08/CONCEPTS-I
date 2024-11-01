// En TypeScript, los tipos (types) y interfaces (interfaces) son herramientas clave para definir la forma y estructura de los datos. Ambos te permiten describir cómo debería verse un objeto, pero tienen algunas diferencias en funcionalidad y uso. Vamos a explorarlos en detalle.

// 1. Tipos (type)
// Un type es una forma de definir un alias para un tipo de datos. Puedes usar type para definir tipos primitivos, tipos de unión, tipos complejos, y tipos específicos de objetos.

// Ejemplo de uso de type:
// Definir un tipo para un objeto
type User = {
    id: number;
    name: string;
    isAdmin?: boolean; // Campo opcional
  };
  
  // Definir un tipo de unión
  type ID = string | number;
  
  // Usar los tipos
  const userId: ID = "123"; // válido
  const user: User = { id: 1, name: "Alice" }; // válido
//   Los types son versátiles y permiten construir tipos complejos combinando otros tipos (por ejemplo, mediante uniones y combinaciones).

// 2. Interfaces (interface)
// Una interface define la estructura de un objeto. Es especialmente útil cuando estás trabajando en la creación de APIs y objetos que representan datos estructurados, ya que ofrece características adicionales, como la posibilidad de extender otras interfaces.

// Ejemplo de uso de interface:
// Definir una interfaz para un objeto
interface User2 {
    id: number;
    name: string;
    isAdmin?: boolean; // Campo opcional
  }
  
  // Usar la interfaz
  const user2: User2 = { id: 1, name: "Alice" }; // válido


//   Diferencias entre type e interface

//   Extensión o herencia:
//   Interfaces: puedes extender interfaces con otras interfaces y combinarlas de forma sencilla.
//   Tipos: también puedes extender tipos, pero es algo menos flexible que con interfaces, especialmente cuando necesitas combinarlos.

//   Ejemplo de extensión con interface:
interface Person {
    name: string;
  }
  
  interface Employee extends Person {
    employeeId: number;
  }
  
  const employee: Employee = { name: "John", employeeId: 123 };

//   Ejemplo de extensión con type:
type Person2 = {
    name: string;
  };
  
  type Employee2 = Person2 & {
    employeeId: number;
  };
  
  const employee2: Employee2 = { name: "John", employeeId: 123 };
  
//   Uniones y combinaciones:
//   Tipos permiten crear uniones y combinaciones, como string | number.
//   Interfaces no permiten directamente las uniones.
type Id = string | number; // válido con type

// Reapertura o modificación:
// Interfaces permiten ser “reabiertas”, es decir, puedes añadir propiedades a la misma interfaz en diferentes lugares del código, lo cual es útil para añadir nuevas propiedades en distintos contextos.
// Tipos no permiten ser reabiertos de esta manera.
interface User3 {
    id: number;
  }
  
  interface User3 {
    name: string;
  }
  
  const user3: User3 = { id: 1, name: "Alice" }; // válido porque las interfaces se fusionan
  
//   ¿Cuándo usar type o interface?
//   Usa interfaces cuando definas estructuras de datos o contratos de objetos que podrían expandirse (por ejemplo, tipos de objetos en una API).
//   Usa types cuando necesites combinaciones de tipos complejos, como uniones o intersecciones.