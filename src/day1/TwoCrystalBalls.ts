export default function two_crystal_balls(breaks: boolean[]): number {
    let left: number = 0;
    let right: number = breaks.length - 1;
    let mid: number;

    while (left <= right) {
        mid = Math.floor(left + ((right - left) / 2));

        if (mid < breaks.length - 1 && breaks[mid + 1] !== breaks[mid]) {
            return mid + 1;
        }
        else if (mid > 0 && breaks[mid - 1] !== breaks[mid]) {
            return mid;
        }
        else if (breaks[mid] === false) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }

    return -1;
}