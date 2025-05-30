export default function bs_list(haystack: number[], needle: number): boolean {
    let left: number = 0;
    let right: number = haystack.length - 1;
    let mid: number;
    while (left <= right) {
        mid = Math.floor((left + right) / 2)
        const val = haystack[mid];
        if (val === needle) {
            return true;
        }
        else if (val < needle) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }

    return false;
}