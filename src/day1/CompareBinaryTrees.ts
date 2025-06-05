import Queue from "./Queue";

function equals(a: BinaryNode<number>, b: BinaryNode<number>) {
    return (a.value === b.value
        && a.left?.value === b.left?.value
        && a.right?.value === b.right?.value
    )
}
function double_walk(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    if (!a || !b) {
        return false;
    }
    let queue: Queue<[BinaryNode<number>, BinaryNode<number>]> = new Queue<[BinaryNode<number>, BinaryNode<number>]>();
    queue.enqueue([a, b])

    let result = true;
    while (queue) {
        const pair = queue.deque();
        if (!pair) {
            break;
        }
        const [x, y] = pair;
        if (!equals(x, y)) {
            result = false;
            break;
        }
        if (x.left && y.left) {
            queue.enqueue([x.left, y.left]);
        }
        if (x.right && y.right) {
            queue.enqueue([x.right, y.right]);
        }
    }
    return result;
}
export default function compare(a: BinaryNode<number> | null, b: BinaryNode<number> | null): boolean {
    return double_walk(a, b);
}