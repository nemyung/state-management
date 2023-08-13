import { create } from "zustand";

type StoreState = {
  count1: number;
  count2: number;
  inc1: () => void;
  inc2: () => void;
};
const useStore = create<StoreState>((setState) => ({
  count1: 0,
  count2: 0,
  inc1: () => setState((prev) => ({ count1: prev.count1 + 1 })),
  inc2: () => setState((prev) => ({ count2: prev.count2 + 1 })),
}));

const selectCount1 = (state: StoreState) => state.count1;
const selectInc1 = (state: StoreState) => state.inc1;
const Counter1 = () => {
  const count1 = useStore(selectCount1);
  const inc = useStore(selectInc1);

  return (
    <div style={{ margin: 16, padding: 8, color: "skyblue" }}>
      <h1>Counter1</h1>
      <p>count1: {count1}</p>
      <button onClick={inc}>++</button>
    </div>
  );
};

const selectCount2 = (state: StoreState) => state.count2;
const selectInc2 = (state: StoreState) => state.inc2;
const Counter2 = () => {
  const count2 = useStore(selectCount2);
  const inc = useStore(selectInc2);

  return (
    <div style={{ margin: 16, padding: 8, color: "hotpink" }}>
      <h1>Counter2</h1>
      <p>count2: {count2}</p>
      <button onClick={inc}>++</button>
    </div>
  );
};

function App() {
  // const { count } = useStore();
  return (
    <>
      <main>
        <Counter1 />
        <Counter2 />
      </main>
    </>
  );
}

export default App;
