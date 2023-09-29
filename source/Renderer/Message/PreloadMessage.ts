import { EntityManager } from "../../Entity/EntityManager.js";
import { Position } from "../../Geometry/Position.js";
import { WorkerMessage } from "./WorkerMessage.js";
import { MessageType } from "./MessageType.js";

class PreloadMessage extends WorkerMessage {

    private workerIndex: number;
    private cameraPosition: Position;
    private entityManager: EntityManager;
    private startPosition: Position;
    private endPosition: Position;

    constructor(workerIndex: number, cameraPosition: Position, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        super(MessageType.PRELOAD);

        this.workerIndex = workerIndex;
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    public getWorkerIndex(): number {
        return this.workerIndex;
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

export { PreloadMessage };