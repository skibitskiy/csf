import { TypedArrayConstructor, Value } from './types'
import { LinkedArrayItem, LinkedArrayItemOpts } from './LinkedArrayItem'

interface ILinkedArrayOpts extends Pick<LinkedArrayItemOpts, 'capacity'> {}

export class LinkedArray<p_arrayConstructor extends TypedArrayConstructor> {
    private arrayConstructor: p_arrayConstructor

    head: LinkedArrayItem<p_arrayConstructor> | null = null
    capacity: number
    length = 0

    constructor(arrayConstructor: p_arrayConstructor, opts: ILinkedArrayOpts) {
        this.capacity = opts.capacity
        this.arrayConstructor = arrayConstructor
    }

    push(value: Value<p_arrayConstructor>): number {
        if (!this.head) {
            this.head = new LinkedArrayItem(this.arrayConstructor, {
                capacity: this.capacity,
            })
        }

        let returnedValue = 0

        try {
            returnedValue = this.head.push(value)
        } catch {
            const next = new LinkedArrayItem(this.arrayConstructor, {
                capacity: this.capacity,
            })
            next.last = this.head
            this.head.next = next
            this.head = next

            returnedValue = this.head.push(value)
        } finally {
            this.length += 1

            return returnedValue
        }
    }

    pop(): Value<p_arrayConstructor> {
        if (!this.head) {
            throw new Error('List empty')
        }

        let deletedElement: Value<p_arrayConstructor>

        try {
            deletedElement = this.head.pop()

            this.length -= 1

            if (this.head.length === 0) {
                const newHead = this.head.last
                this.head = newHead
                if (newHead) {
                    newHead.next = null
                }
            }

            return deletedElement
        } catch (e) {
            throw e
        }
    }
}
