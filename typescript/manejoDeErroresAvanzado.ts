// El manejo avanzado de errores en TypeScript permite capturar y gestionar los errores de forma controlada, aprovechando el sistema de tipos para tener mayor seguridad y evitar errores comunes en tiempo de ejecución. Aquí te explico cómo funciona y algunos patrones avanzados para un manejo efectivo de errores.

// 1. Manejo Básico de Errores con try-catch
// TypeScript soporta el manejo de errores usando el bloque try-catch igual que en JavaScript. Puedes usar try para ejecutar un bloque de código que podría lanzar un error, y catch para capturar el error y manejarlo.
try {
    // Código que podría lanzar un error
    throw new Error("Algo salió mal");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
  }

//   2. Tipos Personalizados de Errores
//   Puedes crear clases de error personalizadas en TypeScript para diferenciar entre distintos tipos de errores. Esto permite capturar y manejar diferentes tipos de errores de manera específica.  
class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
  class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }
  
  // Lanzar y capturar errores personalizados
  try {
    throw new ValidationError("El dato es inválido");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error("Error de validación:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
  }

//   3. Uso de never para Errores Irrecuperables
//   En TypeScript, el tipo never representa valores que nunca ocurren. Es útil para indicar que una función lanzará un error y no retornará ningún valor.
function throwError(message: string): never {
    throw new Error(message);
  }
  
  // Uso
  function processInput(input: unknown) {
    if (typeof input !== "string") {
      throwError("Input no es un string"); // Esta línea no devuelve nada.
    }
    console.log("Input procesado:", input);
  }

//   4. Manejo Seguro de Errores con unknown
//   En TypeScript, puedes usar el tipo unknown para los errores en el bloque catch, en lugar de any. Esto te obliga a verificar el tipo antes de acceder a sus propiedades, haciéndolo más seguro.
try {
    throw new Error("Un error inesperado");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Mensaje de error:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
  }

//   5. Funciones que Retornan Result o Either
//   Para manejar errores sin lanzar excepciones, se pueden usar estructuras como Result o Either, comunes en otros lenguajes. Esta técnica implica que las funciones devuelvan un valor que indica si la operación fue exitosa o no, en lugar de lanzar un error.
  
//   Ejemplo de una estructura Result:
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

function parseJSON(jsonString: string): Result<any, string> {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Error al analizar el JSON" };
  }
}

// Uso
const result = parseJSON('{"name": "John"}');
if (result.success) {
  console.log("Datos:", result.data);
} else {
  console.error("Error:", result.error);
}

// 6. Manejo de Errores en Funciones Asíncronas
// En TypeScript, puedes usar async y await para trabajar con promesas y manejar errores en funciones asíncronas usando try-catch.
async function fetchData(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Datos recibidos:", data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }

//   7. Manejo de Errores en Promesas
//   Para el manejo de errores en promesas, puedes usar .catch() o bien utilizar un try-catch en funciones asíncronas.
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) throw new Error("Error en la respuesta");
    return response.json();
  })
  .then((data) => console.log("Datos:", data))
  .catch((error) => console.error("Error al obtener datos:", error));

//   8. Utilizar exhaustive check para Validación Completa de Errores
//   Este patrón es útil cuando manejas varios tipos de errores y deseas asegurarte de que se maneje cada caso. En TypeScript, puedes usar never en combinación con un switch para que el compilador marque error si no manejas algún tipo de error.
type CustomError = NotFoundError | ValidationError | Error;

function handleError(error: CustomError): void {
  switch (error.name) {
    case "NotFoundError":
      console.error("Recurso no encontrado:", error.message);
      break;
    case "ValidationError":
      console.error("Error de validación:", error.message);
      break;
    case "Error":
      console.error("Error genérico:", error.message);
      break;
    default:
    //   const exhaustiveCheck: never = error;
    //   throw new Error(`Tipo de error no manejado: ${exhaustiveCheck}`);
  }
}

// Este método obliga a que todos los tipos de error en CustomError estén cubiertos en el switch, lo que ayuda a reducir errores inesperados.