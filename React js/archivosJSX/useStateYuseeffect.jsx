// El hook useState en React es una de las herramientas principales para manejar el estado dentro de los componentes funcionales. Permite declarar una variable de estado y una función para actualizarla, lo que permite que el componente reaccione a los cambios de estado y actualice la interfaz de usuario de acuerdo a esos cambios.

// ¿Cómo funciona useState?
// Cuando usas useState, estás definiendo:

// Una variable de estado: contiene el valor actual del estado.
// Una función para actualizar el estado: permite modificar el valor y hace que el componente se vuelva a renderizar cuando el estado cambia.

// Sintaxis de useState:
const [state, setState] = useState(initialValue);
// state: es la variable de estado que puedes usar en tu componente.
// setState: es la función que permite actualizar el valor de state.
// initialValue: es el valor inicial de state. Puede ser cualquier tipo de dato (número, cadena, objeto, etc.).

// Ejemplo básico de useState
// Aquí tienes un ejemplo de cómo usar useState en un componente funcional para crear un contador simple:
import React, { useState } from 'react';

function Counter() {
  // Declaramos una variable de estado "count" y la inicializamos en 0
  const [count, setCount] = useState(0);

  // Función para manejar el incremento del contador
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>El contador es: {count}</p>
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
}

export default Counter;
// En este ejemplo:
// Declaramos count como nuestra variable de estado y la inicializamos con 0.
// setCount se usa para actualizar el valor de count.
// La función handleIncrement usa setCount para incrementar el valor de count cada vez que se hace clic en el botón.

// Actualizaciones basadas en el estado previo
// Para evitar problemas con valores obsoletos del estado, podemos usar una función dentro de setCount que recibe el valor previo del estado:
const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  
//   Ejemplo de useState con un objeto
//   También puedes usar useState para almacenar objetos:
function UserInfo() {
    const [user, setUser] = useState({ name: 'Juan', age: 30 });
  
    const updateUser = () => {
      setUser(prevUser => ({
        ...prevUser,
        age: prevUser.age + 1,
      }));
    };
  
    return (
      <div>
        <p>Nombre: {user.name}</p>
        <p>Edad: {user.age}</p>
        <button onClick={updateUser}>Cumplir años</button>
      </div>
    );
  }
//   Aquí, setUser actualiza solo la propiedad age sin modificar el resto de las propiedades del objeto user.

//   Consideraciones importantes
//   Re-renderizado: Cuando llamas a setState, React vuelve a renderizar el componente, actualizando la UI.
//   Inicialización única: El valor inicial de useState solo se establece una vez, cuando el componente se monta.  



// useEffect es un hook en React que permite manejar efectos secundarios en componentes funcionales. Los efectos secundarios incluyen operaciones como llamadas a APIs, actualizaciones de DOM, temporizadores, y cualquier acción que no afecte directamente al renderizado, pero que necesita ejecutarse en respuesta a cambios en el componente.

// ¿Cómo funciona useEffect?
// useEffect se ejecuta después de que el componente se ha renderizado, y puede ejecutarse de nuevo si ciertos valores cambian. La sintaxis básica de useEffect es:
useEffect(() => {
    // Código del efecto
    return () => {
      // Código de limpieza (opcional)
    };
  }, [dependencias]);
//   Función de efecto: el primer argumento es una función que contiene el código a ejecutar.
//   Limpieza: opcionalmente, puedes devolver una función para limpiar el efecto (por ejemplo, para limpiar un temporizador o cancelar una suscripción).
//   Dependencias: el segundo argumento es un arreglo que especifica cuándo debe volver a ejecutarse el efecto.  

// Ejemplo básico de useEffect
// Imaginemos que queremos mostrar un mensaje en la consola cada vez que el componente se renderiza:
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("El componente se ha renderizado o el estado ha cambiado.");

    // Limpiar si fuera necesario
    return () => {
      console.log("Limpiando efecto.");
    };
  }, [count]);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}

// export default MyComponent;

// En este caso:
// console.log se ejecuta cada vez que cambia count.
// Si el componente se desmonta o se vuelve a ejecutar el efecto, se ejecuta la función de limpieza.

// Dependencias en useEffect
// El arreglo de dependencias le indica a useEffect cuándo debe ejecutarse:

// Sin dependencias ([]): el efecto solo se ejecuta una vez, después del primer renderizado (comportamiento similar a componentDidMount en componentes de clase).
useEffect(() => {
    console.log("Este efecto se ejecuta solo una vez.");
  }, []);

  
//   Con dependencias ([dependencias]): el efecto se ejecuta cuando cualquiera de las dependencias cambia. Esto es útil cuando quieres actualizar el efecto basado en cambios de ciertos valores.
useEffect(() => {
    console.log("El efecto se ejecuta cuando `count` cambia.");
  }, [count]);
//   Sin el arreglo de dependencias: si omites el arreglo, el efecto se ejecuta en cada renderizado, lo que puede ser costoso y generalmente no es recomendado.  


// Ejemplo práctico con fetch y useEffect
// Supongamos que deseas cargar datos de una API cuando el componente se monta:
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener datos
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      {loading ? <p>Cargando...</p> : <p>Datos: {JSON.stringify(data)}</p>}
    </div>
  );
}

// export default DataFetcher;

// En este ejemplo:
// fetchData se llama una sola vez cuando el componente se monta.
// setData actualiza el estado con los datos obtenidos de la API.
// loading indica si los datos aún están cargando.

// ?Limpieza de efectos
// Si tienes efectos como temporizadores o suscripciones, es importante limpiarlos para evitar fugas de memoria. Esto se hace retornando una función de limpieza en useEffect.
useEffect(() => {
    const timer = setInterval(() => {
      console.log("Temporizador activo");
    }, 1000);
  
    return () => {
      clearInterval(timer); // Limpia el temporizador
      console.log("Temporizador detenido");
    };
  }, []);
  
