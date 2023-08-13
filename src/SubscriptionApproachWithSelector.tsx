import { useCallback } from "react";
import { createStore, useStoreSelector } from "./store";

const countStore = createStore({ count1: 0, count2: 0 });

function Comp1() {
  const state = useStoreSelector(
    countStore,
    useCallback((state) => state.count1, [])
  );
  const inc = () => {
    countStore.setState((prev) => ({ ...prev, count1: prev.count1 + 1 }));
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
  const state = useStoreSelector(
    countStore,
    useCallback((state) => state.count2, [])
  );
  const inc = () => {
    countStore.setState((prev) => ({ ...prev, count2: prev.count2 + 2 }));
  };

  return (
    <section style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <h2>Comp2</h2>
      <h3>count with current rendering: {state}</h3>
      <button onClick={() => inc()}>++</button>
    </section>
  );
}

function SubscriptionApproachWithSelector() {
  return (
    <>
      <Comp1 />
      <Comp2 />
    </>
  );
}

export default SubscriptionApproachWithSelector;
