import {
  createContext,
  ReactNode,
  useSyncExternalStore,
  useRef,
  useContext,
} from "react";

type Callback = () => void;
type UpdateFn<T> = (next: T) => T;
type Store<T> = {
  getState: () => T;
  setState: (action: T | UpdateFn<T>) => void;
  subscribe: (callback: Callback) => () => void;
};

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const callbackSet = new Set<Callback>();
  const getState: Store<T>["getState"] = () => state;
  const subscribe: Store<T>["subscribe"] = (callback) => {
    callbackSet.add(callback);
    const unsubscribe = () => {
      callbackSet.delete(callback);
    };
    return unsubscribe;
  };
  const setState: Store<T>["setState"] = (nextStateOrFn) => {
    state =
      typeof nextStateOrFn === "function"
        ? (nextStateOrFn as UpdateFn<T>)(state)
        : nextStateOrFn;
    callbackSet.forEach((callback) => callback());
  };
  return { getState, setState, subscribe };
}

type ExampleState = { count: number; text: string };

const StoreContext = createContext<Store<ExampleState>>(
  createStore({ count: 0, text: "" })
);

export function StoreContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: ExampleState;
}) {
  const { current: store } = useRef(createStore(initialState));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useSelector<S>(selector: (state: ExampleState) => S) {
  const store = useContext(StoreContext);
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState())
  );
}

export function useSetState() {
  return useContext(StoreContext).setState;
}
