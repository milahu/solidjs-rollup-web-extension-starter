import {createSignal} from "solid-js"

export function Counter() {
  const [get, set] = createSignal(0);
  const increment = () => set(val => val + 1);
  const decrement = () => set(val => val - 1);
  return (
    <main>
      <p data-testid="counter-value" class="text-xl text-center">{get()}</p>
      <div class="flex text-xl text-white">
        <button class="px-4 py-1 bg-red-500" onClick={decrement}>-</button>
        <button class="px-4 py-1 bg-green-500" onClick={increment}>+</button>
      </div>
    </main>
  )
}
