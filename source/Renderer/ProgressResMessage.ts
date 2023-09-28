import { MessageType } from "./MessageType.js";
import { WorkerMessage } from "./WorkerMessage.js";

class ProgressResMessage extends WorkerMessage {

    workerIndex: number;
    workerProgress: number;

    constructor(workerIndex: number, workerProgress: number) {
        super(MessageType.PROGRESS_RESPONSE);
        
        this.workerIndex = workerIndex;
        this.workerProgress = workerProgress;
    }
}

export { ProgressResMessage };