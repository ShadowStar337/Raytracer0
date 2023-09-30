import { WorkerMessage } from "./WorkerMessage.js";
import { MessageType } from "./MessageType.js";

/** A render message sent to the main thread. */
class RenderMessage extends WorkerMessage {

    workerIndex: number;
    imageData: number[];

    /**
     * Constructs a new RenderMessage instance.
     * @param workerIndex The index of the worker this message is from.
     * @param imageData The image data of the worker this message is from.
     */
    constructor(workerIndex: number, imageData: number[]) {
        super(MessageType.RENDER);
        
        this.workerIndex = workerIndex;
        this.imageData = imageData;
    }

    /**
     * Returns the index of the worker.
     * @returns The index of the worker.
     */
    public getWorkerIndex(): number {
        return this.workerIndex;
    }

    /**
     * Returns the image data of the worker.
     * @returns The image data of the worker.
     */
    public getImageData(): number[] {
        return this.imageData;
    }
}

export { RenderMessage };