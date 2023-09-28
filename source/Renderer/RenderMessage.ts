import { WorkerMessage } from "./WorkerMessage.js";
import { MessageType } from "./MessageType.js";

class RenderMessage extends WorkerMessage {

    workerIndex: number;
    imageData: number[];

    constructor(workerIndex: number, imageData: number[]) {
        super(MessageType.RENDER);
        
        this.workerIndex = workerIndex;
        this.imageData = imageData;
    }
}

export { RenderMessage };