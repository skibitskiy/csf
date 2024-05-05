import { TypedArrayConstructor, TypedArray, Value } from './types'

interface IVectorOpts {
    capacity: number
}

export class Vector<p_arrayConstructor extends TypedArrayConstructor, p_array extends TypedArray<p_arrayConstructor>> {
    private arrayConstructor: p_arrayConstructor
    private _array: p_array
    buffer: ArrayBuffer

    capacity: number
    length = 0

    constructor(arrayConstructor: p_arrayConstructor, opts: IVectorOpts) {
        this.capacity = opts.capacity

        this.arrayConstructor = arrayConstructor

        this.array = new this.arrayConstructor(this.capacity) as p_array
    }

    set array(array: p_array) {
        this._array = array
        this.buffer = array.buffer
    }

    get array() {
        return this._array
    }

    push(value: Value<p_arrayConstructor>) {
        if (this.length === this.capacity) {
            const newCapacity = this.capacity * 2
            const newArray = new this.arrayConstructor(newCapacity) as p_array

            for (let i = 0; i < this.length; ++i) {
                newArray[i] = this.array[i]
            }

            this.array = newArray
            this.capacity = newCapacity
        }

        this.array[this.length] = value
        this.length++
    }

    pop() {
        const deletedElement = this.array[this.length - 1]

        this.length -= 1

        return deletedElement
    }

    shrinkToFit() {
        const newArray = new this.arrayConstructor(this.length) as p_array

        for (let i = 0; i < this.length; ++i) {
            newArray[i] = this.array[i]
        }

        this.array = newArray

        this.capacity = this.length
    }

    values() {
        return {
            [Symbol.iterator]: () => {
                let index = 0

                return {
                    next: () => {
                        if (index < this.length) {
                            return {
                                value: this.array[index++],
                                done: false,
                            }
                        } else {
                            return {
                                done: true,
                            }
                        }
                    },
                }
            },
        }
    }
}
