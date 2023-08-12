// Module State
// - ECMAScript Module 또는 파일의 스코프에 있는 변수에 바인딩 된 값
// - Instead of defining a module state directly, we can create a factory function for creating container
// - that includes state and some access/setter function
export function createContainer<TState>(initialState: TState) {
  type Setter = (prev: TState) => TState;
  const isSetter = (value: unknown): value is Setter =>
    typeof value === "function";
  //
  let state: TState = initialState;
  const getState = () => state;
  const setState = (nextState: TState | Setter) => {
    state = isSetter(nextState) ? nextState(state) : nextState;
  };
  return { getState, setState };
}

const { getState, setState } = createContainer({ count: 1 });
console.log(getState());
setState({ count: 10 });
console.log(getState());
