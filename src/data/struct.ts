// STRUCT

// IMMUTABLE UPDATES IN TYPESCRIPT
// all these functions should operate immutably meaning they always 
// return a new record and never modify the original record  
// https://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/

// PURE FUNCTIONS
// all these functions should also be pure functions, meaning
// - they depend only on the data provided as parameters
// - they do not touch mutable state in any way 
// - they always return the same value given the same parameters

// Remove the target key from a provided record
// If the target key does not exist, the behavior of the function is equivalent to a deep copy
export function removeAt<R extends Record<string, unknown>>(
  record: R,
  key: string
): R {
  const { [key]: _, ...rest } = record;
  return rest as R;
}

// Insert a value at the target key in the provided record
// If the target key already exists, its value is updated using the new value
export function insertAt<A>(
  record: Record<string, A>,
  key: string,
  value: A
): Record<string, A> {
  return {
    ...record,
    [key]: value,
  };
}

// Update a value in the record at the target key using the provided function
// If the target key does not exist, the behavior of the function is equivalent to a deep copy
export function updateAt<A>(
  record: Record<string, A>,
  key: string,
  fn: (a: A) => A
): Record<string, A> {
  if (key in record) {
    return {
      ...record,
      [key]: fn(record[key]),
    };
  }
  return { ...record };
}