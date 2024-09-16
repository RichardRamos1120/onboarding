/* eslint-disable @typescript-eslint/no-empty-interface */
import * as S from '../data/struct.js'
import { Reducer, Projection } from '../core/index.js'

import { Todo, TodoTable } from './entities.js'
import { TodoAdded, TodoDone, TodoRemoved, TodoEvent } from './events.js';


// TODO: implement the latest todos feed reducer
// - this reducer will maintain a list of the titles of
// the last 5 todos
// - this reducer only needs to calculate a new state in
// response to TodoAdded events
// - use switch case to exhaustively match all possible tags:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// - return to the link on reducers:
// https://dev.to/reedbarger/what-is-a-reducer-in-javascript-a-complete-introduction-with-examples-ip1



export const reduceLatestTodoTitles: Reducer<string[], TodoEvent> = (state, event) => {
  switch (event.tag) {
    case 'TodoAdded':
      // Use type assertion to access the properties
      const addedEvent = event as TodoAdded;
      const newTitles = [addedEvent.title, ...state];
      return newTitles.slice(0, 5);
    default:
      return state;
  }
};

// Partially apply the reducer to the projection. To finish instantiating
// the projection, just provide an initial value
export const LatestTodoTitlesProjection = Projection(
  reduceLatestTodoTitles
)

// TODO: implement the todo table reducer
// - this reducer will maintain a dictionary of all todos,
// indexed by their ids
// - use switch case to exhaustively match all possible tags:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// - use the immutable update helpers from the struct namespace
// in data/struct.ts to insert, update and remove Todos from the
// dictionary in response to the appropriate events
// - use the Todo constructor defined in todos/entities.ts to
// construct new Todos

export const reduceTodoTable: Reducer<TodoTable, TodoEvent> = (state, event) => {
  switch (event.tag) {
    case 'TodoAdded':
      const addedEvent = event as TodoAdded;
      return {
        ...state,
        [addedEvent.id]: { tag: 'Todo', id: addedEvent.id, title: addedEvent.title, done: false },
      };
    case 'TodoDone':
      const doneEvent = event as TodoDone;
      return {
        ...state,
        [doneEvent.id]: { ...state[doneEvent.id], done: true },
      };
    case 'TodoRemoved':
      const removedEvent = event as TodoRemoved;
      const { [removedEvent.id]: _, ...rest } = state;
      return rest;
    default:
      return state;
  }
};


// Partially apply the reducer to the projection. To finish instantiating
// the projection, just provide an initial value
export const TodosTableProjection = Projection(reduceTodoTable)