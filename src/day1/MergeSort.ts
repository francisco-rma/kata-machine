function merge(left: number[], right: number[], target: number[]) {
    let left_idx: number = 0;
    let right_idx: number = 0;
    let k: number = 0;

    while (left_idx < left.length && right_idx < right.length) {
        if (left[left_idx] <= right[right_idx]) {
            target[k] = left[left_idx];
            left_idx += 1
        } else {
            target[k] = right[right_idx];
            right_idx += 1;
        }
        k += 1;
    } while (left_idx < left.length) {
        target[k] = left[left_idx];
        left_idx += 1
        k += 1;
    } while (right_idx < right.length) {
        target[k] = right[right_idx];
        right_idx += 1;
        k += 1;
    }

    return target;
}


function ms(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    let mid = Math.floor(arr.length / 2)

    let left = ms(arr.slice(0, mid));
    let right = ms(arr.slice(mid));

    merge(left, right, arr)
    return arr;
}
export default function merge_sort(arr: number[]): void {
    arr = ms(arr)
}