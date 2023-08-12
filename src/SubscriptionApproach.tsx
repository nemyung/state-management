import { createStore, useStore } from "./store";

const countStore = createStore({ count: 0 });

function Comp1() {
  const [state, setState] = useStore(countStore);
  const inc = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  return (
    <section style={{ margin: 16, padding: 8, color: "skyblue" }}>
      <h2>Comp1</h2>
      <h3>count with current rendering: {state.count}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function Comp2() {
  const [state, setState] = useStore(countStore);
  const inc = () => {
    setState((prev) => ({ ...prev, count: prev.count + 2 }));
  };

  return (
    <section style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <h2>Comp2</h2>
      <h3>count with current rendering: {state.count}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function SubscriptionApproach() {
  return (
    <>
      <Comp1 />
      <Comp2 />
    </>
  );
}

export default SubscriptionApproach;
