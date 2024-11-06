// useReducer es un hook en React que permite gestionar el estado de un componente de forma más compleja que con useState, especialmente cuando el estado tiene múltiples valores o cuando necesitas manejar lógica compleja para actualizarlo. Es similar a cómo funcionan los reducers en Redux, donde defines acciones que afectan el estado de diferentes maneras.

// Sintaxis Básica
const [state, dispatch] = useReducer(reducer, initialState);
// reducer: Es una función que recibe el estado actual y una acción, y devuelve el nuevo estado.
// initialState: Es el estado inicial.
// state: El estado actual.
// dispatch: Una función que se usa para enviar acciones al reducer.


// Ejemplo Paso a Paso
// Supongamos que tienes un contador que quieres incrementar y decrementar con botones.

// !Paso 1: Definir el reducer
// Primero, crea una función reducer que recibirá el estado actual y la acción, y devolverá el nuevo estado dependiendo de la acción.
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
// En este caso:
// increment: Suma 1 al contador.
// decrement: Resta 1 del contador.

// !Paso 2: Usar useReducer en el Componente
// Ahora, en el componente, inicializa el estado con useReducer y usa dispatch para enviar acciones.
import React, { useReducer } from 'react';

const Contador = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrementar</button>
    </div>
  );
};

// !Paso 3: Renderizar el Componente
// Simplemente incluye el componente Contador en tu aplicación:
const App = () => <Contador />;
export default App;

// ?Explicación Detallada
// useReducer Inicializa el Estado: Cuando llamas a useReducer(reducer, initialState), React utiliza el initialState como estado inicial y el reducer para manejar las actualizaciones de estado.
// dispatch Envía Acciones: Al hacer clic en los botones, se llama a dispatch con un objeto de acción { type: 'increment' } o { type: 'decrement' }.
// El Reducer Maneja la Lógica: La función reducer recibe el estado actual y la acción. Dependiendo de action.type, devuelve un nuevo estado actualizado, que React usa para actualizar el componente.


// Resumen
// useReducer es útil para manejar estados complejos o con lógica avanzada.
// El reducer define cómo se actualiza el estado en función de las acciones enviadas.
// dispatch permite enviar acciones que cambian el estado.
// Este patrón es especialmente útil en aplicaciones grandes, y puede usarse junto con useContext para manejar el estado global en una aplicación React sin necesidad de Redux.



// !useReducer con useContext
// Combinar useReducer con useContext en React es una técnica útil para gestionar un estado global complejo en toda la aplicación sin tener que pasar props manualmente. Aquí te muestro un ejemplo donde crearemos un contexto con useReducer y lo usaremos en varios componentes para manejar un contador.

// Ejemplo Completo
// Vamos a crear una aplicación con tres partes:

// Un contexto para el estado del contador.
// Un reducer para manejar las acciones de incrementar y restablecer.
// Componentes que consumen el contexto para mostrar y actualizar el contador.

// !Paso 1: Crear el Contexto y el Reducer
// Primero, definimos el contexto y el reducer que maneja las acciones sobre el estado del contador.
import React, { createContext, useReducer, useContext } from 'react';

// Estado inicial del contador
const initialState2 = { count: 0 };

// Reducer que maneja las acciones del contador
function contadorReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

// Crear el contexto
const ContadorContext = createContext();

// !Paso 2: Crear el Proveedor del Contexto con useReducer
// Ahora creamos un componente ContadorProvider que utilizará useReducer para manejar el estado del contador. Este componente envolverá a toda la aplicación para que los componentes internos puedan acceder al estado del contador.
const ContadorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contadorReducer, initialState);
  
    return (
      <ContadorContext.Provider value={{ state, dispatch }}>
        {children}
      </ContadorContext.Provider>
    );
  };

//   !Paso 3: Crear Componentes que Consuman el Contexto
//   Ahora creamos dos componentes:
  
//   MostrarContador: muestra el valor del contador.
//   ContadorBotones: contiene los botones para incrementar y restablecer el contador.
// Componente que muestra el valor del contador
const MostrarContador = () => {
    const { state } = useContext(ContadorContext);
    return <h1>Contador: {state.count}</h1>;
  };
  
  // Componente que contiene botones para incrementar y restablecer el contador
  const ContadorBotones = () => {
    const { dispatch } = useContext(ContadorContext);
  
    return (
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>Incrementar</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Restablecer</button>
      </div>
    );
  };

//   !Paso 4: Usar el Proveedor en el Árbol de Componentes
//   En la aplicación principal, envuelve los componentes dentro de ContadorProvider para que puedan acceder al contexto del contador.
const App3 = () => {
    return (
      <ContadorProvider>
        <MostrarContador />
        <ContadorBotones />
      </ContadorProvider>
    );
  };
  
//   ?export default App3;


// !Explicación Paso a Paso
// Definir el Reducer: contadorReducer maneja dos tipos de acciones: 'increment' para aumentar el contador y 'reset' para restablecerlo a 0.
// Crear el Contexto y el Provider: ContadorProvider inicializa el estado del contador con useReducer y expone tanto el estado (state) como la función dispatch a través del contexto (ContadorContext).
// Consumir el Contexto en Componentes:
// MostrarContador accede a state desde el contexto para mostrar el valor actual del contador.
// ContadorBotones usa dispatch para enviar las acciones 'increment' y 'reset' al reducer.
// Usar el Proveedor: Finalmente, ContadorProvider envuelve el árbol de componentes en App, permitiendo a todos los componentes hijos acceder al estado y a las funciones del contador sin necesidad de pasar props manualmente.
  

