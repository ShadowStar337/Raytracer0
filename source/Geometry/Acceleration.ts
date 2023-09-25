import { Vector3 } from "../Generic/Vector3.js"

class Acceleration extends Vector3 {
    public fromAcceleration(other: Acceleration): void {
        super.fromVector3(other);
    }

    public clone(): Acceleration {
        return super.clone() as Acceleration;
    }
    public negate(): Acceleration {
        return super.negate() as Acceleration;
    }
    public reciprocate(): Acceleration {
        return super.reciprocate() as Acceleration;
    }
    public add(other: Vector3 | number): Acceleration {
        return super.add(other) as Acceleration;
    }
    public multiply(other: Vector3 | number): Acceleration {
        return super.multiply(other) as Acceleration;
    }
    public normalize(): Acceleration {
        return super.normalize() as Acceleration;
    }
};

export { Acceleration };