import { Vector3 } from "../Generic/Vector3.js";

class Direction extends Vector3 {
    public fromDirection(other: Direction): void {
        super.fromVector3(other);
    }

    public clone(): Direction {
        return new Direction(super.clone());
    }
    public negate(): Direction {
        return new Direction(super.negate());
    }
    public reciprocate(): Direction {
        return new Direction(super.reciprocate());
    }
    public add(other: Vector3 | number): Direction {
        return new Direction(super.add(other));
    }
    public multiply(other: Vector3 | number): Direction {
        return new Direction(super.multiply(other));
    }
    public normalize(): Direction {
        return new Direction(super.normalize());
    }
}

export { Direction };