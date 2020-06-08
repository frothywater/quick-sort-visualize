import { Entry, Frame } from './typings';

export default function quickSortHistory(entries: Entry[], random = false) {
  let currPivotIndex: number | undefined;
  let currIntervalLeft: number | undefined;
  let currIntervalRight: number | undefined;

  const history: Frame[] = [cloneEntries(entries)];

  function cloneEntries(entries: Entry[]): Frame {
    return {
      entries: entries.map((entry) => ({ ...entry })),
      pivot: currPivotIndex,
      interval: [currIntervalLeft, currIntervalRight],
    };
  }

  function swap(array: Entry[], a: number, b: number) {
    if (a === b) return;
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;

    history.push(cloneEntries(array));
  }

  // Return index of the pivot.
  function partition(array: Entry[], left: number, right: number): number {
    const pivotIndex = random
      ? Math.floor(left + (right - left) * Math.random())
      : Math.floor((left + right) / 2);

    currPivotIndex = array[pivotIndex].index;
    let pivot = array[pivotIndex].value;

    let i = left;
    let j = right;
    while (true) {
      while (array[i].value < pivot) i++;
      while (array[j].value > pivot) j--;
      if (i >= j) {
        currPivotIndex = undefined;
        return j;
      }
      swap(array, i, j);
      i++;
      j--;
    }
  }

  function quickSort(array: Entry[], left = 0, right = array.length - 1) {
    if (left < right) {
      currIntervalLeft = left;
      currIntervalRight = right;

      const pivotIndex = partition(array, left, right);

      currIntervalLeft = undefined;
      currIntervalRight = undefined;

      quickSort(array, left, pivotIndex);
      quickSort(array, pivotIndex + 1, right);
    }
  }

  quickSort(entries);

  history.push(cloneEntries(entries));
  return history;
}
