import { EntityManager } from "../../Entity/EntityManager.js";
import { Position } from "../../Geometry/Position.js";
import { WorkerMessage } from "./WorkerMessage.js";
import { MessageType } from "./MessageType.js";

/** A preload message sent to a worker. */
class PreloadMessage extends WorkerMessage {

    private workerIndex: number;
    private cameraPosition: Position;
    private entityManager: EntityManager;
    private startPosition: Position;
    private endPosition: Position;

    /**
     * Constructs a new PreloadMessage instance.
     * @param workerIndex The index of the worker this message is sent to.
     * @param cameraPosition The camera position in the scene.
     * @param entityManager The entity manager to render with.
     * @param startPosition The canvas start position of the worker.
     * @param endPosition The canvas end position of the worker.
     */
    constructor(workerIndex: number, cameraPosition: Position, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        super(MessageType.PRELOAD);

        this.workerIndex = workerIndex;
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    /**
     * Returns the index of the worker.
     * @returns The index of the worker.
     */
    public getWorkerIndex(): number {
        return this.workerIndex;
    }

    /**
     * Returns the camera position.
     * @returns The camera position.
     */
    public getCameraPosition(): Position {
        return this.cameraPosition;
    }

    /**
     * Returns the entity manager to render with.
     * @returns The entity manager to render with.
     */
    public getEntityManager(): EntityManager {
        return this.entityManager;
    }

    /**
     * Returns the canvas start position of the worker.
     * @returns The canvas start position of the worker.
     */
    public getStartPosition(): Position {
        return this.startPosition;
    }

    /**
     * Returns the canvas end position of the worker.
     * @returns The canvas end position of the worker.
     */
    public getEndPosition(): Position {
        return this.endPosition;
    }
}

export { PreloadMessage };