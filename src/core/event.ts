// TS Generics are extremely important!
// https://www.typescriptlang.org/docs/handbook/2/generics.html
// For understanding types vs interfaces:
// https://stackoverflow.com/a/52682220/4935221

export type AnyPayload = Record<string, unknown>;


// EVENTS
// - An event represents a fact about something that
// has occured in a system. Examples include EmailSent,
// PackageReceived, UserSignedUp, etc. and are always
// in the past tense
// - Events also contain a payload of data relating to
// the whatever has just occured
// - See equivelent concept in Redux:
// https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions

export interface Event<T extends string, P extends AnyPayload> {
  tag: T;
  payload: P;
}

export type AnyEvent = Event<string, AnyPayload>;

// EVENT CONSTRUCTORS
// - An event constructor builds a particular
// type of event
// - events are always instantiated via the constructor
// rather than directly

export interface EventConstructor<
  T extends string,
  P extends AnyPayload
> {
  (payload: P): Event<T, P>;
}


// TODO: implement this function
// - This function should build an instance of an event
// constructor
// - This function signature uses currying/partial application
// to allow TS to do better automatic type inference and
// provide a more ergonomic API:
// const MyEvent = EventConstructor('MyEvent')<{ propA: string }>()
// instead of
// const MyEvent = EventConstructor<'MyEvent', { propA: string }>('MyEvent')
// - more about currying:
// https://blog.bitsrc.io/functional-programming-part-3-the-powers-of-currying-213eb69b234b

export function EventConstructor<T extends string>(
  tag: T
): <P extends AnyPayload>() => EventConstructor<T, P> {
  return function <P extends AnyPayload>(): EventConstructor<T, P> {
    return function (payload: P): Event<T, P> {
      return {
        tag,
        payload,
      };
    };
  };
}


