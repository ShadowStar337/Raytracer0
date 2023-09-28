import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";

class WorkerPosition {

    private startPosition: Position;
    private endPosition: Position;

    constructor(startPosition?: Position | WorkerPosition, endPosition?: Position) {
        if (startPosition instanceof WorkerPosition && endPosition === undefined) {
            this.startPosition = startPosition.startPosition;
            this.endPosition = startPosition.endPosition;
            return;
        }

        if (startPosition instanceof Vector3 && endPosition !== undefined) {
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            return;
        }

        this.startPosition = new Vector3();
        this.endPosition = new Vector3();
    }

    public getStartPosition(): Position {
        return this.startPosition;
    }

    public getEndPosition(): Position {
        return this.endPosition;
    }
}

export { WorkerPosition };