import dfs, { dfs_delete, dfs_insert, is_valid } from "@code/DFSOnBST";
import { tree } from "./tree";

function randomDistinctIntegers(count: number, min: number, max: number): number[] {
    if (count > max - min + 1) {
        throw new Error("Count exceeds the number of unique values in the interval.");
    }
    // Step 1: Create array of all possible values
    const arr = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    // Step 2: Shuffle using Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Step 3: Take first N elements
    return arr.slice(0, count);
}
class SeededRandom {
    private seed: number;
    private min: number;
    private max: number;
    constructor(seed: number, min: number, max: number) {
        this.seed = seed;
        this.min = min;
        this.max = max;
    }
    next(): number {
        // LCG parameters (example values)
        this.seed = (this.seed * 1664525 + 1013904223) % 0x100000000;
        return this.seed / 0x100000000;
    }
    nextInt(): number {
        return Math.floor(this.next() * (this.max - this.min + 1)) + this.min;
    }
}

const [min, max] = [0, 10000];
const rng = new SeededRandom(150, min, max);

function printTree(node: BinaryNode<number> | null, prefix = "", isLeft = true): string {
    if (!node)
        return "";
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

test("DFS on BST", function () {
    expect(dfs(tree, 45)).toEqual(true);
    expect(dfs(tree, 7)).toEqual(true);
    expect(dfs(tree, 69)).toEqual(false);
});

test("Insertion", function () {
    let my_tree: BinaryNode<number> = {
        value: Math.floor(min + (max - min) / 2),
        right: null,
        left: null
    };

    for (let index = 0; index < 100; index++) {
        const insertion_target = rng.nextInt();

        let [result, parent] = dfs_insert(my_tree, insertion_target);

        expect(is_valid(my_tree)).toEqual(true);

        expect(parent).toBeDefined();
        expect(result?.value).toEqual(insertion_target);

        if (!parent) {
            throw new Error("Missing parent: ${parent}");
        }

        let expected_node = {
            value: parent.value,
            right: parent.value < insertion_target ? { value: insertion_target, left: null, right: null } as BinaryNode<number> : parent?.right,
            left: parent.value >= insertion_target ? { value: insertion_target, left: null, right: null } as BinaryNode<number> : parent?.left,
        } as BinaryNode<number>;

        if (!expected_node.left) {
            expected_node.left = null;
        }
        if (!expected_node.right) {
            expected_node.right = null;
        }

        expect(parent).toEqual(expected_node);
        // console.log("------------------------" + `Iteration ${index} ` + "------------------------")
        // console.log("Insertion target:", insertion_target);
        // console.log("Result node:", result);
        // console.log("Parent node:", parent);
        // console.log("\n");
        // console.clear();
    }

    // console.log("Result tree:\n" + printTree(my_tree));
});

test("Deletion", function () {
    let my_tree: BinaryNode<number> = {
        value: 0,
        right: null,
        left: null
    };

    const insertion_targets = randomDistinctIntegers(100, min + 1, max);

    for (let index = 0; index < 100; index++) {
        let [result, _] = dfs_insert(my_tree, insertion_targets[index]);
        expect(result?.value).toEqual(insertion_targets[index]);
        expect(dfs(my_tree, insertion_targets[index])).toEqual(true);
    }

    expect(is_valid(my_tree)).toEqual(true);

    for (let index = 0; index < 10; index += 5) {
        const target = insertion_targets[index];

        expect(dfs(my_tree, target)).toEqual(true);
        dfs_delete(my_tree, target);
        expect(dfs(my_tree, target)).toEqual(false);

        if (my_tree) {
            expect(is_valid(my_tree)).toEqual(true);
        }
    }
});