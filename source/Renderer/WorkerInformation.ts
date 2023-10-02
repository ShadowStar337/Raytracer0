import { WorkerPosition } from "./WorkerPosition";

/** A collection of information about a worker. */
class WorkerInformation {

    public worker: Worker;
    public position: WorkerPosition;
    public progress: number;
    public responded: boolean;

    /**
     * Constructs a WorkerInformation instance.
     * @param worker The worker.
     * @param position The canvas position of the worker.
     * @param progress The progress of the worker.
     * @param responded Whether the worker responded to the main thread.
     */
    constructor(worker: Worker, position: WorkerPosition, progress: number, responded: boolean) {
        this.worker = worker;
        this.position = position;
        this.progress = progress;
        this.responded = responded;
    }
}

export { WorkerInformation };