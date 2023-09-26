import { Vector3 } from "../Generic/Vector3.js";

class Velocity extends Vector3 {
    public fromVelocity(other: Velocity): void {
        super.fromVector3(other);
    }

    public clone(): Velocity {
        return new Velocity(super.clone());
    }
    public negate(): Velocity {
        return new Velocity(super.negate());
    }
    public reciprocate(): Velocity {
        return new Velocity(super.reciprocate());
    }
    public add(other: Vector3 | number): Velocity {
        return new Velocity(super.add(other));
    }
    public multiply(other: Vector3 | number): Velocity {
        return new Velocity(super.multiply(other));
    }
    public exponentiate(other: Vector3 | number): Velocity {
        return new Velocity(super.exponentiate(other));
    }
    public normalize(): Velocity {
        return new Velocity(super.normalize());
    }
};

export { Velocity };