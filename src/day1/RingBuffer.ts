export default class RingBuffer<T> {
    public source: T[] = [];
    public capacity: number = 10;
    public length: number = 0;
    public head: number = Math.floor(this.capacity / 2);
    public tail: number = Math.floor(this.capacity / 2);

    constructor() {
        this.source = new Array(this.capacity);
    }
    _grow(): number {
        return 0;
    }
    push(item: T): void {
        let target_idx: number = this.tail;
        if (this.length === 0) {
            target_idx = this.head;
        }
        else if (this.length === this.capacity) {
            target_idx = this._grow();
        }
        else {
            target_idx = this.tail - 1;
        }

        this.tail = target_idx;

        if (this.tail < 0) {
            this.tail += this.capacity;
        }

        this.source[this.tail] = item;
        this.length += 1;
    }

    pop(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        const result = this.source[this.head];
        this.head -= 1;

        if (this.head < 0) {
            this.head += this.capacity;
        }
        this.length -= 1;
        return result;
    }


    get(idx: number): T {
        if (idx >= this.length) {
            throw new Error("Index out of bounds");
        }

        let eff_idx: number = this.tail + (idx % this.length);
        eff_idx = eff_idx >= this.length ? eff_idx - this.length : eff_idx;

        const result = this.source[this.head - eff_idx];
        return result;
    }

}