// Los Custom Hooks en React son una forma de reutilizar lógica en componentes funcionales. Son funciones personalizadas que utilizan hooks internos de React (como useState, useEffect, etc.) para encapsular y compartir lógica entre componentes sin duplicar código.

// ¿Por qué usar Custom Hooks?
// A medida que desarrollas aplicaciones en React, puedes encontrar que algunos componentes necesitan realizar operaciones similares, como manejar el estado de un formulario, cargar datos de una API, o manejar eventos. En lugar de repetir la misma lógica en varios componentes, puedes encapsularla en un Custom Hook.

// Los Custom Hooks te permiten extraer esta lógica en una función y luego reutilizarla en cualquier componente, manteniendo el código más limpio, modular y fácil de mantener.

// ¿Cómo funcionan los Custom Hooks?
// Un Custom Hook es simplemente una función que sigue las mismas reglas que cualquier otro hook en React:

// Usan otros hooks: Los Custom Hooks deben usar hooks de React, como useState, useEffect, o cualquier otro hook nativo o personalizado.
// Nomenclatura: Su nombre siempre comienza con "use" (como useForm, useFetch, etc.) para que React pueda identificarlo como un hook y aplicar las reglas de hooks.
// Son funciones puras: Los Custom Hooks deben ser funciones puras, es decir, no deben modificar el DOM o generar efectos colaterales fuera de lo que los hooks permiten.
// Ejemplo básico de un Custom Hook
// Imaginemos que necesitas una funcionalidad para manejar el estado de un contador en varios componentes. En lugar de escribir la lógica de useState y la función de incremento en cada componente, podemos crear un Custom Hook llamado useCounter.
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

export default useCounter;
// Este Custom Hook, useCounter, nos permite manejar el estado del contador y las funciones para incrementar o decrementar el valor.

// Usando el Custom Hook en un componente
// Ahora que tenemos useCounter, podemos usarlo en cualquier componente de la misma manera que usaríamos un hook normal.
import React from 'react';
import useCounter from './useCounter';

function CounterComponent() {
  const { count, increment, decrement } = useCounter(10); // Iniciamos con el valor 10

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
    </div>
  );
}
// ?export default CounterComponent;

// Ejemplo de Custom Hook con useEffect
// Imaginemos otro ejemplo en el que queremos encapsular la lógica para hacer una petición de datos desde una API. Un Custom Hook useFetch puede manejar esto.
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la solicitud");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
// ?export default useFetch;

// Usando useFetch en un componente
// Puedes usar useFetch para cargar datos en cualquier componente de manera sencilla:
import React from 'react';
import useFetch from './useFetch';

function DataComponent() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Datos:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
// ?export default DataComponent;

// !Ventajas de usar Custom Hooks
// Reutilización de lógica: Puedes usar la misma lógica en múltiples componentes sin duplicar código.
// Código más limpio: Los Custom Hooks ayudan a separar la lógica del estado de la interfaz, haciendo que los componentes sean más fáciles de entender.
// Separación de responsabilidades: Permiten organizar la lógica del negocio o de manipulación de datos en una función separada, manteniendo los componentes más enfocados en la UI.
// Facilidad de pruebas: Al encapsular la lógica en un hook, es más fácil de probar y mantener.

// !Consideraciones importantes
// Reglas de los hooks: Los Custom Hooks deben seguir las reglas de hooks, como usarse solo en el nivel superior de un componente o hook, y no condicionalmente dentro de bloques if, for, etc.
// Función pura: Un Custom Hook debe comportarse como una función pura, sin efectos secundarios fuera de lo permitido por otros hooks internos.


