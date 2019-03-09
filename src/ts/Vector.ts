export class Vector extends Array {
    constructor(x = 0, y = 0) {
        super(2)
        this[0] = x
        this[1] = y
    }
}