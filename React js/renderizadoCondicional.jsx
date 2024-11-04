// El renderizado condicional en React permite que un componente muestre u oculte elementos o diferentes componentes según ciertas condiciones. Esta técnica es esencial en React, ya que permite que la UI reaccione a cambios en el estado, props u otras condiciones de la aplicación. Aquí tienes las principales formas de implementar renderizado condicional en React:

// 1. Usar Operadores Condicionales
// Usar if o if-else (renderizado completo o nada)
// Puedes usar una condición if o if-else dentro de una función de renderizado para decidir si un componente debe mostrarse.
function WelcomeMessage({ isLoggedIn }) {
    if (isLoggedIn) {
      return <h1>Welcome back!</h1>;
    } else {
      return <h1>Please sign in</h1>;
    }
  }

//   Usar el Operador Ternario ? : (para alternar entre dos elementos)
//   Si solo necesitas alternar entre dos elementos, el operador ternario es una opción concisa.
function WelcomeMessage({ isLoggedIn }) {
    return (
      <h1>{isLoggedIn ? "Welcome back!" : "Please sign in"}</h1>
    );
  }

  
//   2. Renderizado Condicional con && (para renderizar o no)
//   Si solo deseas renderizar un elemento cuando una condición es verdadera, puedes usar el operador &&.
function Notification({ hasNewMessages }) {
    return (
      <div>
        {hasNewMessages && <p>You have new messages!</p>}
      </div>
    );
  }

  
//   Si hasNewMessages es true, se mostrará el mensaje. Si es false, el mensaje no se renderizará.

//   3. Renderizado Basado en Elementos Nulos
//   En React, devolver null en lugar de un componente hace que no se renderice nada. Esto es útil cuando deseas omitir completamente un componente.
function Warning({ showWarning }) {
    if (!showWarning) {
      return null;
    }
  
    return <div className="warning">Warning: Check your input!</div>;
  }

  
//   4. Renderizado Condicional con switch
//   Si tienes varias opciones, puedes usar una sentencia switch para renderizar diferentes elementos.
function StatusMessage({ status }) {
    switch (status) {
      case "loading":
        return <p>Loading...</p>;
      case "error":
        return <p>Error occurred!</p>;
      case "success":
        return <p>Success!</p>;
      default:
        return null;
    }
  }

  
//   5. Renderizado Condicional con Componentes Inline
//   A veces es útil crear funciones o componentes inline dentro de JSX que devuelvan diferentes elementos en función de la lógica.
function UserInfo({ user }) {
    const renderGreeting = () => {
      if (user) {
        return <h1>Hello, {user.name}!</h1>;
      }
      return <h1>Welcome, Guest!</h1>;
    };
  
    return <div>{renderGreeting()}</div>;
  }

  
//   Ejemplo Completo
//   Supongamos que tienes un componente de perfil que muestra el nombre del usuario si está conectado o un botón de "Iniciar sesión" si no lo está. Usando el renderizado condicional, el componente se vería así:
function Profile({ user }) {
    return (
      <div>
        {user ? (
          <h1>Hello, {user.name}</h1>
        ) : (
          <button>Login</button>
        )}
      </div>
    );
  }

  
//   Resumen
//   Usa if o if-else para decisiones de renderizado más largas.
//   Usa el operador ternario ? : para alternar entre dos elementos en una línea.
//   Usa && para mostrar un elemento solo si una condición es verdadera.
//   Devuelve null para omitir el renderizado de un componente.
//   Usa switch si tienes múltiples condiciones.