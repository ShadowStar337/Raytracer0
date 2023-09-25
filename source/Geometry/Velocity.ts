import { Vector3 } from "../Generic/Vector3.js";

class Velocity extends Vector3 {
    public fromVelocity(other: Velocity): void {
        super.fromVector3(other);
    }

    public clone(): Velocity {
        return super.clone() as Velocity;
    }
    public negate(): Velocity {
        return super.negate() as Velocity;
    }
    public reciprocate(): Velocity {
        return super.reciprocate() as Velocity;
    }
    public add(other: Vector3 | number): Velocity {
        return super.add(other) as Velocity;
    }
    public multiply(other: Vector3 | number): Velocity {
        return super.multiply(other) as Velocity;
    }
    public normalize(): Velocity {
        return super.normalize() as Velocity;
    }
};

export { Velocity };