import { Dequeue } from './Dequeue'

describe('Dequeue', () => {
    it("push to the right work's correctly", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 2 })

        dequeue.pushRight(1)
        dequeue.pushRight(2)
        dequeue.pushRight(3)
        dequeue.pushRight(4)
        dequeue.pushRight(5)

        expect(dequeue.length).toEqual(5)
    })

    it("push to the right work's correctly in reversed array", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 2 })

        dequeue.pushLeft(5)
        dequeue.pushLeft(4)
        dequeue.pushLeft(3)
        dequeue.pushLeft(2)
        dequeue.pushLeft(1)

        expect(dequeue.length).toEqual(5)

        expect(dequeue.popRight()).toEqual(5)
        expect(dequeue.popRight()).toEqual(4)

        dequeue.pushRight(100)
        dequeue.pushRight(101)
        dequeue.pushRight(102)

        expect(dequeue.popRight()).toEqual(102)
        expect(dequeue.popRight()).toEqual(101)
        expect(dequeue.popRight()).toEqual(100)
        expect(dequeue.popRight()).toEqual(3)
    })

    it("push to the left work's correctly", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 2 })

        dequeue.pushLeft(1)
        dequeue.pushLeft(2)
        dequeue.pushLeft(3)
        dequeue.pushLeft(4)
        dequeue.pushLeft(5)

        expect(dequeue.length).toEqual(5)
    })

    it("push to the left work's correctly in reversed array", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 4 })

        dequeue.pushLeft(6)
        dequeue.pushLeft(5)
        dequeue.pushLeft(4)
        dequeue.pushLeft(3)
        dequeue.pushLeft(2)
        dequeue.pushLeft(1)

        expect(dequeue.length).toEqual(6)

        expect(dequeue.popRight()).toEqual(6)
        expect(dequeue.popRight()).toEqual(5)
        expect(dequeue.popRight()).toEqual(4)
        expect(dequeue.popLeft()).toEqual(1)

        dequeue.pushLeft(105)
        dequeue.pushLeft(106)

        expect(dequeue.popLeft()).toEqual(106)
        expect(dequeue.popLeft()).toEqual(105)
        expect(dequeue.popLeft()).toEqual(2)
    })

    it("popping from right work's correctly", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 2 })

        dequeue.pushLeft(4)
        dequeue.pushLeft(3)
        dequeue.pushLeft(2)
        dequeue.pushLeft(1)

        dequeue.pushRight(5)
        dequeue.pushRight(6)
        dequeue.pushRight(7)
        dequeue.pushRight(8)
        dequeue.pushRight(9)

        expect(dequeue.length).toEqual(9)

        expect(dequeue.popRight()).toEqual(9)
        expect(dequeue.popRight()).toEqual(8)
        expect(dequeue.popRight()).toEqual(7)
        expect(dequeue.popRight()).toEqual(6)
        expect(dequeue.popRight()).toEqual(5)
        expect(dequeue.popRight()).toEqual(4)
        expect(dequeue.popRight()).toEqual(3)
        expect(dequeue.popRight()).toEqual(2)
        expect(dequeue.popRight()).toEqual(1)

        expect(dequeue.length).toEqual(0)
    })

    it("popping from left work's correctly", () => {
        const dequeue = new Dequeue(Int8Array, { capacity: 2 })

        dequeue.pushLeft(4)
        dequeue.pushLeft(3)
        dequeue.pushLeft(2)
        dequeue.pushLeft(1)

        dequeue.pushRight(5)
        dequeue.pushRight(6)
        dequeue.pushRight(7)
        dequeue.pushRight(8)
        dequeue.pushRight(9)

        expect(dequeue.length).toEqual(9)

        expect(dequeue.popLeft()).toEqual(1)
        expect(dequeue.popLeft()).toEqual(2)
        expect(dequeue.popLeft()).toEqual(3)
        expect(dequeue.popLeft()).toEqual(4)
        expect(dequeue.popLeft()).toEqual(5)
        expect(dequeue.popLeft()).toEqual(6)
        expect(dequeue.popLeft()).toEqual(7)
        expect(dequeue.popLeft()).toEqual(8)
        expect(dequeue.popLeft()).toEqual(9)

        expect(dequeue.length).toEqual(0)
    })
})
