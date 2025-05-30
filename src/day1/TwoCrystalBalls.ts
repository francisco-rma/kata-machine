export default function two_crystal_balls(breaks: boolean[]): number {
    const shift: number = Math.floor(Math.sqrt(breaks.length))
    let idx: number = shift;

    for (; idx < breaks.length; idx += shift) {
        if (breaks[idx]) {
            break;
        }
    }

    for (let j = idx - shift; j < idx; j += 1) {
        if (breaks[j]) {
            return j;
        }
    }

    return -1;
}