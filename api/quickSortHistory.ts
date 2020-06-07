import { Entry, Frame } from './typings';

export default function quickSortHistory(entries: Entry[]) {
  const history: Frame[] = [{ entries: [...entries] }];

  let currPivotIndex: number | undefined;
  let currIntervalLeft: number | undefined;
  let currIntervalRight: number | undefined;

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
    const pivotIndex = right;
    currPivotIndex = array[pivotIndex].index;
    const pivotValue = array[pivotIndex].value;
    let index = left - 1;

    for (let i = left; i < right; i++) {
      if (array[i].value < pivotValue) swap(array, ++index, i);
    }

    swap(array, index + 1, pivotIndex);
    currPivotIndex = undefined;

    return index + 1;
  }

  function quickSort(array: Entry[], left = 0, right = array.length - 1) {
    if (left < right) {
      currIntervalLeft = left;
      currIntervalRight = right;

      const pivotIndex = partition(array, left, right);

      currIntervalLeft = undefined;
      currIntervalRight = undefined;

      quickSort(array, left, pivotIndex - 1);
      quickSort(array, pivotIndex + 1, right);
    }
  }

  quickSort(entries);

  history.push(cloneEntries(entries));
  return history;
}
