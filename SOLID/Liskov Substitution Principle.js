// El Liskov Substitution Principle (LSP), o Principio de Sustitución de Liskov, es uno de los principios SOLID de la programación orientada a objetos. Establece que los objetos de una clase derivada deben ser sustituibles por objetos de la clase base sin alterar la correcta funcionalidad del programa. En otras palabras, si S es una subclase de T, entonces los objetos de tipo T deben ser reemplazables por objetos de tipo S sin que se produzcan errores.

// Implementación del LSP en JavaScript
// Para aplicar el LSP en JavaScript, es importante asegurarse de que las clases derivadas respeten el contrato establecido por la clase base. Esto incluye no solo los métodos, sino también las expectativas de comportamiento.

// Ejemplo básico de LSP
// Vamos a crear un ejemplo donde el LSP se aplica correctamente y otro donde no se cumple.

// Ejemplo correcto:
class Ave {
    volar() {
        console.log("El ave está volando.");
    }
}

class Paloma extends Ave {
    volar() {
        console.log("La paloma está volando suavemente.");
    }
}

class Águila extends Ave {
    volar() {
        console.log("El águila está volando alto.");
    }
}

function hacerVolar(ave) {
    ave.volar(); // Se espera que todas las aves puedan volar
}

const paloma = new Paloma();
const aguila = new Águila();

hacerVolar(paloma); // La paloma está volando suavemente.
hacerVolar(aguila); // El águila está volando alto.
// En este caso:
// Paloma y Águila son subclases de Ave y ambas implementan el método volar.
// La función hacerVolar puede trabajar con cualquier objeto de tipo Ave, ya sea una Paloma o un Águila, y se comporta como se espera.

// Ejemplo incorrecto:
// Ahora veamos un caso donde el LSP no se respeta.
class Ave {
    volar() {
        console.log("El ave está volando.");
    }
}

class Pingüino extends Ave {
    volar() {
        throw new Error("Los pingüinos no pueden volar");
    }
}

function hacerVolar(ave) {
    ave.volar(); // Se espera que todas las aves puedan volar
}

const pingüino = new Pingüino();
hacerVolar(pingüino); // Esto lanzará un error
// En este ejemplo:
// Pingüino es una subclase de Ave, pero lanza un error en el método volar, ya que los pingüinos no pueden volar.
// Esto viola el LSP, ya que al reemplazar Ave por Pingüino en la función hacerVolar, se produce un error



// Cómo evitar violaciones del LSP
// Para garantizar que el LSP se cumpla, considera los siguientes enfoques:

// No sobrescribir métodos de forma que cambien el comportamiento esperado: Asegúrate de que cualquier subclase respete las expectativas del comportamiento de la clase base.

// Utilizar interfaces o clases abstractas: En vez de depender de clases concretas, puedes definir interfaces que describan el comportamiento esperado. Esto permite que las subclases implementen el comportamiento deseado sin violar el contrato.

// Usar la composición en lugar de la herencia: A veces, la composición puede ser una mejor opción que la herencia, especialmente si se necesita agregar diferentes comportamientos sin alterar la jerarquía de clases.



// Ventajas del LSP
// Mejor mantenibilidad: Si una subclase se puede usar sin problemas donde se espera la clase base, se reduce la complejidad del código y la posibilidad de errores.
// Facilidad para extender el código: Permite la adición de nuevas subclases sin tener que modificar las clases existentes.
// Códigos más confiables: Al asegurar que las subclases se comporten como se espera, se minimizan los errores en el sistema.