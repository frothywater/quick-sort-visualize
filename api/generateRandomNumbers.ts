export default function generateRandomNumbers(count: number): number[] {
  const array = new Array<number>(count);
  for (let i = 0; i < count; i++) array[i] = Math.random();
  return array;
}
