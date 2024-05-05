import { Vector } from './Vector'

describe('Vector', () => {
    it('the capacity is increased by increasing the array', () => {
        const v = new Vector(Int8Array, { capacity: 2 })

        expect(v.length).toEqual(0)
        expect(v.capacity).toEqual(2)

        v.push(1)
        v.push(2)

        expect(v.length).toEqual(2)
        expect(v.capacity).toEqual(2)

        v.push(2)

        expect(v.length).toEqual(3)
        expect(v.capacity).toEqual(4)
    })

    it("shrinkToFit shrinks array to it's length", () => {
        const v = new Vector(Int8Array, { capacity: 4 })

        expect(v.length).toEqual(0)
        expect(v.capacity).toEqual(4)

        v.push(1)
        v.push(2)
        v.push(3)

        v.shrinkToFit()

        expect(v.length).toEqual(3)
        expect(v.capacity).toEqual(3)
    })

    it('the length is decreased by popping the element', () => {
        const v = new Vector(Int8Array, { capacity: 2 })

        expect(v.length).toEqual(0)
        expect(v.capacity).toEqual(2)

        v.push(1)
        v.push(2)
        v.push(3)
        v.pop()

        expect(v.length).toEqual(2)
        expect(v.capacity).toEqual(4)
    })

    it('pop returns deleted element', () => {
        const v = new Vector(Int8Array, { capacity: 2 })

        v.push(1)
        v.push(2)

        const deletedElement = v.pop()

        expect(deletedElement).toEqual(2)
    })

    it('values returns iterator', () => {
        const v = new Vector(Int8Array, { capacity: 2 })

        v.push(1)

        let expectedNum = 1

        for (const num of v.values()) {
            expect(num).toEqual(expectedNum)

            expectedNum++

            if (expectedNum < 3) {
                v.push(expectedNum)
            }
        }
    })
})
