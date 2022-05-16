/**
 * Returns the last index of a value in `array` for which `callback` returns
 * `true`, or `-1`.
 */
export function findLastIndex<T>(
    array: T[], callback: (arg: T) => boolean): number {
  for (let j = array.length - 1; j > -1; j--) {
    if (callback(array[j])) return j;
  }
  return -1;
}
