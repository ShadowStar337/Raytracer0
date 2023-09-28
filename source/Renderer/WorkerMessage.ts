import { EntityManager } from "../Entity/EntityManager.js";
import { Position } from "../Geometry/Position.js";

class WorkerMessage {

    private cameraPosition: Position;
    private entityManager: EntityManager;
    private startPosition: Position;
    private endPosition: Position;

    constructor(cameraPosition: Position, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    public getCameraPosition(): Position {
        return this.cameraPosition;
    }
    public getEntityManager(): EntityManager {
        return this.entityManager;
    }
    public getStartPosition(): Position {
        return this.startPosition;
    }
    public getEndPosition(): Position {
        return this.endPosition;
    }
}

export { WorkerMessage };