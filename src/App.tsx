import { StoreContextProvider, useSelector, useSetState } from "./module-state";

function ExampleComponent() {
  const count = useSelector((state) => state.count);
  const setState = useSetState();
  const inc = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };
  return (
    <div>
      count: {count} <button onClick={inc}>++</button>
    </div>
  );
}

function App() {
  return (
    <>
      <h1>1. using default store</h1>
      <ExampleComponent />
      <ExampleComponent />

      <StoreContextProvider initialState={{ count: 100, text: "" }}>
        <h1>2. using store porvider. default count is 100</h1>
        <ExampleComponent />
        <ExampleComponent />
        <StoreContextProvider initialState={{ count: 1000, text: "" }}>
          <h1>2. using store porvider. default count is 1000</h1>
          <ExampleComponent />
          <ExampleComponent />
        </StoreContextProvider>
      </StoreContextProvider>
    </>
  );
}

export default App;
