import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Color } from "../Geometry/Color.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";
import { RenderConfig } from "../RenderConfig.js";
import { WorkerMessage } from "./WorkerMessage.js";
import { WorkerPosition } from "./WorkerPosition.js";

class Renderer {
    private frameBuffer: FrameBuffer;
    private entityManager: EntityManager;

    private cameraPosition: Position;

    private workerCount: number;
    private workers: Worker[];
    private workerPositions: WorkerPosition[];

    private startTime: Date;
    private endTime: Date;

    constructor() {
        this.frameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.cameraPosition = new Vector3(0, 0, 0);

        this.workerCount = 0;
        this.workers = [];
        this.workerPositions = [];

        this.startTime = new Date();
        this.endTime = new Date();
    }

    public addEntity(entity: Entity): void {
        this.entityManager.addEntity(entity);
    }

    public draw(): void {
        this.startTime = new Date();

        for (let i: number = 0; i < RenderConfig.threads; i++) {
            this.createWorker(i);
        }
    }

    private createWorker(workerIndex: number): void {
        const worker: Worker = new Worker("./js/Renderer/RenderWorker.js", { type: "module" });
        this.workers.push(worker);
        this.workerCount += 1;

        const threadHeight: number = RenderConfig.canvasHeight / RenderConfig.threads;
        const startY: number = Math.floor(threadHeight * workerIndex);
        const endY: number = Math.floor(threadHeight * (workerIndex + 1));
        const startPosition: Position = new Vector3(0, startY, 0);
        const endPosition: Position = new Vector3(RenderConfig.canvasWidth, endY, 0);
        this.workerPositions.push(new WorkerPosition(startPosition, endPosition));

        worker.postMessage([
            new WorkerMessage(this.cameraPosition, this.entityManager, startPosition, endPosition)
        ]);

        worker.onmessage = (e: any): void => {
            this.terminateWorker(workerIndex);
            this.loadWorkerRender(workerIndex, e);

            if (this.workerCount === 0) {
                this.terminateDraw();
            }
        }
    }

    private terminateWorker(workerIndex: number): void {
        const worker: Worker = this.workers[workerIndex];
        worker.terminate();
        this.workerCount -= 1;
    }

    private loadWorkerRender(workerIndex: number, e: any): void {
        const workerPosition: WorkerPosition = this.workerPositions[workerIndex];
        const startPosition: Position = workerPosition.getStartPosition();
        const endPosition: Position = workerPosition.getEndPosition();

        const startX: number = startPosition.getX();
        const startY: number = startPosition.getY();
        const endX: number = endPosition.getX();
        const endY: number = endPosition.getY();

        for (let i: number = startY; i < endY; i++) {
            for (let j: number = startX; j < endX; j++) {
                const pixelIndex: number = i * RenderConfig.canvasWidth * 4 + j * 4;
                const color: Color = new Color(e.data[pixelIndex], e.data[pixelIndex + 1], e.data[pixelIndex + 2]);

                this.frameBuffer.setPixel(j, i, this.linearToGamma(color).multiply(255));
            }
        }
    }

    private terminateDraw(): void {
        this.workers = [];

        this.endTime = new Date();
        console.log("Milliseconds taken to render image:", this.endTime.getTime() - this.startTime.getTime());

        this.frameBuffer.draw();
    }

    private linearToGamma(color: Color): Color {
        return color.exponentiate(1 / 2);
    }
}

export { Renderer };