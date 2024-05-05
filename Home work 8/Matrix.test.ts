import { Matrix } from './Matrix'

describe('Matrix', () => {
    it('the capacity is increased by increasing the array', () => {
        const matrix2n2n2 = new Matrix(Int8Array, 2, 2, 2)

        matrix2n2n2.set(0, 0, 0, 1)
        matrix2n2n2.set(0, 0, 1, 2)
        matrix2n2n2.set(0, 1, 0, 3)
        matrix2n2n2.set(0, 1, 1, 4)

        matrix2n2n2.set(1, 0, 0, 5)
        matrix2n2n2.set(1, 0, 1, 6)
        matrix2n2n2.set(1, 1, 0, 7)
        matrix2n2n2.set(1, 1, 1, 8)

        expect(matrix2n2n2.get(0, 0, 0)).toEqual(1)
        expect(matrix2n2n2.get(0, 0, 1)).toEqual(2)
        expect(matrix2n2n2.get(0, 1, 0)).toEqual(3)
        expect(matrix2n2n2.get(0, 1, 1)).toEqual(4)

        expect(matrix2n2n2.get(1, 0, 0)).toEqual(5)
        expect(matrix2n2n2.get(1, 0, 1)).toEqual(6)
        expect(matrix2n2n2.get(1, 1, 0)).toEqual(7)
        expect(matrix2n2n2.get(1, 1, 1)).toEqual(8)
    })

    it('values returns iterator', () => {
        const matrix2n2n2 = new Matrix(Int8Array, 2, 2, 2)

        matrix2n2n2.set(0, 0, 0, 1)
        matrix2n2n2.set(0, 0, 1, 2)
        matrix2n2n2.set(0, 1, 0, 3)
        matrix2n2n2.set(0, 1, 1, 4)

        matrix2n2n2.set(1, 0, 0, 5)
        matrix2n2n2.set(1, 0, 1, 6)
        matrix2n2n2.set(1, 1, 0, 7)
        matrix2n2n2.set(1, 1, 1, 8)

        let expectedNum = 1

        for (const i of matrix2n2n2.values()) {
            expect(i).toEqual(expectedNum)
            expectedNum += 1
        }
    })
})
