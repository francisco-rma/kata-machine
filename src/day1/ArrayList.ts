export default class ArrayList<T> {
    public source: T[] = [];
    public capacity: number = 10;
    public length: number = 0;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.source = new Array(this.capacity);
    }

    _grow() {
        this.capacity *= 2;
        let copy: T[] = new Array(this.capacity)
        for (let index = 0; index < this.source.length; index++) {
            copy[index] = this.source[index];
        }
        this.source = copy;
    }
    prepend(item: T): void {
        if (this.length === this.capacity) {
            this._grow();
        }

        this.source.splice(0, 0, item);
        this.length += 1;
    }

    insertAt(item: T, idx: number): void {
        if (this.length === this.capacity) {
            this._grow();
        }
        this.source.splice(idx, 0, item);
        this.length += 1;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this._grow();
        }
        const idx = this.length;
        this.source[idx] = item;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        let target_idx = undefined;
        for (let index = 0; index < this.source.length; index++) {
            if (this.source[index] === item) {
                target_idx = index;
                break;
            }
        }
        if (target_idx === undefined) {
            return undefined;
        }
        else {
            const deletions = this.source.splice(target_idx, 1);
            this.length -= 1;
            return deletions[0];
        }
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }
        return this.source[idx];
    }
    removeAt(idx: number): T | undefined {
        const result = this.source.splice(idx, 1);
        this.length -= 1;
        if (result) {
            return result[0];
        }
        else {
            return undefined;
        }
    }
}