import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Color } from "../Geometry/Color.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";
import { RenderConfig } from "../RenderConfig.js";
import { PreloadMessage } from "./Message/PreloadMessage.js";
import { WorkerPosition } from "./WorkerPosition.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { MessageType } from "./Message/MessageType.js";

class Renderer {
    private frameBuffer: FrameBuffer;
    private entityManager: EntityManager;

    private cameraPosition: Position;

    private finishedWorkerCount: number;
    private workerProgresses: number[];
    private respondedWorkers: boolean[];
    private workers: Worker[];
    private workerPositions: WorkerPosition[];

    private startTime: number;
    private endTime: number;
    private nextProgressUpdateTime: number;

    constructor() {
        this.frameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.cameraPosition = new Vector3(0, 0, 0);

        this.finishedWorkerCount = 0;
        this.workerProgresses = new Array<number>(RenderConfig.threads);
        this.respondedWorkers = new Array<boolean>(RenderConfig.threads);
        this.workers = [];
        this.workerPositions = [];

        this.startTime = 0;
        this.endTime = 0;
        this.nextProgressUpdateTime = Mathematics.roundUp(Date.now(), 1000);
    }

    public addEntity(entity: Entity): void {
        this.entityManager.addEntity(entity);
    }

    public draw(): void {
        this.startTime = Date.now();

        this.workerProgresses.fill(0);
        this.respondedWorkers.fill(false);

        for (let i: number = 0; i < RenderConfig.threads; i++) {
            this.createWorker(i);
        }
    }

    private createWorker(workerIndex: number): void {
        const worker: Worker = new Worker("./js/Renderer/RenderWorker.js", { type: "module" });
        this.workers.push(worker);

        const threadHeight: number = RenderConfig.canvasHeight / RenderConfig.threads;
        const startY: number = Math.floor(threadHeight * workerIndex);
        const endY: number = Math.floor(threadHeight * (workerIndex + 1));
        const startPosition: Position = new Vector3(0, startY, 0);
        const endPosition: Position = new Vector3(RenderConfig.canvasWidth, endY, 0);
        this.workerPositions.push(new WorkerPosition(startPosition, endPosition));

        worker.postMessage(new PreloadMessage(workerIndex, this.cameraPosition, this.entityManager, startPosition, endPosition));

        worker.onmessage = this.workerOnMessage.bind(this);
    }

    private workerOnMessage(e: any): void {
        switch (e.data.type) {
            case MessageType.RENDER:
                this.workerOnRender(e.data);
                break;
            case MessageType.PROGRESS_RESPONSE:
                this.workerOnProgressRes(e.data);
                break;
        }
    }

    private workerOnProgressRes(workerMessage: any): void {
        const workerIndex: number = workerMessage.workerIndex;
        const workerProgress: number = workerMessage.workerProgress;
        
        this.updateWorkerProgresses(workerIndex, workerProgress);

        if (this.allWorkersResponded() && Date.now() > this.nextProgressUpdateTime) {
            this.nextProgressUpdateTime += 1000;

            this.updateProgress();
            this.updateTimeTaken();
        }
    }

    private updateWorkerProgresses(workerIndex: number, workerProgress: number): void {
        this.workerProgresses[workerIndex] = workerProgress;
        this.respondedWorkers[workerIndex] = true;
    }

    private allWorkersResponded(): boolean {
        for (let i: number = 0; i < RenderConfig.threads; i++) {
            if (!this.respondedWorkers[i]) {
                return false;
            }
        }
        return true;
    }

    private updateProgress(): void {
        let sum: number = 0;
        for (let i: number = 0; i < RenderConfig.threads; i++) {
            const workerProgress: number = this.workerProgresses[i];
            sum += workerProgress;
        }

        this.frameBuffer.updateProgress(sum / RenderConfig.threads);
    }

    private updateTimeTaken(): void {
        this.endTime = Date.now();
        this.frameBuffer.updateTimeTaken(this.endTime - this.startTime);
    }

    private workerOnRender(workerMessage: any): void {
        const workerIndex: number = workerMessage.workerIndex;
        const imageData: number[] = workerMessage.imageData;

        this.terminateWorker(workerIndex);
        this.loadWorkerRender(workerIndex, imageData);
    
        if (this.finishedWorkerCount === RenderConfig.threads) {
            this.terminateDraw();

            this.updateProgress();
            this.updateTimeTaken();
        }
    }

    private terminateWorker(workerIndex: number): void {
        const worker: Worker = this.workers[workerIndex];
        worker.terminate();
        this.workerProgresses[workerIndex] = 1;
        this.finishedWorkerCount += 1;
    }

    private loadWorkerRender(workerIndex: number, imageData: number[]): void {
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
                const color: Color = new Color(imageData[pixelIndex], imageData[pixelIndex + 1], imageData[pixelIndex + 2]);

                this.frameBuffer.setPixel(j, i, this.linearToGamma(color).multiply(255));
            }
        }
    }

    private terminateDraw(): void {
        this.workers = [];
        this.frameBuffer.draw(); 
    }

    private linearToGamma(color: Color): Color {
        return color.exponentiate(1 / 2);
    }
}

export { Renderer };