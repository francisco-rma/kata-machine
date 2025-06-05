class Node<T> {
    value: T;
    prev: Node<T> | undefined;
    next: Node<T> | undefined;

    constructor(val: T, next: Node<T> | undefined = undefined, prev: Node<T> | undefined = undefined) {
        this.value = val;
        if (next) {
            this.next = next;
        }
        if (prev) {
            this.prev = prev;
        }
    }
}


export default class DoublyLinkedList<T> {
    public length: number = 0;
    public head: Node<T> | undefined;
    public tail: Node<T> | undefined;
    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    append(item: T): void {
        const node = new Node<T>(item);
        let aux = this.tail;
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
        this.tail.next = undefined;
        if (aux) {
            aux.next = this.tail;
        }
        this.length += 1;
    }
    prepend(item: T): void {
        const node = new Node<T>(item);
        let aux = this.head;
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.head.prev = undefined;
        this.head.next = aux;
        if (aux) {
            aux.prev = this.head;
        }
        this.length += 1;
    }


    _remove_head(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        let aux = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = undefined;
        }

        this.length -= 1;
        aux.next = undefined;
        aux.prev = undefined;
        return aux.value;
    }

    _remove_tail(): T | undefined {
        if (!this.tail) {
            return undefined;
        }
        let aux = this.tail;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = undefined;
        }

        aux.next = undefined;
        aux.prev = undefined;
        this.length -= 1;

        return aux.value;
    }
    insertAt(item: T, idx: number): void {
        let node: Node<T> | undefined = this.head;
        let prev: Node<T> | undefined = undefined;
        let i: number = 0;

        while (i < idx) {
            if (node) {
                prev = node;
                node = node.next;
            }
            i += 1;
        }
        if (!prev) {
            this.prepend(item);
            return;
        }
        if (!node) {
            this.append(item);
            return;
        }
        const aux = new Node<T>(item, node, prev);
        prev.next = aux;
        node.prev = aux;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        let result: T | undefined = undefined;
        if (item === this.head?.value) {
            result = this._remove_head();
        }
        else if (item === this.tail?.value) {
            result = this._remove_tail();
        } else {
            let node: Node<T> | undefined = this.head;
            let prev: Node<T> | undefined = undefined;

            while (node) {
                if (node.value === item) {
                    result = node.value;
                    if (node.next) {
                        node.next.prev = prev;
                    }
                    if (prev) {
                        prev.next = node.next;
                    }
                    node.next = undefined;
                    node.prev = undefined;
                    this.length -= 1;
                    break;
                }
                prev = node;
                node = node.next;
            }
        }
        return result;
    }
    get(idx: number): T | undefined {
        let node: Node<T> | undefined = this.head;
        let i: number = 0;

        while (i < idx) {
            if (node) {
                node = node.next;
            }
            i += 1;
        }
        return node?.value;

    }
    removeAt(idx: number): T | undefined {
        let result: T | undefined = undefined;
        if (idx === 0) {
            result = this._remove_head();
        }
        else if (idx === this.length - 1) {
            result = this._remove_tail();
        }
        else {
            let node: Node<T> | undefined = this.head;
            let prev: Node<T> | undefined = undefined;
            let i: number = 0;
            while (i < idx) {
                if (node) {
                    prev = node;
                    node = node.next;
                }
                i += 1;
            }
            if (node) {
                if (node.next) {
                    node.next.prev = prev;
                }
                if (prev) {
                    prev.next = node?.next;
                }
                node.next = undefined;
                node.prev = undefined;
                this.length -= 1;
            }
            result = node?.value;
        }
        return result;
    }
}