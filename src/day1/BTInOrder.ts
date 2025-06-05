function dfs(node: BinaryNode<number>, out: number[]): number[] {
    if (!(node.left || node.right)) {
        out.push(node.value);
        return out;
    }

    if (node.left) {
        out = dfs(node.left, out);
    }

    out.push(node.value);

    if (node.right) {
        out = dfs(node.right, out);
    }

    return out;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    let out: number[] = [];
    const result = dfs(head, out);
    return result;
}