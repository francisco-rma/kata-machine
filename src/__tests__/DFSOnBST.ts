import dfs, { dfs_insert } from "@code/DFSOnBST";
import { tree } from "./tree";

function printTree(node: BinaryNode<number> | null, prefix = "", isLeft = true): string {
    if (!node) return "";
    let result = "";
    if (node.right) {
        result += printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
    result += prefix + (isLeft ? "└── " : "┌── ") + node.value + "\n";
    if (node.left) {
        result += printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
    return result;
}

function debug_insertion(my_tree: BinaryNode<number>, insertion_target: number): [BinaryNode<number> | null, BinaryNode<number> | null] {
    let [result, parent] = dfs_insert(my_tree, insertion_target);

    console.log("Insertion target:", insertion_target);
    console.log("Result node:", result);
    console.log("Parent node:", parent);
    console.log("Result tree:\n" + printTree(my_tree));
    return [result, parent];
}


test("DFS on BST", function () {
    expect(dfs(tree, 45)).toEqual(true);
    expect(dfs(tree, 7)).toEqual(true);
    expect(dfs(tree, 69)).toEqual(false);
});

test("Debug", function () {
    let my_tree: BinaryNode<number> = {
        value: 20,
        right: {
            value: 50,
            right: null,
            left: null,
        },
        left: {
            value: 10,
            right: {
                value: 15,
                right: null,
                left: null,
            },
            left: {
                value: 5,
                right: null,
                left: null,
            }
        }
    };

    let insertion_target: number = 40;
    let [result, parent] = debug_insertion(my_tree, insertion_target);

    expect(result?.value).toEqual(insertion_target);
    expect(parent).toEqual({
        value: 50,
        right: null,
        left: { value: insertion_target },
    } as BinaryNode<number>);

    insertion_target = 11;
    [result, parent] = debug_insertion(my_tree, insertion_target);

    expect(result?.value).toEqual(insertion_target);
    expect(parent).toEqual({
        value: 15,
        right: null,
        left: { value: insertion_target },
    } as BinaryNode<number>);

    insertion_target = 75;
    [result, parent] = debug_insertion(my_tree, insertion_target);

    expect(result?.value).toEqual(insertion_target);
    expect(parent).toEqual({
        value: 50,
        right: { value: insertion_target },
        left: parent?.left,
    } as BinaryNode<number>);

    
});





