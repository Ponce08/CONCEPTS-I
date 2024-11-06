// En React, useRef y useCallback son hooks que cumplen funciones específicas para mejorar la gestión de referencias y la optimización de funciones respectivamente. Veamos cómo funcionan y ejemplos para cada uno.

// !¿Qué es useRef?
// useRef es un hook en React que permite crear una referencia mutable que persiste a través de renderizados sin causar un re-renderizado del componente. Es útil para:

// Acceder directamente al DOM de un elemento.
// Almacenar cualquier valor que quieras que persista entre renderizados, sin que cambiar ese valor vuelva a renderizar el componente.
// Sintaxis:
const referencia = useRef(valorInicial);

// valorInicial: Es el valor inicial de la referencia (por defecto es null).
// La propiedad .current contiene el valor de la referencia.

// !Ejemplo de useRef para Manipular el DOM
// En este ejemplo, crearemos un campo de texto que automáticamente recibe el foco al montarse el componente.
import React, { useRef, useEffect } from 'react';

const InputConFoco = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Al montarse el componente, enfocamos el campo de texto
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} placeholder="Escribe aquí..." />;
};

export default InputConFoco;

// !Ejemplo de useRef para Guardar un Valor entre Renderizados
// Aquí, usamos useRef para contar cuántas veces se ha renderizado el componente sin que eso dispare un nuevo renderizado.
import React, { useRef, useState } from 'react';

const ContadorDeRender = () => {
  const renderCount = useRef(0);
  const [count, setCount] = useState(0);

  renderCount.current += 1;

  return (
    <div>
      <p>Renderizado: {renderCount.current} veces</p>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar Contador</button>
    </div>
  );
};

// ?export default ContadorDeRender;


// !useCallback
// ¿Qué es useCallback?
// useCallback es un hook que se utiliza para "memorizar" funciones en React, es decir, hacer que React recuerde una función específica entre renderizados. Esto es útil en dos escenarios principales:

// Optimización de componentes hijos: Evita que React recree una función en cada renderizado, lo que puede mejorar el rendimiento de componentes que dependen de dicha función.
// Dependencias de efectos: Útil cuando pasamos una función a otro hook, como useEffect, y queremos evitar que el efecto se vuelva a ejecutar innecesariamente.
// Sintaxis:
const funcionMemorizada = useCallback(() => {
    // lógica de la función
  }, [dependencias]);
//   dependencias: Lista de dependencias que, cuando cambian, hacen que useCallback vuelva a crear la función.


// !Ejemplo Básico de useCallback
// Supongamos que tenemos un componente Lista que recibe una función para filtrar sus elementos. Usaremos useCallback para evitar que se recree esa función innecesariamente, mejorando el rendimiento.
import React, { useState, useCallback } from 'react';

const Lista = ({ obtenerItems }) => {
  const items = obtenerItems();
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [contador, setContador] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const obtenerItems = useCallback(() => {
    return [inputValue, inputValue + contador, inputValue + (contador + 1)];
  }, [inputValue, contador]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe algo"
      />
      <button onClick={() => setContador((c) => c + 1)}>Incrementar Contador</button>
      <Lista obtenerItems={obtenerItems} />
    </div>
  );
};

// ?export default App;


// En este ejemplo:
// useCallback asegura que obtenerItems solo se actualice cuando inputValue o contador cambian, lo que evita que el componente Lista se vuelva a renderizar innecesariamente.
// Cuándo Usar useCallback
// Cuando una función depende de variables de estado o props y se pasa como prop a un componente hijo.
// En casos de componentes que se renderizan frecuentemente, useCallback ayuda a optimizar el rendimiento, evitando recreaciones de funciones.


