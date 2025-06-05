function dfs(node: BinaryNode<number>, out: number[]): number[] {
    if (!(node.left || node.right)) {
        out.push(node.value);
        return out;
    }

    if (node.left) {
        out = dfs(node.left, out);
    }
    
    if (node.right) {
        out = dfs(node.right, out);
    }
    
    out.push(node.value);
    return out;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    let out: number[] = [];
    const result = dfs(head, out);
    return result;
}