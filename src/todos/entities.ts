// Define a Todo entity and a constructor
// Notice we include a tag whenever possible 
export interface Todo {
  tag: 'Todo';
  id: string;
  title: string;
  done: boolean;
}

// Implement the constructor for the Todo entity
// This function attaches a tag to the props object
export function Todo(props: Omit<Todo, 'tag'>): Todo {
  return {
    tag: 'Todo',
    ...props,  // Spread the rest of the props to the new object
  };
}

export type TodoTable = Record<string, Todo>;