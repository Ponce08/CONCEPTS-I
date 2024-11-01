// Los Mapped Types en TypeScript permiten crear nuevos tipos basados en las propiedades de un tipo existente, aplicando transformaciones o modificaciones a cada propiedad. Esto resulta útil para reutilizar tipos y crear tipos derivados de forma dinámica, lo cual es muy poderoso en aplicaciones que necesitan estructuras de datos flexibles.

// Sintaxis de Mapped Types
// La estructura básica de un Mapped Type es la siguiente:
/**
**     type NuevoTipo = {
**         [Key in TipoExistente]: Transformación;
**     };
 */
// Aquí:
// Key representa cada propiedad de TipoExistente.
// TipoExistente es el tipo que se mapea.
// Transformación especifica el tipo que se asignará a cada propiedad.


// Ejemplo básico: Convertir todas las propiedades en opcionales
// Supongamos que tenemos un tipo Persona y queremos crear una versión opcional de todas sus propiedades. Podemos usar un Mapped Type para hacerlo:
interface Persona {
    nombre: string;
    edad: number;
    pais: string;
}

type Opcional<T> = {
    [K in keyof T]?: T[K];
};

type PersonaOpcional = Opcional<Persona>;

// Ahora `PersonaOpcional` es equivalente a:
/**
**      interface PersonaOpcional {
**          nombre?: string;
**          edad?: number;
**          pais?: string;
**      }
 */
// En este ejemplo:
// keyof T obtiene las claves de T (en este caso, Persona), es decir, "nombre" | "edad" | "pais".
// [K in keyof T] crea un nuevo tipo recorriendo cada clave de Persona.
// ?: T[K] transforma cada propiedad en opcional.


// Ejemplo de transformación: Hacer todas las propiedades requeridas
// Si queremos hacer todas las propiedades requeridas, solo necesitamos quitar el modificador ? con -?:
type Requerido<T> = {
    [K in keyof T]-?: T[K];
};

type PersonaRequerida = Requerido<Persona>;

// Ahora `PersonaRequerida` es equivalente a:
/**
**      interface PersonaRequerida {
**          nombre: string;
**          edad: number;
**          pais: string;
**      }
 */


// Ejemplo con propiedades de solo lectura
// Podemos hacer que todas las propiedades de un tipo sean de solo lectura usando readonly:
type SoloLectura<T> = {
    readonly [K in keyof T]: T[K];
};

type PersonaSoloLectura = SoloLectura<Persona>;

// Ahora `PersonaSoloLectura` es equivalente a:
interface PersonaSoloLectura_ {
    readonly nombre: string;
    readonly edad: number;
    readonly pais: string;
}
// Ejemplo con Utilidades integradas de TypeScript
// TypeScript ofrece varias utilidades integradas basadas en Mapped Types que facilitan el trabajo con tipos. Algunos ejemplos comunes son:
// Partial<T>: Convierte todas las propiedades de T en opcionales.
// Required<T>: Convierte todas las propiedades de T en requeridas.
// Readonly<T>: Convierte todas las propiedades de T en solo lectura.
// Record<K, T>: Crea un tipo con un conjunto de claves K y un tipo de valor T.

// Ejemplo usando Partial:
type PersonaOpcional2 = Partial<Persona>;

// Equivalente a:
interface PersonaOpcional2_ {
    nombre?: string;
    edad?: number;
    pais?: string;
}

// Ejemplo avanzado: Cambiar los tipos de todas las propiedades
// Supongamos que queremos crear un tipo en el que todas las propiedades sean boolean en lugar del tipo original. Podemos lograrlo con un Mapped Type:
type Booleano<T> = {
    [K in keyof T]: boolean;
};

type PersonaBooleano = Booleano<Persona>;

// Ahora `PersonaBooleano` es equivalente a:
interface PersonaBooleano_ {
    nombre: boolean;
    edad: boolean;
    pais: boolean;
}

// Los Mapped Types son herramientas potentes que permiten:
// Crear tipos derivados de otros tipos existentes.
// Modificar propiedades (haciendo opcionales, requeridas, o de solo lectura).
// Cambiar los tipos de las propiedades de manera flexible.



