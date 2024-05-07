import { TypedArray, TypedArrayConstructor, Value } from './types'

export type LinkedArrayItemOpts = {
    capacity: number
    isReversed?: boolean
}

export class LinkedArrayItem<
    p_arrayConstructor extends TypedArrayConstructor,
    p_array extends TypedArray<p_arrayConstructor> = TypedArray<p_arrayConstructor>,
> {
    array: p_array

    length = 0
    capacity: number
    next: LinkedArrayItem<p_arrayConstructor, p_array> | null = null
    last: LinkedArrayItem<p_arrayConstructor, p_array> | null = null

    constructor(arrayConstructor: p_arrayConstructor, opts: LinkedArrayItemOpts) {
        this.array = new arrayConstructor(opts.capacity) as p_array
        this.capacity = opts.capacity
    }

    push(value: Value<p_arrayConstructor>): number {
        if (this.length === this.capacity) {
            throw new Error('List full')
        } else {
            this.array[this.length] = value
            this.length += 1

            return this.length
        }
    }

    pop(): Value<p_arrayConstructor> {
        if (this.length > 0) {
            const deletedElement = this.array[this.length - 1] as Value<p_arrayConstructor>
            this.length -= 1

            return deletedElement
        }

        throw new Error('List empty')
    }

    get(index: number) {
        return this.array[index]
    }
}
