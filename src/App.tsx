import { useState } from "react";
// Assumes that this is a global state
let count = 0;

function Comp1() {
  const [state, setState] = useState(count);
  const inc = () => {
    count += 1;
    setState(count);
  };
  return (
    <section style={{ margin: 16, padding: 8, color: "skyblue" }}>
      <h2>Comp1</h2>
      <h3>count with current rendering: {state}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function Comp2() {
  const [state, setState] = useState(count);
  const inc = () => {
    count += 2;
    setState(count);
  };
  return (
    <section style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <h2>Comp2</h2>
      <h3>count with current rendering: {state}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function App() {
  return (
    <>
      <Comp1 />

      <Comp2 />
    </>
  );
}

export default App;
