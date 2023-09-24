import { Vector3 } from "./Vector3.js"

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

export { Position, Velocity, Acceleration };