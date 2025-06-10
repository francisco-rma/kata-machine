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

function bst_validation(node: BinaryNode<number> | null, result: boolean): boolean {
    if (!node) {
        return true;
    }
    if (node.left && node.left.value > node.value) {
        return false;
    }
    if (node.right && node.right.value <= node.value) {
        return false;
    }

    const left_walk = bst_validation(node.left, result);
    const right_walk = bst_validation(node.right, result);
    return result && left_walk && right_walk;
}
export function is_valid(head: BinaryNode<number>): boolean {
    return bst_validation(head, true);
}

export function bst_parent_search(head: BinaryNode<number>, needle: number): BinaryNode<number> {
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

export function bst_insert(head: BinaryNode<number>, new_item: number): [BinaryNode<number> | null, BinaryNode<number> | null] {
    let parent: BinaryNode<number> = bst_parent_search(head, new_item);
    let node: BinaryNode<number> = { value: new_item, left: null, right: null } as BinaryNode<number>;
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


function bst_max(head: BinaryNode<number>): [BinaryNode<number> | null, BinaryNode<number> | null] {
    let node: BinaryNode<number> | null = head;
    let parent: BinaryNode<number> | null = null;
    while (node && node.right) {
        parent = node;
        node = node.right;
    }
    return [node, parent];
}

export function bst_delete(head: BinaryNode<number>, target: number): void {
    let node: BinaryNode<number> | null = head;
    let parent: BinaryNode<number> | null = null;

    while (node) {
        if (node.value === target) {
            break;
        }
        else if (node.value < target) {
            parent = node;
            node = node.right;
        }
        else {
            parent = node;
            node = node.left;
        }
    }

    if (!parent) {
        head.left = null;
        head.right = null;
        return;
    }
    if (!node) {
        throw new Error("Node not found");
    }

    if (!node.left) {
        if (node == parent.left) {
            parent.left = node.right;
        }
        else if (node == parent.right) {
            parent.right = node.right;
        }
        node.left = null;
        node.right = null;
        return;
    }
    else if (!node.right) {
        if (node == parent.left) {
            parent.left = node.left;
        }
        else if (node == parent.right) {
            parent.right = node.left;
        }
        node.left = null;
        node.right = null;
        return;
    }

    let [max_subnode, max_subnode_parent] = bst_max(node.left);
    if (!max_subnode) {
        if (node == parent.left) {
            parent.left = null;
        }
        else {
            parent.right = null;
        }
    }
    else {
        if (max_subnode_parent) {
            max_subnode_parent.right = null;
        }

        if (max_subnode != node.left) {
            max_subnode.left = node.left;
        }

        max_subnode.right = node.right;

        if (node === parent.left) {
            parent.left = max_subnode;
        }
        if (node === parent.right) {
            parent.right = max_subnode;
        }
    }
    node.left = null;
    node.right = null;
}
