
type TodoEvent =
  | { type: 'TodoAdded'; payload: { id: string; title: string; } }
  | { type: 'TodoDone'; payload: { id: string; } }
  | { type: 'TodoRemoved'; payload: { id: string; } };

const reduceLatestTodoTitles = (acc: string[], event: TodoEvent): string[] => {
  if (event.type === 'TodoAdded') {
    return [...acc, event.payload.title];
  }
  return acc;
};

const reduceTodoTable = (acc: { [id: string]: { tag: string; id: string; title: string; done: boolean; } }, event: TodoEvent): { [id: string]: { tag: string; id: string; title: string; done: boolean; } } => {
  if (event.type === 'TodoAdded') {
    const { id, title } = event.payload;
    return {
      ...acc,
      [id]: { tag: 'todo', id, title, done: false },
    };
  }
  if (event.type === 'TodoDone') {
    const { id } = event.payload;
    return {
      ...acc,
      [id]: { ...acc[id], done: true },
    };
  }
  if (event.type === 'TodoRemoved') {
    const { id } = event.payload;
    const { [id]: _, ...rest } = acc;
    return rest;
  }
  return acc;
};

describe('Todo projections', () => {
  it('should accumulate the latest todo titles', () => {
    const events: TodoEvent[] = [
      { type: 'TodoAdded', payload: { id: '1', title: 'First Todo' } },
      { type: 'TodoAdded', payload: { id: '2', title: 'Second Todo' } },
    ];
    const result = events.reduce(reduceLatestTodoTitles, []);
    expect(result).toEqual(['First Todo', 'Second Todo']);
  });

  it('should build a todo table from events', () => {
    const events: TodoEvent[] = [
      { type: 'TodoAdded', payload: { id: '1', title: 'First Todo' } },
      { type: 'TodoAdded', payload: { id: '2', title: 'Second Todo' } },
      { type: 'TodoDone', payload: { id: '1' } },
      { type: 'TodoRemoved', payload: { id: '2' } },
    ];
    const result = events.reduce(reduceTodoTable, {});
    expect(result).toEqual({
      '1': { tag: 'todo', id: '1', title: 'First Todo', done: true },
    });
  });
});
