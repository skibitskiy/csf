import { TypedArrayConstructor, TypedArray, Value } from './types'

export class Matrix<p_arrayConstructor extends TypedArrayConstructor, p_array extends TypedArray<p_arrayConstructor>> {
    private array: p_array
    private capacity: number
    private axes: number[]
    buffer: ArrayBuffer

    constructor(arrayConstructor: p_arrayConstructor, ...axes: number[]) {
        this.axes = axes

        this.capacity = axes.reduce((res, next) => res * next, 1)

        this.array = new arrayConstructor(this.capacity) as p_array
        this.buffer = this.array.buffer
    }

    set(...args: unknown[]) {
        const value = args[args.length - 1] as Value<p_arrayConstructor>
        const axesValues = args.slice(0, args.length - 1) as number[]

        const index = this.getIndex(...axesValues)

        this.array[index] = value
    }

    get(...axesValues: number[]) {
        const index = this.getIndex(...axesValues)

        return this.array[index]
    }

    private getIndex(...axesValues: number[]) {
        let index = 0
        let mod = 1

        for (let i = this.axes.length - 1; i >= 0; --i) {
            index += axesValues[i] * mod

            mod = this.axes[i] * mod
        }

        return index
    }

    values() {
        return {
            [Symbol.iterator]: () => {
                let index = 0

                return {
                    next: () => {
                        if (index < this.capacity) {
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
