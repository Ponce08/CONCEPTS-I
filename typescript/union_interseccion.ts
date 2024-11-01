// En TypeScript, los tipos de unión (Union Types) y los tipos de intersección (Intersection Types) son dos mecanismos avanzados que permiten trabajar de manera flexible con múltiples tipos, brindando más control sobre el tipo de datos que las variables pueden almacenar o las funciones pueden recibir.

// 1. Tipos de Unión (Union Types)
// Un Union Type permite que una variable o un parámetro acepte uno de varios tipos posibles. Esto se logra utilizando el símbolo | entre los tipos. Es muy útil cuando un valor puede ser de más de un tipo.

// Ejemplo de tipo de Unión
let result: string | number;

result = "Hello";  // Esto es válido
result = 42;       // También es válido
// result = true;  // Esto causaría un error, ya que solo se permiten `string` o `number`
// Aquí, la variable result puede ser de tipo string o number, pero no de ningún otro tipo. Esto proporciona flexibilidad en cuanto a los tipos, pero sigue manteniendo cierta restricción.

// Uso común en funciones
// Un ejemplo común es cuando una función acepta diferentes tipos de entrada y debe actuar en función del tipo que recibe:
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(`ID (string): ${id.toUpperCase()}`);
    } else {
        console.log(`ID (number): ${id}`);
    }
}

printId("abc123");  // Output: ID (string): ABC123
printId(456);       // Output: ID (number): 456
// TypeScript usa el tipo de unión string | number para permitir que la función acepte ambos tipos, y luego typeof se usa para comprobar el tipo de id en tiempo de ejecución y manejarlo adecuadamente.

// 2. Tipos de Intersección (Intersection Types)
// Un Intersection Type permite combinar múltiples tipos en un solo tipo que tiene todas las propiedades de los tipos combinados. Esto se logra utilizando el símbolo & entre los tipos. Es útil cuando necesitas crear un tipo que reúna todas las propiedades de varios tipos existentes.

// Ejemplo de tipo de Intersección
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "Alice",
    employeeId: 123,
};
// Aquí, EmployeePerson es un tipo de intersección que combina las propiedades de Person y Employee. Un objeto de tipo EmployeePerson debe tener tanto la propiedad name como la propiedad employeeId.

// Uso común de Intersección en funciones
// La intersección se utiliza a menudo para fusionar varios tipos en uno, especialmente cuando se trabaja con objetos que pueden tener características de varios tipos:
interface Contact {
    phone: string;
}

type ContactEmployee = Employee & Contact;

function displayContact(employee: ContactEmployee) {
    console.log(`Employee ID: ${employee.employeeId}`);
    console.log(`Phone: ${employee.phone}`);
}

const contactEmployee: ContactEmployee = {
    employeeId: 123,
    phone: "123-456-7890",
};

displayContact(contactEmployee);
// En este ejemplo, ContactEmployee es un tipo de intersección que contiene todas las propiedades de Employee y Contact, y la función displayContact puede acceder a todas estas propiedades.



// Ejemplo avanzado de Union e Intersection Types
// Imaginemos que estamos creando una aplicación que tiene dos tipos de usuarios: Guest (invitado) y Member (miembro registrado). Ambos tipos de usuario comparten algunas propiedades comunes, pero también tienen propiedades específicas.

// 1. Definición de tipos Guest y Member
// Aquí tenemos los tipos Guest y Member, cada uno con propiedades específicas y una propiedad común (name):
interface Guest {
    name: string;
    isGuest: boolean;
}

interface Member {
    name: string;
    memberId: number;
    membershipLevel: "Gold" | "Silver" | "Bronze";
}

// 2. Uso de Union Types para manejar ambos tipos de usuarios
// Podemos usar un Union Type para permitir que una función acepte tanto a Guest como a Member. Esto es útil si tenemos que hacer operaciones comunes en ambos tipos de usuarios, pero también podemos diferenciarlos cuando sea necesario.
function printUserInfo(user: Guest | Member) {
    console.log(`User Name: ${user.name}`);
    
    if ("isGuest" in user) {
        console.log("User is a guest");
    } else {
        console.log(`Member ID: ${user.memberId}`);
        console.log(`Membership Level: ${user.membershipLevel}`);
    }
}

// Ejemplos de uso
const guestUser: Guest = { name: "Alice", isGuest: true };
const memberUser: Member = { name: "Bob", memberId: 101, membershipLevel: "Gold" };

printUserInfo(guestUser);  // Output: User Name: Alice \n User is a guest
printUserInfo(memberUser);  // Output: User Name: Bob \n Member ID: 101 \n Membership Level: Gold
// En este ejemplo:
// La función printUserInfo acepta un tipo de unión Guest | Member.
// Dentro de la función, usamos in para verificar si el objeto tiene la propiedad isGuest, lo que nos ayuda a determinar si es un Guest o un Member.

// 3. Uso de Intersection Types para combinar Guest y Member
// Supongamos que queremos crear un usuario que sea tanto Guest como Member. Podríamos hacerlo usando un Intersection Type que combine las propiedades de ambos tipos:
type VIPUser = Guest & Member;

const vipUser: VIPUser = {
    name: "Charlie",
    isGuest: true,
    memberId: 202,
    membershipLevel: "Gold",
};

function printVIPUserInfo(user: VIPUser) {
    console.log(`VIP User Name: ${user.name}`);
    console.log(`Guest Status: ${user.isGuest}`);
    console.log(`Member ID: ${user.memberId}`);
    console.log(`Membership Level: ${user.membershipLevel}`);
}

printVIPUserInfo(vipUser);
// Output:
// VIP User Name: Charlie
// Guest Status: true
// Member ID: 202
// Membership Level: Gold

// En este caso:
// El tipo VIPUser es una intersección de Guest y Member, por lo que contiene todas las propiedades de ambos tipos.
// La función printVIPUserInfo puede acceder a todas las propiedades sin necesidad de hacer verificaciones, ya que TypeScript garantiza que VIPUser contiene todas las propiedades de Guest y Member.
