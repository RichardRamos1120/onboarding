// REDUCER
// - a reducer takes a state (S) and an event (A)
// and returns a new state
// - this is the function accepted by Array.reduce:
// https://www.w3schools.com/jsref/jsref_reduce.asp
// - detailed explanation:
// https://dev.to/reedbarger/what-is-a-reducer-in-javascript-a-complete-introduction-with-examples-ip1

export interface Reducer<S, A> {
  (s: S, a: A): S
}

// PROJECTION
// - a projection maintains a state (S) that can be accessed
// via getState
// - the state can be updated by calling processEvent and
// providing an event (A)
// - detailed explanation of projections (stop at code example): 
// https://www.youtube.com/watch?v=bTRjO6JK4Ws

export interface Projection<S, A> {
  processEvent: (a: A) => void
  getState: () => S
}

// TODO: implement the projection constructor
// - this function should build an instance of a projection
// - again, use a closure to encapsulate the mutable variable
// that contains the current state
// - initialize the variable with the provided initialState
// - processEvent should use the provided reducer to 'step'
// the value of the state forward

export function Projection<S, A>(
  reducer: Reducer<S, A>
): (initialState: S) => Projection<S, A> {
  return (initialState) => {
    let state = initialState;

    return {
      processEvent: (event: A) => {
        // Use the reducer to update the state based on the event
        state = reducer(state, event);
      },
      getState: () => {
        // Return the current state
        return state;
      },
    };
  };
}
