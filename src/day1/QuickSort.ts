function partition(arr: number[], left: number, right: number): number {
    let pivot: number = arr[right];
    let i: number = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i += 1;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    i += 1;
    const temp = arr[i];
    arr[i] = arr[right];
    arr[right] = temp;

    return i;
}

function qs(arr: number[], left: number, right: number) {
    if (right - left <= 0) {
        return;
    }

    let pivot = partition(arr, left, right);
    qs(arr, left, pivot - 1);
    qs(arr, pivot + 1, right);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}