import { MessageType } from "./MessageType.js";
import { WorkerMessage } from "./WorkerMessage.js";

/** A progress message sent to the main thread. */
class ProgressMessage extends WorkerMessage {

    workerIndex: number;
    workerProgress: number;

    /**
     * Constructs a new ProgressMessage instance.
     * @param workerIndex The index of the worker this message is from.
     * @param workerProgress The progress of the worker this message is from.
     */
    constructor(workerIndex: number, workerProgress: number) {
        super(MessageType.PROGRESS_RESPONSE);
        
        this.workerIndex = workerIndex;
        this.workerProgress = workerProgress;
    }

    /**
     * Returns the index of the worker.
     * @returns The index of the worker.
     */
    public getWorkerIndex(): number {
        return this.workerIndex;
    }

    /**
     * Returns the progress of the worker.
     * @returns The progress of the worker.
     */
    public getWorkerProgress(): number {
        return this.workerProgress;
    }
}

export { ProgressMessage };