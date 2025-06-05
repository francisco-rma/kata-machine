import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    let queue: Queue<BinaryNode<number>> = new Queue<BinaryNode<number>>();
    let visited: Set<BinaryNode<number>> = new Set<BinaryNode<number>>();

    queue.enqueue(head);
    let result: boolean = false;

    while (queue) {
        let node: BinaryNode<number> | undefined = queue.deque();
        if (!node) {
            break;
        }
        if (node.value === needle) {
            result = true;
            break;
        }
        if (node.left) {
            queue.enqueue(node.left);
        }
        if (node.right) {
            queue.enqueue(node.right);
        }
    }

    return result;
}