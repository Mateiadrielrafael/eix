const errors = {
    differentLengthError: new Error("Cannot perform operation on different vectors")
}

export class FastVector extends Float32Array {
    /**
     * The faster verson of Vector
     * @param elements the initial elements of the float32array
     */
    constructor(elements: Iterable<number>) {
        super(elements)
    }

    /**
     * Adds a vector to this one
     * throws differenLengthError if the length isnt the same
     * @param other the vector to add to this one
     * @returns this
     */
    add(other: FastVector): FastVector {
        if (other.length != this.length)
            throw errors.differentLengthError
        for (let i = 0; i < this.length; i++)
            this[i] += other[i]

        return this
    }

    /**
     * Adds this vector to another one
     * throws differenLengthError if the length isnt the same
     * @param other the vector to add this one to
     * @returns this
     */
    addTo(other: FastVector): FastVector {
        other.add(this)

        return this
    }

    /**
     * Subscribes a vector from this one
     * throws differenLengthError if the length isnt the same
     * @param other the vector to substract from this one
     * @returns this
     */
    sub(other: FastVector): FastVector {
        if (other.length != this.length)
            throw errors.differentLengthError
        for (let i = 0; i < this.length; i++)
            this[i] -= other[i]

        return this
    }

    /**
     * Substract this vector from another one
     * throws differenLengthError if the length isnt the same
     * @param other the vector to substract this one from
     * @returns this
     */
    subFrom(other: FastVector): FastVector {
        other.sub(this)

        return this
    }

    /**
    * Divides all dimensions by a factor
    * @param factor the number to divide by
    */
    div(factor: number): FastVector {
        for (let i = 0; i < this.length; i++)
            this[i] /= factor

        return this
    }

    /**
     * Multipies all dimensions by a factor
     * @param factor the number to multiply by
     */
    mult(factor: number): FastVector {
        for (let i = 0; i < this.length; i++)
            this[i] *= factor

        return this
    }

    /**
     * Translates the vector
     * @param params how much to translate on each axis
     * @returns this 
     */
    translate(...params: number[]): FastVector {
        for (let i = 0; i < this.length; i++)
            if (params[i])
                this[i] += params[i]

        return this
    }

    /**
     * Scales the vector
     * @param params how much to scale on each axis
     * @returns this 
     */
    scale(...params: number[]): FastVector {
        for (let i = 0; i < this.length; i++)
            if (params[i])
                this[i] *= params[i]

        return this
    }

    /**
     * rotates the vector in a given plane
     * @param angle how much to translate on each axis
     * @param alpha the first axis of the plane to return the vector around
     * @param beta the second axis of the plane to return the vector around
     * @returns this 
     */
    rotate(angle: number, alpha: number = 0, beta: number = 1): FastVector {
        // formulas:
        // x' = x cos f - y sin f
        // y' = y cos f + x sin f

        //i like to do this
        const { sin, cos } = Math

        //remember the magnitude in the specified plane
        const radius = (this[alpha] ** 2 + this[beta] ** 2) ** 0.5

        //remember the initial values of the specified axis
        const x = this[alpha]
        const y = this[beta]

        //aply the formula
        this[alpha] = x * cos(angle) - y * sin(angle)
        this[beta] = y * cos(angle) + x * sin(angle)

        return this
    }

    /**
     * clones the vector
     * @returns a new clone of this vector
     */
    clone():FastVector{
        return new FastVector(this)
    }

    /**
     * mirros the vector
     * @returns this
     */
    mirror():Float32Array{
        this.mult(-1)
        return this
    }

    /**
     * calculates the magnitude of the vector
     * @returns the length of the vector
     */
    get magnitude(): number {
        //get the sum
        let sum = 0

        for (let i = 0; i < this.length; i++)
            sum += this[i] ** 2

        //return the sqrt of the sum
        return sum ** 0.5
    }

    /**
     * @param scale the new length of the vector
     */
    set magnitude(scale: number) {
        this.mult(scale / this.magnitude)
    }

    /**
     * easy way to acces the fist value
     * @returns the x value of the vector
     */
    get x(){
        return this[0]
    }

    /**
     * easy way to acces the second value
     * @returns the y value of the vector
     */
    get y(){
        return this[1]
    }
}


