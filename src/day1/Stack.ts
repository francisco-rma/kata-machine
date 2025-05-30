import SinglyLinkedList from "./SinglyLinkedList";

export default class Stack<T> {
    public list: SinglyLinkedList<T> = new SinglyLinkedList<T>();
    public length: number = this.list.length;

    constructor() {
    }

    push(item: T): void {
        this.list.append(item);
        this.length = this.list.length;
    }
    pop(): T | undefined {
        const result = this.list.removeAt(this.list.length - 1);
        this.length = this.list.length;
        return result;
    }
    peek(): T | undefined {
        return this.list.get(this.list.length - 1);
    }
}