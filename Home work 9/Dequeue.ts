import { TypedArrayConstructor, TypedArray, Value } from './types'
import { LinkedArray } from './LinkedArray'

type DequeueOpts = {
    capacity: number
}

export class Dequeue<
    p_arrayConstructor extends TypedArrayConstructor,
    p_array extends TypedArray<p_arrayConstructor> = TypedArray<p_arrayConstructor>,
> {
    private arrayConstructor: p_arrayConstructor
    private array: p_array | null = null
    private nextItemIndex = 0
    private lastItemIndex = 0

    capacity: number
    isReversed = false
    right: LinkedArray<p_arrayConstructor> | null = null
    left: LinkedArray<p_arrayConstructor> | null = null

    constructor(arrayConstructor: p_arrayConstructor, opts: DequeueOpts) {
        this.capacity = opts.capacity
        this.arrayConstructor = arrayConstructor

        this.inititialize()
    }

    inititialize() {
        const start = Math.floor(this.capacity / 2)

        this.nextItemIndex = start
        this.lastItemIndex = start - 1
        this.array = new this.arrayConstructor(this.capacity) as p_array
        this.isReversed = false
    }

    get isEngoughSpaceFromRight(): boolean {
        // если массив реверсед то проверка сломается
        // return this.nextItemIndex !== this.capacity
        return this.isReversed ? this.nextItemIndex !== -1 : this.nextItemIndex !== this.capacity
    }

    get isEnoughSpaceFromLeft(): boolean {
        // если массив реверсед то проверка сломается
        return this.isReversed ? this.lastItemIndex !== this.capacity : this.lastItemIndex !== -1
    }

    get freeIndexFromRight(): number {
        return this.isReversed ? this.nextItemIndex - 1 : this.nextItemIndex + 1
    }

    get busyIndexFromRight(): number {
        return this.isReversed ? this.nextItemIndex + 1 : this.nextItemIndex - 1
    }

    get freeIndexFromLeft(): number {
        return this.isReversed ? this.lastItemIndex + 1 : this.lastItemIndex - 1
    }

    get busyIndexFromLeft(): number {
        return this.isReversed ? this.lastItemIndex - 1 : this.lastItemIndex + 1
    }

    pushRight(value: Value<p_arrayConstructor>): number {
        if (this.right) {
            return this.right.push(value)
        } else if (this.array) {
            if (this.isEngoughSpaceFromRight) {
                this.array[this.nextItemIndex] = value
                this.nextItemIndex = this.freeIndexFromRight

                return this.initialArrayLength
            } else {
                if (this.right === null) {
                    this.right = new LinkedArray(this.arrayConstructor, { capacity: this.capacity })
                }

                return this.pushRight(value)
            }
        } else {
            this.inititialize()

            return this.pushRight(value)
        }
    }

    popRight(): Value<p_arrayConstructor> {
        if (this.right) {
            try {
                const deletedElement = this.right.pop()

                if (this.right.length === 0) {
                    this.right = null
                }

                return deletedElement
            } catch {
                this.right = null
                return this.popRight()
            }
        } else if (this.array) {
            const deletedElement = this.array[this.busyIndexFromRight] as Value<p_arrayConstructor>

            this.nextItemIndex = this.busyIndexFromRight

            if (this.initialArrayLength === 0) {
                if (this.left) {
                    let newArray = this.left.head

                    while (newArray?.last) {
                        newArray = newArray.last
                    }

                    if (newArray) {
                        if (newArray.next) {
                            newArray.next.last = null
                            newArray.next = null
                        }
                        this.array = newArray?.array as p_array
                        this.isReversed = true
                        this.nextItemIndex = -1
                        this.lastItemIndex = newArray.length
                    }

                    if (newArray === this.left.head) {
                        this.left = null
                    }
                } else {
                    this.array = null
                    this.isReversed = false
                }
            }

            return deletedElement
        }

        throw new Error('Dequeue is empty')
    }

    pushLeft(value: Value<p_arrayConstructor>): number {
        if (this.left) {
            return this.left.push(value)
        } else if (this.array) {
            if (this.isEnoughSpaceFromLeft) {
                this.array[this.lastItemIndex] = value
                this.lastItemIndex = this.freeIndexFromLeft

                return this.initialArrayLength
            } else {
                if (this.left === null) {
                    this.left = new LinkedArray(this.arrayConstructor, { capacity: this.capacity })
                }

                return this.pushLeft(value)
            }
        } else {
            this.inititialize()

            return this.pushLeft(value)
        }
    }

    popLeft(): Value<p_arrayConstructor> {
        if (this.left) {
            try {
                const deletedElement = this.left.pop()

                if (this.left.length === 0) {
                    this.left = null
                }

                return deletedElement
            } catch {
                this.left = null
                return this.popLeft()
            }
        } else if (this.array) {
            const deletedElement = this.array[this.busyIndexFromLeft] as Value<p_arrayConstructor>

            this.lastItemIndex = this.busyIndexFromLeft

            if (this.initialArrayLength === 0) {
                if (this.right) {
                    let newArray = this.right.head

                    while (newArray?.last) {
                        newArray = newArray.last
                    }

                    if (newArray) {
                        if (newArray.next) {
                            newArray.next.last = null
                            newArray.next = null
                        }
                        this.array = newArray?.array as p_array
                        this.isReversed = false
                        this.lastItemIndex = -1
                        this.nextItemIndex = newArray.length
                    }

                    if (newArray === this.right.head) {
                        this.right = null
                    }
                } else {
                    this.array = null
                    this.isReversed = false
                }
            }

            return deletedElement
        }

        throw new Error('Dequeue is empty')
    }

    get initialArrayLength() {
        return Math.abs(this.nextItemIndex - this.lastItemIndex) - 1
    }

    get length() {
        const rightLength = this.right?.length || 0
        const leftLength = this.left?.length || 0

        return rightLength + leftLength + this.initialArrayLength
    }
}
