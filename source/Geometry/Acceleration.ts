import { Vector3 } from "../Generic/Vector3.js"

class Acceleration extends Vector3 {
    public fromAcceleration(other: Acceleration): void {
        super.fromVector3(other);
    }

    public clone(): Acceleration {
        return new Acceleration(super.clone());
    }
    public negate(): Acceleration {
        return new Acceleration(super.negate());
    }
    public reciprocate(): Acceleration {
        return new Acceleration(super.reciprocate());
    }
    public add(other: Vector3 | number): Acceleration {
        return new Acceleration(super.add(other));
    }
    public multiply(other: Vector3 | number): Acceleration {
        return new Acceleration(super.multiply(other));
    }
    public exponentiate(other: Vector3 | number): Acceleration {
        return new Acceleration(super.exponentiate(other));
    }
    public normalize(): Acceleration {
        return new Acceleration(super.normalize());
    }
};

export { Acceleration };