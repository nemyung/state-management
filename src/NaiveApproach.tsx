import { useState, useEffect, Dispatch, SetStateAction } from "react";

// Assumes that this is a global state
let count = 0;

// We must trigger re-rendering consistently.
// Naive approach: having setState functions at the module level
const setStateFunctions = new Set<Dispatch<SetStateAction<number>>>();

function Comp1() {
  const [state, setState] = useState(count);
  const inc = () => {
    count += 1;
    setStateFunctions.forEach((setState) => {
      setState(count);
    });
  };

  useEffect(() => {
    setStateFunctions.add(setState);
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);
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
    setStateFunctions.forEach((setState) => {
      setState(count);
    });
  };

  useEffect(() => {
    setStateFunctions.add(setState);
    return () => {
      setStateFunctions.delete(setState);
    };
  }, []);
  return (
    <section style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <h2>Comp2</h2>
      <h3>count with current rendering: {state}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function NaiveApproach() {
  return (
    <>
      <Comp1 />

      <Comp2 />
    </>
  );
}

export default NaiveApproach;
