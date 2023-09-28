import { MessageType } from "./MessageType.js";
import { WorkerMessage } from "./WorkerMessage.js";

class ProgressReqMessage extends WorkerMessage {

    workerIndex: number;

    constructor(workerIndex: number) {
        super(MessageType.PROGRESS_REQUEST);

        this.workerIndex = workerIndex;
    }
}

export { ProgressReqMessage };