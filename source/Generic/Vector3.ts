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
        const newVector3: Vector3 = new Vector3();
        newVector3.fromValues(this.x, this.y, this.z);
        return newVector3;
    }
    public negate(): Vector3 {
        const newVector3: Vector3 = new Vector3();
        newVector3.fromValues(-this.x, -this.y, -this.z);
        return newVector3;
    }
    public reciprocate(): Vector3 {
        const newVector3: Vector3 = new Vector3();
        newVector3.fromValues(1 / this.x, 1 / this.y, 1 / this.z);
        return newVector3;
    }
    public add(other: Vector3 | number): Vector3 {
        const newVector3: Vector3 = new Vector3();
        if (other instanceof Vector3) {
            newVector3.fromValues(this.x + other.getX(), this.y + other.getY(), this.z + other.getZ());
        } else {
            newVector3.fromValues(this.x + other, this.y + other, this.z + other);
        }
        return newVector3;
    }
    public multiply(other: Vector3 | number): Vector3 {
        const newVector3: Vector3 = new Vector3();
        if (other instanceof Vector3) {
            newVector3.fromValues(this.x * other.getX(), this.y * other.getY(), this.z * other.getZ());
        } else {
            newVector3.fromValues(this.x * other, this.y * other, this.z * other);
        }
        return newVector3;
    }
    public dot(other: Vector3): number {
        return this.x * other.getX() + this.y * other.getY() + this.z * other.getZ();
    }
    public normalize(): Vector3 {
        const newVector3: Vector3 = new Vector3();

        const max: number = Math.max(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        newVector3.fromValues(this.x / max, this.y / max, this.z / max);

        return newVector3;
    }
}

export { Vector3 };