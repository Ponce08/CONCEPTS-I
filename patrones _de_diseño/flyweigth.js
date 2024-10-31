// El patrón de diseño Flyweight es un patrón de optimización que busca reducir el uso de memoria compartiendo objetos en lugar de crear nuevos. Este patrón es útil cuando se necesitan crear muchos objetos similares que comparten una parte de su estado, permitiendo así ahorrar recursos y mejorar el rendimiento.

// En JavaScript, el patrón Flyweight puede ser utilizado para gestionar objetos que son costosos de crear, especialmente cuando se requiere crear instancias de estos objetos en grandes cantidades.

// Ejemplo: Gestión de Caracteres en un Texto
// Imaginemos que estamos construyendo un editor de texto y queremos representar caracteres. Cada carácter puede tener propiedades como el tipo de letra, el tamaño y el color. En lugar de crear un nuevo objeto para cada carácter, podemos usar el patrón Flyweight para compartir propiedades comunes.

// Paso 1: Crear la Clase Flyweight
// Primero, definimos una clase Character, que representará los caracteres individuales. Esta clase contendrá solo las propiedades que son específicas para cada carácter, como el símbolo.

class Character {
    constructor(symbol) {
        this.symbol = symbol;
    }

    display(font, size, color) {
        console.log(`Símbolo: ${this.symbol}, Fuente: ${font}, Tamaño: ${size}, Color: ${color}`);
    }
}
// Paso 2: Crear la Fábrica de Flyweights
// A continuación, creamos una clase CharacterFactory que gestionará la creación y reutilización de instancias de Character. Si ya existe un carácter con el mismo símbolo, reutilizaremos esa instancia.
class CharacterFactory {
    constructor() {
        this.characters = {};
    }

    getCharacter(symbol) {
        if (!this.characters[symbol]) {
            this.characters[symbol] = new Character(symbol);
        }
        return this.characters[symbol];
    }
}
// Paso 3: Usar la Fábrica Flyweight
// Ahora podemos crear un editor de texto que use la fábrica para crear y gestionar caracteres.
class TextEditor {
    constructor() {
        this.factory = new CharacterFactory();
        this.text = [];
    }

    addCharacter(symbol, font, size, color) {
        const character = this.factory.getCharacter(symbol);
        this.text.push({ character, font, size, color });
    }

    displayText() {
        this.text.forEach(({ character, font, size, color }) => {
            character.display(font, size, color);
        });
    }
}
// Paso 4: Crear y Mostrar Texto
// Finalmente, podemos crear una instancia de TextEditor, añadir caracteres y mostrarlos.
const editor = new TextEditor();

editor.addCharacter('H', 'Arial', 12, 'black');
editor.addCharacter('e', 'Arial', 12, 'black');
editor.addCharacter('l', 'Arial', 12, 'black');
editor.addCharacter('l', 'Arial', 12, 'black');
editor.addCharacter('o', 'Arial', 12, 'black');
editor.addCharacter(' ', 'Arial', 12, 'black');
editor.addCharacter('W', 'Arial', 12, 'black');
editor.addCharacter('o', 'Arial', 12, 'black');
editor.addCharacter('r', 'Arial', 12, 'black');
editor.addCharacter('l', 'Arial', 12, 'black');
editor.addCharacter('d', 'Arial', 12, 'black');

editor.displayText();

// Salida esperada:

/**
Símbolo: H, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: e, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: l, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: l, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: o, Fuente: Arial, Tamaño: 12, Color: black
Símbolo:  , Fuente: Arial, Tamaño: 12, Color: black
Símbolo: W, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: o, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: r, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: l, Fuente: Arial, Tamaño: 12, Color: black
Símbolo: d, Fuente: Arial, Tamaño: 12, Color: black
*/

// Ejemplo 2

// A simple Character class that stores the value, type, and position of a character
function Character(value, type, position) {
    this.value = value
    this.type = type
    this.position = position
 }
 
 // A Flyweight class that stores character value and type combinations
 function CharacterFlyweight(value, type) {
    this.value = value
    this.type = type
 }
 
 // A factory to automatically create the flyweights that are not present in the list,
 // and also generate a count of the total flyweights in the list
 const CharacterFlyweightFactory = (function () {
    const flyweights = {}
 
    return {
        get: function (value, type) {
            if (flyweights[value + type] === undefined)
                flyweights[value + type] = new CharacterFlyweight(value, type)
 
            return flyweights[value + type]
        },
        count: function () {
            let count = 0;
            for (var f in flyweights) count++;
            return count;
        }
    }
 })()
 
 // An enhanced Character class that uses flyweights to store references
 // to recurring value and type combinations
 function CharacterWithFlyweight(value, type, position) {
    this.flyweight = CharacterFlyweightFactory.get(value, type)
    this.position = position
 }
 
 // A helper function to define the type of a character
 // It identifies numbers as N and everything as A (for alphabets)
 function getCharacterType(char) {
    switch (char) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": return "N"
        default:
            return "A"
 
    }
 }
 
 // A list class to create an array of Characters from a given string
 function CharactersList(str) {
    let chars = []
    for (let i = 0; i < str.length; i++) {
        const char = str[i]
        chars.push(new Character(char, getCharacterType(char), i))
    }
 
    return chars
 }
 
 // A list class to create an array of CharacterWithFlyweights from a given string
 function CharactersWithFlyweightsList(str) {
    chars = []
    for (let i = 0; i;  " + charactersList.length")
    // Output: Character count -> 656
 
    // The number of flyweights created is only 31, since only 31 characters are used to write the
    // entire paragraph. This means that to store 656 characters, a total of
    // (31 * 2 + 656 * 1 = 718) memory blocks are used instead of (656 * 3 = 1968) which would have
    // used by the standard array.
    // (We have assumed each variable to take up one memory block for simplicity. This
    // may vary in real-life scenarios)
    console.log("Flyweights created -> " + CharacterFlyweightFactory.count())
    // Output: Flyweights created -> 31
 
 }
 
 run()

/**
 Ventajas del Patrón Flyweight
 Ahorro de Memoria: Al compartir instancias, se reduce el uso de memoria, especialmente cuando se manejan muchos objetos similares.
 Mejora del Rendimiento: La creación y gestión de objetos se hace más eficiente, ya que se evitan duplicados innecesarios.
 Facilita la Extensibilidad: Se pueden añadir más tipos de caracteres o atributos sin necesidad de cambiar la implementación existente.
 */
 