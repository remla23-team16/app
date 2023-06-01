export function mean<T>(arr: T[], numberPicker: (value: T) => number) {
  return arr.reduce((acc, value) => acc + numberPicker(value), 0) / arr.length;
}

export function getFrequency(nums: number[]): { [num: number]: number } {
  const freq: { [num: number]: number } = {};
  for (const num of nums) {
    freq[num] ??= 0;
    freq[num]++;
  }
  return freq;
}
