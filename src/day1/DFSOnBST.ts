export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    let node: BinaryNode<number> | null = head;
    let result: boolean = false;
    while (node) {
        if (node.value === needle) {
            result = true;
            break;
        }
        else if (node.value < needle) {
            node = node.right;
        }
        else {
            node = node.left;
        }
    }

    return result;
}