import { MessageType } from "./MessageType.js";

class WorkerMessage {

    type: MessageType;

    constructor(type: MessageType) {
        this.type = type;
    }
}

export { WorkerMessage };