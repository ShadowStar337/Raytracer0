import { MessageType } from "./MessageType.js";

/** A message between the main thread and a worker. */
class WorkerMessage {

    type: MessageType;

    /**
     * Constructs a new WorkerMessage instance.
     * @param type The type of this message.
     */
    constructor(type: MessageType) {
        this.type = type;
    }

    /**
     * Returns the type of this message.
     * @returns The type of this message.
     */
    public getType(): MessageType {
        return this.type;
    }
}

export { WorkerMessage };