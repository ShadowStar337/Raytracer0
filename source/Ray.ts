import { Vector3 } from "./Vector3.js";
import { Position } from "./Kinematics.js";
import { Direction } from "./Direction.js";

class Ray {

    private origin: Position;
    private direction: Direction;

    constructor() {
        this.origin = new Position();
        this.direction = new Direction();
    }

    public fromValues(origin: Position, direction: Direction): void {
        this.origin = origin;
        this.direction = direction;
    }

    public getOrigin(): Position {
        return this.origin;
    }
    public getDirection(): Direction {
        return this.direction;
    }

    public at(t: number): Position {
        return this.origin.add(this.direction.multiply(t)) as Position;
    }
}