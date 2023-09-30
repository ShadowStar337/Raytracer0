import { Mathematics } from "./Mathematics.js";

/**
 * A generic 3-component vector.
 */
class Vector3 {
    private x: number;
    private y: number;
    private z: number;

    /**
     * Constructs a new Vector3 instance.
     * If no parameters are set, this vector will be empty.
     * If one parameter is set, this vector will take the values of the other 3-component vector as its own values.
     * If all parameters are set, this vector will take the parameters as its own values.
     * @param x Either the x-component of this vector, another 3-component vector, or undefined.
     * @param y Either the y-component of this vector or undefined.
     * @param z Either the z-component of this vector or undefined.
     * @returns A new Vector3 instance.
     */
    constructor(x?: number | Vector3, y?: number, z?: number) {
        // RELEASE
        if (x instanceof Vector3 && y === undefined && z === undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            return;
        }

        if (typeof x === "number" && y !== undefined  && z !== undefined) {
            this.x = x;
            this.y = y;
            this.z = z;
            return;
        }

        this.x = 0;
        this.y = 0;
        this.z = 0;

        // DEBUG
        // const noParameters: boolean = x === undefined && y === undefined && z === undefined;
        
        // let oneParameter: boolean;
        // if (oneParameter = x instanceof Vector3 && y === undefined && z === undefined) {
        //     this.fromVector3(x);
        // }

        // let filledParameters: boolean;
        // if (filledParameters = typeof x === "number" && y !== undefined  && z !== undefined) {
        //     this.x = x;
        //     this.y = y;
        //     this.z = z;
        // }

        // if (!noParameters && !filledParameters && !oneParameter) {
        //     throw new Error("[Vector3]: Not all required parameters are filled.");
        // }
    }

    /**
     * Replaces the values of this vector with the values of the parameters.
     * @param x The new x-component of this vector.
     * @param y The new y-component of this vector.
     * @param z The new z-component of this vector.
     */
    public fromValues(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Replaces the values of this vector with the values of another 3-component vector.
     * @param other The other 3-component vector.
     */
    public fromVector3(other: Vector3): void {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }

    /**
     * Replaces the values of this vector with random values between the specified inclusive minimum and exclusive maximum.
     * @param minimum The minimum of the random values.
     * @param maximum The maximum of the random values.
     */
    public fromRandom(minimum: number, maximum: number): void {
        this.x = Mathematics.intervalRandom(minimum, maximum);
        this.y = Mathematics.intervalRandom(minimum, maximum);
        this.z = Mathematics.intervalRandom(minimum, maximum);
    }

    /**
     * Replaces the values of this vector with random values between the specified inclusive minimum and exclusive maximum such that the magnitude of this vector is 1.
     * @param minimum The minimum of the random values.
     * @param maximum The maximum of the random values.
     */
    public fromUnitRandom(minimum: number, maximum: number) {
        this.fromRandom(minimum, maximum);
        this.fromVector3(this.normalize());
    }

    /**
     * Returns the x-component of this vector.
     * @returns The x-component of this vector.
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Returns the y-component of this vector.
     * @returns The y-component of this vector.
     */
    public getY(): number {
        return this.y;
    }

    /**
     * Returns the z-component of this vector.
     * @returns The z-component of this vector.
     */
    public getZ(): number {
        return this.z;
    }

    /**
     * Tests whether the components of this vector are equal to the components of another 3-component vector.
     * @param other The other 3-component vector.
     * @returns Whether the components of this vector are equal to the components of another 3-component vector.
     */
    public equals(other: Vector3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * Calculates the length or magnitude of this vector.
     * @returns The length or magnitude of this vector.
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Prints the components of this vector to the console.
     */
    public print(): void {
        console.log(this.x, this.y, this.z);
    }

    /**
     * Constructs a new Vector3 instance with the components of this vector.
     * @returns A new Vector3 instance.
     */
    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Constructs a new Vector3 instance with the negated components of this vector.
     * @returns A new Vector3 instance.
     */
    public negate(): Vector3 {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    /**
     * Constructs a new Vector3 instance with the reciprocated components of this vector.
     * @returns A new Vector3 instance.
     */
    public reciprocate(): Vector3 {
        return new Vector3(1 / this.x, 1 / this.y, 1 / this.z);
    }

    /**
     * Adds the components of this vector with either the components of another 3-component vector or a number.
     * @param other Either another 3-component vector or a number.
     * @returns A new Vector3 instance with the added components.
     */
    public add(other: Vector3 | number): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
        }
        return new Vector3(this.x + other, this.y + other, this.z + other);
    }

    /**
     * Multiplies the components of this vector with either the components of another 3-component vector or a number.
     * @param other Either another 3-component vector or a number.
     * @returns A new Vector3 instance with the multiplied components.
     */
    public multiply(other: Vector3 | number): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
        }
        return new Vector3(this.x * other, this.y * other, this.z * other);
    }

    /**
     * Exponentiates the components of this vector with either the components of another 3-component vector or a number.
     * @param other Either another 3-component vector or a number.
     * @returns A new Vector3 instance with the exponentiated components.
     */
    public exponentiate(other: Vector3 | number): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(Math.pow(this.x, other.x), Math.pow(this.y, other.y), Math.pow(this.z, other.z));
        }
        return new Vector3(Math.pow(this.x, other), Math.pow(this.y, other), Math.pow(this.z, other));
    }

    /**
     * Calculates the dot product of this vector and another 3-component vector.
     * @param other The other 3-component vector.
     * @returns The dot product.
     */
    public dot(other: Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /**
     * Normalizes the components of this vector between inclusive 0 and inclusive 1 for positive components and inclusive 0 and inclusive -1 for negative components.
     * @returns The normalized vector.
     */
    public normalize(): Vector3 {
        const max: number = Math.max(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        return new Vector3(this.x / max, this.y / max, this.z / max);
    }

    /**
     * Constructs a new Vector3 instance from a raw object.
     * @param other The raw object.
     * @returns A new Vector3 instance.
     */
    public static createFromRaw(other: any): Vector3 {
        return new Vector3(other.x, other.y, other.z);
    }
}

export { Vector3 };