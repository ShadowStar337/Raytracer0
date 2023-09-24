import { Vector3 } from "./Vector3.js";

class Direction extends Vector3 {
    public fromDirection(other: Direction): void {
        super.fromVector3(other);
    }

    public clone(): Direction {
        return super.clone() as Direction;
    }
    public negate(): Direction {
        return super.negate() as Direction;
    }
    public reciprocate(): Direction {
        return super.reciprocate() as Direction;
    }
    public add(other: Vector3 | number): Direction {
        return super.add(other) as Direction;
    }
    public multiply(other: Vector3 | number): Direction {
        return super.multiply(other) as Direction;
    }
    public normalize(): Direction {
        return super.normalize() as Direction;
    }
}

export { Direction };