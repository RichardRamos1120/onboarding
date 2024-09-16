// run a specified io periodically
// ie. lifts setInterval into Promise
export function periodically(
  io: () => void,
  n: number
): Promise<void> {
  return new Promise(() => {
    setInterval(() => {
      io()
    }, n)
  })
}
