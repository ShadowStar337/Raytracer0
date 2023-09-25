import { Vector3 } from "../Generic/Vector3.js";
import { Position } from "./Position.js";
import { Direction } from "./Direction.js";

class Ray {

    private origin: Vector3;
    private direction: Vector3;

    constructor(origin?: Vector3, direction?: Vector3) {
        this.origin = new Position();
        this.direction = new Direction();

        if (origin !== undefined && direction !== undefined) {
            this.origin = origin;
            this.direction = direction;
        }
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

    public at(time: number): Position {
        return this.origin.add(this.direction.multiply(time)) as Position;
    }
}

export { Ray };