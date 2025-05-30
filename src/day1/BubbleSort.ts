export default function bubble_sort(arr: number[]): void {
    for (let limit = arr.length - 1; limit > 0; limit--) {
        let i: number = 0;
        while (i < limit) {
            if (arr[i] > arr[i + 1]) {
                const aux = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = aux;
            }
            i += 1;
        }
    }
}