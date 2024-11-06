// useContext es un hook en React que permite acceder a un contexto dentro de un componente funcional. Los contextos son útiles cuando quieres compartir datos entre múltiples componentes sin necesidad de pasarlos manualmente a través de cada nivel del árbol de componentes (con props). Aquí tienes una guía básica:

// Paso 1: Crear el Contexto
// Primero, crea un contexto usando React.createContext:
import React, { createContext } from 'react';

// Creamos el contexto
const MiContexto = createContext();

// Paso 2: Crear un Proveedor (Provider)
// Un provider es el componente que "envuelve" a otros componentes y les proporciona acceso al contexto.
const MiProvider = ({ children }) => {
    const valorCompartido = "¡Hola desde el contexto!";
  
    return (
      <MiContexto.Provider value={valorCompartido}>
        {children}
      </MiContexto.Provider>
    );
  };

//   Paso 3: Consumir el Contexto en un Componente usando useContext
//   Ahora, en el componente que necesita acceder al contexto, usa el hook useContext para acceder al valor proporcionado:
import React, { useContext } from 'react';

const MiComponente = () => {
  const valor = useContext(MiContexto);

  return <div>{valor}</div>;
};

// Paso 4: Usar el Provider en el árbol de componentes
// Para que los componentes puedan acceder al contexto, debes envolverlos en el provider:
const App = () => {
    return (
      <MiProvider>
        <MiComponente />
      </MiProvider>
    );
  };

//   ?Ejemplo completo
  import React, { createContext, useContext } from 'react';

  // Crear el contexto
  const MiContexto2 = createContext();
  
  // Proveedor del contexto
  const MiProvider2 = ({ children }) => {
    const valorCompartido = "¡Hola desde el contexto!";
    return (
      <MiContexto.Provider value={valorCompartido}>
        {children}
      </MiContexto.Provider>
    );
  };
  
  // Componente que consume el contexto
  const MiComponente2 = () => {
    const valor = useContext(MiContexto2);
    return <div>{valor}</div>;
  };
  
  // Aplicación principal
  const App2 = () => {
    return (
      <MiProvider2>
        <MiComponente2 />
      </MiProvider2>
    );
  };
  
  export default App;
  