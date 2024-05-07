import { LinkedArray } from './LinkedArray'

describe('LinkedArray', () => {
    it('creates new head array', () => {
        const array = new LinkedArray(Int8Array, { capacity: 2 })

        array.push(1)
        array.push(2)

        const firstArray = array.head

        array.push(3)
        array.push(4)

        const secondArray = array.head

        array.push(5)

        const thirdArray = array.head

        expect(firstArray?.get(0)).toBe(1)
        expect(firstArray?.get(1)).toBe(2)
        expect(firstArray?.capacity).toBe(2)
        expect(firstArray?.length).toBe(2)
        expect(firstArray?.next).toBe(secondArray)
        expect(firstArray?.last).toBe(null)

        expect(secondArray?.get(0)).toBe(3)
        expect(secondArray?.get(1)).toBe(4)
        expect(secondArray?.capacity).toBe(2)
        expect(secondArray?.length).toBe(2)
        expect(secondArray?.next).toBe(thirdArray)
        expect(secondArray?.last).toBe(firstArray)

        expect(thirdArray?.get(0)).toBe(5)
        expect(thirdArray?.capacity).toBe(2)
        expect(thirdArray?.length).toBe(1)
        expect(thirdArray?.next).toBe(null)
        expect(thirdArray?.last).toBe(secondArray)

        expect(array.length).toBe(5)
    })

    it("popping elements work's correctly", () => {
        const array = new LinkedArray(Int8Array, { capacity: 2 })

        array.push(1)
        array.push(2)

        const firstArray = array.head

        array.push(3)
        array.push(4)

        const secondArray = array.head

        array.push(5)

        expect(array.pop()).toBe(5)
        expect(array.head).toBe(secondArray)
        expect(array.head?.next).toBe(null)

        expect(array.pop()).toBe(4)
        expect(array.head).toBe(secondArray)

        expect(array.pop()).toBe(3)
        expect(array.head).toBe(firstArray)

        expect(array.pop()).toBe(2)
        expect(array.head).toBe(firstArray)

        expect(array.pop()).toBe(1)
        expect(array.head).toBe(null)
    })

    it('creates new reversed head array', () => {
        const array = new LinkedArray(Int8Array, { capacity: 2, isReversed: true })

        array.push(1)
        array.push(2)

        const firstArray = array.head

        array.push(3)
        array.push(4)

        const secondArray = array.head

        array.push(5)

        const thirdArray = array.head

        expect(firstArray?.get(0)).toBe(1)
        expect(firstArray?.get(1)).toBe(2)
        expect(firstArray?.capacity).toBe(2)
        expect(firstArray?.length).toBe(2)
        expect(firstArray?.next).toBe(secondArray)
        expect(firstArray?.last).toBe(null)

        expect(secondArray?.get(0)).toBe(3)
        expect(secondArray?.get(1)).toBe(4)
        expect(secondArray?.capacity).toBe(2)
        expect(secondArray?.length).toBe(2)
        expect(secondArray?.next).toBe(thirdArray)
        expect(secondArray?.last).toBe(firstArray)

        expect(thirdArray?.get(0)).toBe(5)
        expect(thirdArray?.capacity).toBe(2)
        expect(thirdArray?.length).toBe(1)
        expect(thirdArray?.next).toBe(null)
        expect(thirdArray?.last).toBe(secondArray)

        expect(array.length).toBe(5)
    })

    it("popping elements work's correctly in reversed array", () => {
        const array = new LinkedArray(Int8Array, { capacity: 2, isReversed: true })

        array.push(1)
        array.push(2)

        const firstArray = array.head

        array.push(3)
        array.push(4)

        const secondArray = array.head

        array.push(5)

        expect(array.pop()).toBe(5)
        expect(array.head).toBe(secondArray)
        expect(array.head?.next).toBe(null)

        expect(array.pop()).toBe(4)
        expect(array.head).toBe(secondArray)

        expect(array.pop()).toBe(3)
        expect(array.head).toBe(firstArray)

        expect(array.pop()).toBe(2)
        expect(array.head).toBe(firstArray)

        expect(array.pop()).toBe(1)
        expect(array.head).toBe(null)
    })
})
