import SinglyLinkedList from "./SinglyLinkedList";

export default class Queue<T> {
    public list: SinglyLinkedList<T> = new SinglyLinkedList<T>();
    public length: number = this.list.length;

    constructor() {
    }

    enqueue(item: T): void {
        this.list.prepend(item);
        this.length = this.list.length;
    }
    deque(): T | undefined {
        const result = this.list.removeAt(this.list.length - 1);
        this.length = this.list.length;
        return result;
    }
    peek(): T | undefined {
        return this.list.get(this.list.length - 1);
    }
}
