class Node<T> {
    value: T;
    next: Node<T> | undefined

    constructor(val: T, next: Node<T> | undefined = undefined) {
        this.value = val;
        if (next) {
            this.next = next;
        }
    }
}
export default class SinglyLinkedList<T> {
    public length: number = 0;
    public head: Node<T> | undefined;
    constructor() {
    }

    prepend(item: T): void {
        if (!this.head) {
            this.head = new Node<T>(item);
            this.length += 1;
            return;
        }
        const aux = this.head
        this.head = new Node<T>(item);
        this.length += 1;
        this.head.next = aux;
    }
    
    insertAt(item: T, idx: number): void {
        if (!this.head) {
            this.head = new Node<T>(item);
            this.length += 1;
            return;
        }
        let node: Node<T> | undefined = this.head;
        let previous: Node<T> | undefined = undefined;

        for (let index = 0; index < idx; index++) {
            if (node && node.next) {
                previous = node;
                node = node.next
            }
        }
        if (!previous) {
            const aux = this.head;
            this.head = new Node<T>(item, aux.next);
            this.length += 1;
            return;
        }

        const aux = node;
        previous.next = new Node<T>(item, aux);
        this.length += 1;
        return;
    }
    append(item: T): void {
        if (!this.head) {
            this.head = new Node<T>(item);
            this.length += 1;
            return;
        }

        let node = this.head;
        while (node.next) {
            node = node.next;
        }

        node.next = new Node<T>(item);
        this.length += 1;
    }
    remove(item: T): T | undefined {
        if (!this.head) {
            return undefined;
        }
        let result: T | undefined = undefined;

        let node: Node<T> | undefined = this.head;
        let previous: Node<T> | undefined = undefined;

        while (node) {
            if (node && node.value === item) {
                let aux = node;
                if (!previous) {
                    const aux = this.head;
                    this.head = this.head.next;
                    this.length -= 1;
                    return aux.value;
                }

                previous.next = aux.next;
                this.length -= 1;
                result = aux.value;
                break;
            }
            previous = node;
            node = node.next;
        }
        return result;
    }

    get(idx: number): T | undefined {
        if (!this.head) {
            return undefined;
        }
        let node = this.head;
        for (let index = 0; index < idx; index++) {
            if (node && node.next) {
                node = node.next
            }
        }

        if (!node) {
            return undefined;
        }

        return node.value;

    }
    removeAt(idx: number): T | undefined {
        if (!this.head) {
            return undefined;
        }
        if (idx == 0) {
            const aux = this.head;
            this.head = this.head.next;
            this.length -= 1;
            return aux.value;
        }

        let node = this.head;
        for (let index = 0; index < idx - 1; index++) {
            if (node && node.next) {
                node = node.next
            }
        }

        const aux = node.next;
        if (!aux) {
            return undefined;
        }

        node.next = aux.next;
        this.length -= 1;
        return aux.value;
    }
}