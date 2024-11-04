// Los Utility Types y la creación de tipos personalizados en TypeScript son características avanzadas que permiten transformar y extender tipos existentes para crear estructuras más específicas y reutilizables. Los Utility Types son tipos predefinidos que simplifican la manipulación de otros tipos, mientras que los tipos personalizados te permiten definir tipos complejos y específicos para adaptarlos a las necesidades de tu aplicación.

// Aquí te explico cómo funcionan y cómo puedes utilizarlos.

// 1. Utility Types en TypeScript
// TypeScript incluye una variedad de Utility Types para realizar operaciones comunes sobre tipos, tales como extraer, modificar, o combinar propiedades. Aquí están algunos de los Utility Types más utilizados:

// Partial<T>
// Convierte todas las propiedades de un tipo en opcionales. Esto es útil cuando quieres trabajar con objetos incompletos o parcialmente construidos.
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const partialUser: Partial<User> = {
    name: "John", // Solo una propiedad, el resto son opcionales
  };
// Required<T>
// Hace que todas las propiedades de un tipo sean obligatorias, anulando cualquier propiedad opcional.  
/**
 **      interface User {
 **        id: number;
 **        name?: string;
 **        email?: string;
 **     }
 */
  
  const fullUser: Required<User> = {
    id: 1,
    name: "John",
    email: "john@example.com",
  }; // Todas las propiedades son requeridas

//   Readonly<T>
//   Convierte todas las propiedades de un tipo en solo lectura, lo que significa que no se pueden modificar después de ser asignadas.
/**
 **      interface User {
 **        id: number;
 **        name: string;
 **      }
 **      
 **      const user: Readonly<User> = {
 **        id: 1,
 **        name: "John",
 **      };
 */
  // user.id = 2; // Error: no se puede modificar porque es solo lectura

//   Pick<T, K>
//   Crea un nuevo tipo tomando solo algunas propiedades del tipo original. Esto es útil para extraer un subconjunto de propiedades.
/**
**        interface User {
**        id: number;
**        name: string;
**        email: string;
**      }

**      type UserBasicInfo = Pick<User, "id" | "name">;

**      const basicUser: UserBasicInfo = {
**        id: 1,
**        name: "John",
**      };
 */

// Omit<T, K>
// Crea un nuevo tipo excluyendo algunas propiedades del tipo original, dejando solo aquellas que no fueron omitidas.
/**
**        interface User {
**        id: number;
**        name: string;
**        email: string;
**      }

**      type UserWithoutEmail = Omit<User, "email">;

**      const userWithoutEmail: UserWithoutEmail = {
**        id: 1,
**        name: "John",
**      };
 */

// Record<K, T>
// Crea un tipo con un conjunto de propiedades K que comparten el mismo tipo T. Este Utility Type es útil para construir tipos de mapeo.
/**
**      type Role = "admin" | "user" | "guest";
**      type Permissions = Record<Role, boolean>;

**      const rolePermissions: Permissions = {
**        admin: true,
**        user: false,
**        guest: false,
**      };
 */

// Exclude<T, U>
// Crea un nuevo tipo excluyendo todas las propiedades de T que son asignables a U.
type Status = "active" | "inactive" | "deleted";
type ActiveStatus = Exclude<Status, "deleted">; // "active" | "inactive"

// Extract<T, U>
// Crea un nuevo tipo tomando solo las propiedades de T que son asignables a U.
type Status2 = "active" | "inactive" | "deleted";
type NonDeletedStatus = Extract<Status2, "active" | "inactive">; // "active" | "inactive"

// ReturnType<T>
// Obtiene el tipo de retorno de una función.
function getUser() {
    return { id: 1, name: "John" };
  }
  
  type UserReturnType = ReturnType<typeof getUser>; // { id: number, name: string }

  
//   2. Creación de Tipos Personalizados
//   Además de los Utility Types, TypeScript permite crear tipos personalizados, ya sea mediante tipos (type) o interfaces (interface). Estos tipos personalizados son útiles cuando necesitas estructuras específicas o tipos complejos.
  
//   Definición de Tipos Complejos
//   Puedes combinar varios tipos y estructuras para crear tipos personalizados más específicos.
  
//   Ejemplo: Tipo Combinado
type Address = {
    street: string;
    city: string;
    country: string;
  };
  
  type User2 = {
    id: number;
    name: string;
    address: Address; // Tipo personalizado para la dirección
  };


//   Tipos Condicionales
//   Los Tipos Condicionales en TypeScript permiten definir un tipo basado en una condición que utiliza el operador extends. Esto permite una lógica compleja en la creación de tipos.
  
//   Ejemplo de Tipo Condicional:
type IsString<T> = T extends string ? "Es un string" : "No es un string";

type Test1 = IsString<string>; // "Es un string"
type Test2 = IsString<number>; // "No es un string"


// Mapeo de Tipos
// TypeScript permite crear tipos basados en otros tipos mediante Mapeo de Tipos. Esto es útil para transformar tipos existentes sin tener que redefinir sus propiedades.

// Ejemplo de Mapeo de Tipos:
type User3 = {
    id: number;
    name: string;
    email: string;
  };
  
  // Convierte todas las propiedades en opcionales
  type OptionalUser = {
    [P in keyof User3]?: User3[P];
  };
  

//   3. Ejemplos Combinados de Utility Types y Tipos Personalizados
//   Combinar Utility Types con tipos personalizados permite crear tipos complejos con gran flexibilidad.
  
//   Ejemplo: Tipo Personalizado para Configuración de Usuario
//   Imaginemos que quieres definir un tipo para un objeto de configuración donde cada propiedad sea opcional, solo lectura y contenga valores específicos.
type UserSettings = {
    theme: "dark" | "light";
    language: "es" | "en" | "fr";
    notifications: boolean;
  };
  
  type ReadOnlyOptionalSettings = Readonly<Partial<UserSettings>>;
  
  const settings: ReadOnlyOptionalSettings = {
    theme: "dark",
  };
  
  // settings.theme = "light"; // Error: propiedad de solo lectura


//   Ejemplo: Crear un Tipo DeepPartial
//   DeepPartial convierte todas las propiedades de un tipo en opcionales, incluyendo las propiedades de los objetos anidados.
/**
**        type DeepPartial<T> = {
**          [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
**        };
  
**        interface User {
**          id: number;
**          name: string;
**          preferences: {
**            theme: string;
**            language: string;
**          };
**        }
  
**        const user: DeepPartial<User> = {
**          preferences: {
**            theme: "dark",
**          },
**        };
 */

// Resumen
// Utility Types: Permiten manipular y transformar tipos de manera sencilla, como hacer que todas las propiedades sean opcionales (Partial) o de solo lectura (Readonly).
// Tipos Condicionales: Definen tipos basados en condiciones (T extends U), lo que permite crear tipos más flexibles y específicos.
// Mapeo de Tipos: Permite transformar propiedades en un tipo, como hacerlas opcionales o agregar restricciones.
// Creación de Tipos Personalizados: Combinando estas técnicas, puedes crear tipos avanzados para modelar estructuras de datos complejas o especificar configuraciones estrictas para tus datos.
  
  