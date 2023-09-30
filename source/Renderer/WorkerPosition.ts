import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";

class WorkerPosition {

    private startPosition: Position;
    private endPosition: Position;

    /**
     * Constructs a new WorkerPosition instance.
     * @param startPosition The start position of the canvas part of a worker.
     * @param endPosition The end position of the canvas part of a worker.
     * @returns A new WorkerPosition instance.
     */
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

    /**
     * Returns the start position of this worker position.
     * @returns The start position of this worker position.
     */
    public getStartPosition(): Position {
        return this.startPosition;
    }

    /**
     * Returns the end position of this worker position.
     * @returns The end position of this worker position.
     */
    public getEndPosition(): Position {
        return this.endPosition;
    }
}

export { WorkerPosition };