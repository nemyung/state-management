import { useState, useEffect } from "react";
//
//
type Callback = () => void;
type Setter<T> = (prev: T) => T;
export type Store<T> = {
  getState: () => T;
  setState: (next: T | Setter<T>) => void;
  subscribe: (callback: Callback) => () => void;
};

/**
 * Subscription mechanism
 * - subscription is a way to get 'notified of things' such as updates.
 * @example
 * ---
 * const unsubscribe = store.subscribe(() => {...})
 * ---
 *
 * - the store is just like container that holds state and update mechanism
 * - the only difference between container and store is that store has a subscribe method with which subscription mechanism is implemented
 * - we treate store as a module state.
 */
export function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const getState = () => state;
  //
  // subscription mechanism
  const callbacks = new Set<Callback>();
  const setState = (next: T | Setter<T>) => {
    state = typeof next === "function" ? (next as Setter<T>)(state) : next;
    // notify subscribed things
    callbacks.forEach((callback) => callback());
  };
  const subscribe = (callback: Callback) => {
    callbacks.add(callback);

    // unsubscribe
    return () => {
      callbacks.delete(callback);
    };
  };
  return { getState, setState, subscribe };
}

export function useStore<T>(store: Store<T>) {
  const [state, setState] = useState(() => store.getState());
  //
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // update fresh state
      setState(store.getState());
    });
    //
    // this is the fact that useEffect is delayed and there is a chance that store already has a new state.
    setState(store.getState());
    //
    return unsubscribe;
  }, [store]);
  //
  return [state, store.setState] as const;
}

export function useStoreSelector<T, S>(
  store: Store<T>,
  selector: (state: T) => S
): S {
  const [state, setState] = useState(() => selector(store.getState()));
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });
    setState(selector(store.getState()));
    return unsubscribe;
  }, [store, selector]);
  return state;
}
