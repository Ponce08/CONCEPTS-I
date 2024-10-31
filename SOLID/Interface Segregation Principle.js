// El Interface Segregation Principle (ISP) es uno de los cinco principios SOLID de la programación orientada a objetos. Este principio establece que ninguna clase debería ser forzada a implementar interfaces que no utiliza. En otras palabras, es mejor tener varias interfaces específicas y delgadas en lugar de una interfaz grande y monolítica.

// Concepto del ISP
// El ISP promueve la idea de que las clases deben ser diseñadas para interactuar con interfaces específicas que proporcionan solo los métodos relevantes para cada clase, evitando que implementen métodos que no necesitan. Esto reduce la dependencia y mejora la mantenibilidad del código.

// Implementación del ISP en JavaScript
// Aunque JavaScript no tiene interfaces de forma explícita como otros lenguajes (por ejemplo, Java o C#), se pueden simular utilizando clases y patrones de diseño. Veamos un ejemplo para ilustrar cómo se puede aplicar el principio ISP en JavaScript.

// Ejemplo del Interface Segregation Principle
// Imaginemos que estamos creando una aplicación para manejar diferentes tipos de dispositivos (como impresoras y escáneres). En lugar de crear una única interfaz grande, podemos crear interfaces más pequeñas y específicas.
// Interfaz para impresoras
class Printer {
    imprimir(documento) {
        throw new Error("Método no implementado");
    }
}

// Interfaz para escáneres
class Scanner {
    escanear(documento) {
        throw new Error("Método no implementado");
    }
}

// Clase que implementa solo Printer
class ImpresoraLaser extends Printer {
    imprimir(documento) {
        console.log(`Imprimiendo documento en impresora láser: ${documento}`);
    }
}

// Clase que implementa solo Scanner
class EscanerPlana extends Scanner {
    escanear(documento) {
        console.log(`Escaneando documento en escáner plano: ${documento}`);
    }
}

// Clase que implementa ambas interfaces
class Multifuncional extends Printer {
    constructor() {
        super();
        this.escaner = new EscanerPlana();
    }

    imprimir(documento) {
        console.log(`Imprimiendo documento en multifuncional: ${documento}`);
    }

    escanear(documento) {
        this.escaner.escanear(documento);
    }
}

// Uso de las clases
const impresora = new ImpresoraLaser();
impresora.imprimir("Informe.pdf"); // "Imprimiendo documento en impresora láser: Informe.pdf"

const escaner = new EscanerPlana();
escaner.escanear("Foto.jpg"); // "Escaneando documento en escáner plano: Foto.jpg"

const multifuncional = new Multifuncional();
multifuncional.imprimir("Presentación.pptx"); // "Imprimiendo documento en multifuncional: Presentación.pptx"
multifuncional.escanear("Documento.pdf"); // "Escaneando documento en escáner plano: Documento.pdf"
// Explicación del Ejemplo
// Interfaz Segregada: Hemos creado dos interfaces: Printer y Scanner, que definen solo los métodos relevantes para cada tipo de dispositivo.
// Clases Específicas:
// ImpresoraLaser implementa solo la interfaz Printer.
// EscanerPlana implementa solo la interfaz Scanner.
// Multifuncional implementa ambas interfaces, permitiendo la funcionalidad de impresión y escaneo.
// Separación de Responsabilidades: Cada clase solo está obligada a implementar métodos que realmente necesita, lo que mejora la claridad del código y facilita su mantenimiento.


// Ventajas del Interface Segregation Principle
// Reducir el Acoplamiento: Las clases no dependen de métodos que no utilizan.
// Facilitar el Mantenimiento: Los cambios en una interfaz específica no afectan a otras clases que no la utilizan.
// Mejorar la Legibilidad: Las interfaces delgadas son más fáciles de entender y utilizar.