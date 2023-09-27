import { EntityManager } from "../Entity/EntityManager.js";
import { Position } from "../Geometry/Position.js";

class WorkerMessage {

    public cameraPosition: Position;
    public entityManager: EntityManager;
    public startPosition: Position;
    public endPosition: Position;

    constructor(cameraPosition: Position, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }
}

export { WorkerMessage };