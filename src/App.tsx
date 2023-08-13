import { proxy, useSnapshot } from "valtio";

const state = proxy({
  count1: 0,
  count2: 0,
});

const Counter1 = () => {
  const snap = useSnapshot(state);
  const inc = () => ++state.count1;
  return (
    <div style={{ margin: 16, padding: 8, color: "skyblue" }}>
      <p>count1: {snap.count1}</p>
      <button onClick={inc}>++</button>
    </div>
  );
};

const Counter2 = () => {
  const snap = useSnapshot(state);
  const inc = () => ++state.count2;
  return (
    <div style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <p>count2: {snap.count2}</p>
      <button onClick={inc}>++</button>
    </div>
  );
};

function App() {
  // const { count } = useStore();
  return (
    <main>
      <Counter1 />
      <Counter2 />
    </main>
  );
}

export default App;
