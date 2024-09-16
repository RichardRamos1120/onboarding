/* eslint-disable @typescript-eslint/no-empty-interface */
import { EventConstructor } from '../core/index.js'

// TODO EVENTS
// These events describe the things that can happen in our system.
// Here we derive constructors for and interfaces describing these events. 
// Lastly, we export a union type called TodoEvent that represents
// all possible events 

export const TodoAdded = EventConstructor('TodoAdded')<{
  id: string
  title: string
}>()
export interface TodoAdded extends ReturnType<typeof TodoAdded> {
  title: any;
  id: any;
}
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
// for documentation on ReturnType

export const TodoRemoved = EventConstructor('TodoRemoved')<{
  id: string
}>()
export interface TodoRemoved extends ReturnType<typeof TodoRemoved> {
  id: any;
}

export const TodoDone = EventConstructor('TodoDone')<{
  id: string
}>()
export interface TodoDone extends ReturnType<typeof TodoDone> {
  id: any;
}

export type TodoEvent = TodoAdded | TodoRemoved | TodoDone
// See https://basarat.gitbook.io/typescript/type-system/discriminated-unions
// for documentation on discrimated union types
