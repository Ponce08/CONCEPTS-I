// El patrón de diseño Bridge (puente) permite separar una abstracción de su implementación para que ambas puedan evolucionar de forma independiente. Esto se logra mediante la creación de una "puente" entre las dos capas, logrando flexibilidad y extensibilidad en el código.

// En JavaScript, se puede usar este patrón especialmente en escenarios donde tienes diferentes variantes de una abstracción y de una implementación, y necesitas combinar ambas sin crear una gran cantidad de clases.

// Aquí tienes un ejemplo sencillo del patrón Bridge en JavaScript para que se entienda su estructura:

// Ejemplo: Dispositivos y Controles
// Imaginemos que estamos implementando un control remoto para dispositivos electrónicos. Queremos un control remoto que funcione para varios dispositivos como televisores y radios. En lugar de crear una clase de control remoto específica para cada dispositivo, separamos la abstracción del control de la implementación del dispositivo.

// Paso 1: Crear la Abstracción
// Creamos una clase RemoteControl que representará la abstracción. Esta clase dependerá de una implementación del dispositivo, la cual recibirá a través del constructor.

// Abstracción
class RemoteControl {
    constructor(device) {
        this.device = device;
    }

    turnOn() {
        this.device.turnOn();
    }

    turnOff() {
        this.device.turnOff();
    }
}
// Paso 2: Crear las Implementaciones Concretas del Dispositivo
// Definimos las clases TV y Radio que representarán dispositivos específicos. Cada uno implementa los métodos turnOn y turnOff que el control remoto utilizará.

// Implementación concreta
class TV {
    turnOn() {
        console.log("Encendiendo TV");
    }

    turnOff() {
        console.log("Apagando TV");
    }
}

class Radio {
    turnOn() {
        console.log("Encendiendo Radio");
    }

    turnOff() {
        console.log("Apagando Radio");
    }
}
// Paso 3: Usar el Puente entre la Abstracción y la Implementación
// Ahora podemos crear un control remoto y pasarle cualquier dispositivo (como un televisor o una radio). Así logramos que la abstracción RemoteControl opere de forma independiente de las implementaciones TV y Radio.
const tv = new TV();
const radio = new Radio();

const remoteForTV = new RemoteControl(tv);
const remoteForRadio = new RemoteControl(radio);

remoteForTV.turnOn();  // Salida: Encendiendo TV
remoteForTV.turnOff(); // Salida: Apagando TV

remoteForRadio.turnOn();  // Salida: Encendiendo Radio
remoteForRadio.turnOff(); // Salida: Apagando Radio

// Ejemplo 2

// The TV and speaker share the same interface
function TV() {
    this.increaseVolume = function() {
        // logic to increase TV volume
    }
 
    this.decreaseVolume = function() {
        // logic to decrease TV volume
    }
 
    this.mute = function() {
        // logic to mute TV audio
    }
 }
 
 function Speaker() {
    this.increaseVolume = function() {
        // logic to increase speaker volume
    }
 
    this.decreaseVolume = function() {
        // logic to decrease speaker volume
    }
 
    this.mute() = function() {
        // logic to mute speaker audio
    }
 }
 
 // The two remotes make use of the same common interface
 // that supports volume up and volume down features
 function SimpleRemote(device) {
    this.pressVolumeDownKey = function() {
        device.decreaseVolume()
    }
 
    this.pressVolumeUpKey = function() {
        device.increaseVolume()
    }
 }
 
 function AdvancedRemote(device) {
 
    this.pressVolumeDownKey = function() {
        device.decreaseVolume()
    }
 
    this.pressVolumeUpKey = function() {
        device.increaseVolume()
    }
 
    this.pressMuteKey = function() {
        device.mute()
    }
 }
 
 function run() {
 
    let tv = new TV()
    let speaker = new Speaker()
 
    let tvSimpleRemote = new SimpleRemote(tv)
    let tvAdvancedRemote = new AdvancedRemote(tv)
 
    let speakerSimpleRemote = new SimpleRemote(speaker)
    let speakerAdvancedRemote = new AdvancedRemote(speaker)
 
    // The methods listed in pair below will have the same effect
    // on their target devices
    tvSimpleRemote.pressVolumeDownKey()
    tvAdvancedRemote.pressVolumeDownKey()
 
    tvSimpleRemote.pressVolumeUpKey()
    tvAdvancedRemote.pressVolumeUpKey()
 
    // The advanced remote has additional functionality
    tvAdvancedRemote.pressMuteKey()
 
    speakerSimpleRemote.pressVolumeDownKey()
    speakerAdvancedRemote.pressVolumeDownKey()
 
    speakerSimpleRemote.pressVolumeUpKey()
    speakerAdvancedRemote.pressVolumeUpKey()
 
    speakerAdvancedRemote.pressMuteKey()
 }

//  Ventajas del Patrón Bridge
// Separación de la Abstracción y la Implementación: Esto permite que ambas puedan modificarse sin afectar la otra.
// Escalabilidad: Se pueden añadir más tipos de dispositivos (como DVD, altavoces, etc.) y más tipos de controles (como controles avanzados) sin una gran modificación del código.
// Facilita el mantenimiento: Cada clase tiene una responsabilidad específica, facilitando su prueba y mantenimiento.