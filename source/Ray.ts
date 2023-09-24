import { Vector3 } from "./Vector3.js";
import { Position } from "./Kinematics.js";
import { Direction } from "./Direction.js";

class Ray {

    private origin: Vector3;
    private direction: Vector3;

    constructor() {
        this.origin = new Position();
        this.direction = new Direction();
    }

    public fromValues(origin: Vector3, direction: Vector3): void {
        this.origin = origin;
        this.direction = direction;
    }

    public getOrigin(): Position {
        return this.origin as Position;
    }
    public getDirection(): Direction {
        return this.direction as Direction;
    }

    public at(t: number): Position {
        return this.origin.add(this.direction.multiply(t)) as Position;
    }
}

export { Ray };