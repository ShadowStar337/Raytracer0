import { Vector3 } from "../Generic/Vector3.js";

class Position extends Vector3 {
    public fromPosition(other: Position): void {
        super.fromVector3(other);
    }

    public clone(): Position {
        return super.clone() as Position;
    }
    public negate(): Position {
        return super.negate() as Position;
    }
    public reciprocate(): Position {
        return super.reciprocate() as Position;
    }
    public add(other: Vector3 | number): Position {
        return super.add(other) as Position;
    }
    public multiply(other: Vector3 | number): Position {
        return super.multiply(other) as Position;
    }
    public normalize(): Position {
        return super.normalize() as Position;
    }
};

export { Position };