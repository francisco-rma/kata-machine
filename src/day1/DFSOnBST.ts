export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    let node: BinaryNode<number> | null = head;
    let parent: BinaryNode<number> | null = head;
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

function validation_walk(node: BinaryNode<number> | null, result: boolean): boolean {
    if (!node) {
        return true;
    }
    if (node.left && node.left.value > node.value) {
        return false;
    }
    if (node.right && node.right.value <= node.value) {
        return false;
    }

    const left_walk = validation_walk(node.left, result);
    const right_walk = validation_walk(node.right, result);
    return result && left_walk && right_walk;
}
export function is_valid(head: BinaryNode<number>): boolean {
    return validation_walk(head, true);
}


export function df_parent_search(head: BinaryNode<number>, needle: number): BinaryNode<number> {
    let node: BinaryNode<number> | null = head;
    let parent: BinaryNode<number> | null = null;

    while (node) {
        if (needle > node.value) {
            parent = node;
            node = node.right;
        }
        else {
            parent = node;
            node = node.left;
        }
    }

    if (!parent) {
        return head;
    }
    return parent;
}

export function dfs_insert(head: BinaryNode<number>, new_item: number): [BinaryNode<number> | null, BinaryNode<number> | null] {
    let parent: BinaryNode<number> = df_parent_search(head, new_item);
    let node: BinaryNode<number> = { value: new_item, left: null, right: null } as BinaryNode<number>;
    console.log("parent: ", parent);
    if (parent.left && parent.right) {
        throw new Error("Node is full");
    }
    else {
        if (node.value <= parent.value && !parent.left) {
            parent.left = node;
        }
        if (node.value > parent.value && !parent.right) {
            parent.right = node;
        }
    }

    return [node, parent];
}