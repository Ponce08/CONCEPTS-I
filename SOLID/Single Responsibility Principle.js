// El Single Responsibility Principle (SRP), o Principio de Responsabilidad Única, es uno de los cinco principios SOLID de la programación orientada a objetos. Este principio establece que una clase o módulo debería tener solo una razón para cambiar, lo que significa que debe encargarse únicamente de una tarea o responsabilidad específica. En JavaScript, este principio se puede aplicar tanto a funciones como a clases y módulos.

// ¿Por qué es importante el SRP?
// Aplicar el SRP ayuda a:

// Mejorar la mantenibilidad: Un código que sigue el SRP es más fácil de entender y modificar, ya que cada clase o función tiene un propósito claro.
// Facilitar las pruebas: Si cada clase tiene una sola responsabilidad, las pruebas unitarias son más sencillas.
// Reducir el acoplamiento: Al delegar responsabilidades específicas a cada clase, disminuye la dependencia entre componentes.
// Ejemplo de SRP en JavaScript
// Supongamos que estamos construyendo un sistema para gestionar los datos de usuarios y necesitamos registrar, validar y enviar correos electrónicos de bienvenida a los nuevos usuarios.

// Ejemplo sin SRP
// En este ejemplo, tenemos una clase Usuario que realiza múltiples tareas: valida datos, guarda información y envía un correo electrónico.
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }

    // Método que guarda los datos del usuario
    guardar() {
        if (this.validarEmail()) {
            console.log("Guardando usuario en la base de datos...");
            // Código para guardar en la base de datos
            this.enviarCorreoBienvenida();
        }
    }

    // Método que valida el formato del email
    validarEmail() {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(this.email);
    }

    // Método que envía un correo de bienvenida
    enviarCorreoBienvenida() {
        console.log(`Enviando correo de bienvenida a ${this.email}...`);
        // Código para enviar el correo electrónico
    }
}

const usuario = new Usuario("Juan", "juan@example.com");
usuario.guardar();
// Aquí, la clase Usuario tiene varias responsabilidades:

// Validar el correo electrónico.
// Guardar el usuario en la base de datos.
// Enviar un correo de bienvenida.
// Esto va en contra del SRP, ya que cualquier cambio en la forma de validación o el envío de correos obligaría a modificar la clase Usuario, haciendo que sea más difícil de mantener.

// Ejemplo aplicando el SRP
// Para aplicar el SRP, separamos cada responsabilidad en diferentes clases:
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class ValidadorEmail {
    static validar(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
}

class RepositorioUsuario {
    static guardar(usuario) {
        console.log("Guardando usuario en la base de datos...");
        // Código para guardar en la base de datos
    }
}

class ServicioCorreo {
    static enviarCorreoBienvenida(email) {
        console.log(`Enviando correo de bienvenida a ${email}...`);
        // Código para enviar el correo electrónico
    }
}

// Uso de las clases con SRP aplicado
const usuario2 = new Usuario("Juan", "juan@example.com");

if (ValidadorEmail.validar(usuario2.email)) {
    RepositorioUsuario.guardar(usuario2);
    ServicioCorreo.enviarCorreoBienvenida(usuario2.email);
} else {
    console.log("Email inválido");
}
// Explicación del Ejemplo
// En este código:

// Clase Usuario: Representa solo los datos del usuario sin ninguna lógica adicional.
// Clase ValidadorEmail: Valida el formato del correo electrónico.
// Clase RepositorioUsuario: Se encarga de la lógica de guardado del usuario en la base de datos.
// Clase ServicioCorreo: Maneja el envío del correo de bienvenida.
// Ahora, cada clase tiene una única responsabilidad:

// Si se necesita cambiar la validación del correo, solo modificamos ValidadorEmail.
// Si cambia el sistema de base de datos, solo se toca RepositorioUsuario.
// Si el proceso de envío de correo cambia, ajustamos solo ServicioCorreo.

// Ventajas del SRP aplicado
// Separación clara de responsabilidades: Cada clase se centra en una tarea específica.
// Facilidad de mantenimiento: Los cambios en una funcionalidad específica solo afectan a la clase que la gestiona.
// Código reutilizable y modular: Cada clase se puede reutilizar en otros proyectos o contextos.
