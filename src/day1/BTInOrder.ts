function dfs(node: BinaryNode<number>, out: number[]): number[] {
    if (!(node.left || node.right)) {
        console.log("Leaf node: ", node);
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

    console.log("result: ", out);
    return out;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    let out: number[] = [];
    const result = dfs(head, out);
    return result;
}