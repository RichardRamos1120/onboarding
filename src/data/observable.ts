import * as A from '../data/array.js'


export type ListenerCallback<A> = (a: A) => void

export interface Observable<A> {
  dispatch: (a: A) => void
  addListener: (fn: ListenerCallback<A>) => void
}

export function Observable<A>(initialValues: A[]): Observable<A> {
  const values = A.deepCopy(initialValues)
  const listeners: ListenerCallback<A>[] = []
  return {
    addListener: (cb: ListenerCallback<A>) => {
      listeners.push(cb)
      
      values.forEach(cb)
    },
    
    dispatch: (a: A) => {
      values.push(a) 
      
      listeners.forEach(listener => listener(a))
    }
  }
}
