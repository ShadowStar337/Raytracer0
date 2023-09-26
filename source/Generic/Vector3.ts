import { Mathematics } from "./Mathematics.js";

class Vector3 {
    private x: number;
    private y: number;
    private z: number;

    constructor(x?: number | Vector3, y?: number, z?: number) {
        this.x = 0;
        this.y = 0;
        this.z = 0;

        const noParameters: boolean = x === undefined && y === undefined && z === undefined;
        
        let oneParameter: boolean;
        if (oneParameter = x instanceof Vector3 && y === undefined && z === undefined) {
            this.fromVector3(x);
        }

        let filledParameters: boolean;
        if (filledParameters = typeof x === "number" && y !== undefined  && z !== undefined) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        if (!noParameters && !filledParameters && !oneParameter) {
            throw new Error("[Vector3]: Not all required parameters are filled.");
        }
    }

    public fromValues(x: number, y: number, z: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public fromVector3(other: Vector3): void {
        this.x = other.getX();
        this.y = other.getY();
        this.z = other.getZ();
    }
    public fromRandom(minimum: number, maximum: number): void {
        this.x = Mathematics.intervalRandom(minimum, maximum);
        this.y = Mathematics.intervalRandom(minimum, maximum);
        this.z = Mathematics.intervalRandom(minimum, maximum);
    }
    public fromUnitRandom(minimum: number, maximum: number) {
        this.fromRandom(minimum, maximum);
        this.fromVector3(this.normalize());
    }

    public getX(): number {
        return this.x;
    }
    public getY(): number {
        return this.y;
    }
    public getZ(): number {
        return this.z;
    }

    public equals(other: Vector3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    public print(): void {
        console.log(this.x, this.y, this.z);
    }

    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
    public negate(): Vector3 {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    public reciprocate(): Vector3 {
        return new Vector3(1 / this.x, 1 / this.y, 1 / this.z);
    }
    public add(other: Vector3 | number): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x + other.getX(), this.y + other.getY(), this.z + other.getZ());
        }
        return new Vector3(this.x + other, this.y + other, this.z + other);
    }
    public multiply(other: Vector3 | number): Vector3 {
        if (other instanceof Vector3) {
            return new Vector3(this.x * other.getX(), this.y * other.getY(), this.z * other.getZ());
        }
        return new Vector3(this.x * other, this.y * other, this.z * other);
    }
    public dot(other: Vector3): number {
        return this.x * other.getX() + this.y * other.getY() + this.z * other.getZ();
    }
    public normalize(): Vector3 {
        const max: number = Math.max(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        return new Vector3(this.x / max, this.y / max, this.z / max);
    }
}

export { Vector3 };