import { Vector3 } from "../Generic/Vector3.js";

class Position extends Vector3 {
    public fromPosition(other: Position): void {
        super.fromVector3(other);
    }

    public clone(): Position {
        return new Position(super.clone());
    }
    public negate(): Position {
        return new Position(super.negate());
    }
    public reciprocate(): Position {
        return new Position(super.reciprocate());
    }
    public add(other: Vector3 | number): Position {
        return new Position(super.add(other));
    }
    public multiply(other: Vector3 | number): Position {
        return new Position(super.multiply(other));
    }
    public normalize(): Position {
        return new Position(super.normalize());
    }
};

export { Position };