import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Color } from "../Generic/Color.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";
import { RenderConfig } from "../RenderConfig.js";
import { PreloadMessage } from "./Message/PreloadMessage.js";
import { WorkerPosition } from "./WorkerPosition.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { MessageType } from "./Message/MessageType.js";

/** A renderer that manages the render of a scene. */
class Renderer {
    private frameBuffer: FrameBuffer;
    private entityManager: EntityManager;

    private cameraPosition: Position;

    private workerRenderCount: number;
    private workerProgresses: number[];
    private respondedWorkers: boolean[];
    private workers: Worker[];
    private workerPositions: WorkerPosition[];

    private startTime: number;
    private endTime: number;
    private nextProgressUpdateTime: number;

    /**
     * Constructs a new Renderer instance.
     */
    constructor() {
        this.frameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.cameraPosition = new Vector3(0, 0, 0);

        this.workerRenderCount = 0;
        this.workerProgresses = new Array<number>(RenderConfig.threads);
        this.respondedWorkers = new Array<boolean>(RenderConfig.threads);
        this.workers = [];
        this.workerPositions = [];

        this.startTime = 0;
        this.endTime = 0;
        this.nextProgressUpdateTime = Mathematics.roundUp(Date.now(), 1000);
    }

    /**
     * Initializes this renderer.
     */
    public init(): void {
        this.frameBuffer.init();
    }

    /**
     * Adds an entity to the entity manager.
     * @param entity The entity to add to the entity manager.
     */
    public addEntity(entity: Entity): void {
        this.entityManager.addEntity(entity);
    }

    /**
     * Records the start time and dispatches web workers to render the scene.
     */
    public draw(): void {
        this.startTime = Date.now();

        this.workerProgresses.fill(0);
        this.respondedWorkers.fill(false);

        for (let i: number = 0; i < RenderConfig.threads; i++) {
            this.createWorker(i);
        }
    }

    /**
     * Creates and dispatches a web worker.
     * @param workerIndex The index of the web worker to be created.
     */
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

    /**
     * Determines the action to take when a message is sent from a worker to the main thread.
     * @param e The raw MessageEvent object that is created when the message is sent from a worker to the main thread.
     */
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

    /**
     * Updates recorded worker progresses with a raw WorkerMessage object and the progress display when necessary.
     * @param workerMessage The raw WorkerMessage object.
     */
    private workerOnProgressRes(workerMessage: any): void {
        const workerIndex: number = workerMessage.workerIndex;
        const workerProgress: number = workerMessage.workerProgress;
        
        this.updateWorkerProgresses(workerIndex, workerProgress);

        if (this.allWorkersResponded() && Date.now() > this.nextProgressUpdateTime) {
            this.nextProgressUpdateTime += 1000;

            this.updateDisplays();
        }
    }

    /**
     * Updates a worker's recorded progress.
     * @param workerIndex The index of the worker.
     * @param workerProgress The progress of the worker.
     */
    private updateWorkerProgresses(workerIndex: number, workerProgress: number): void {
        this.workerProgresses[workerIndex] = workerProgress;
        this.respondedWorkers[workerIndex] = true;
    }

    /**
     * Checks whether all workers responded at least once during a render.
     * @returns 
     */
    private allWorkersResponded(): boolean {
        for (let i: number = 0; i < RenderConfig.threads; i++) {
            if (!this.respondedWorkers[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Updates the displays.
     */
    private updateDisplays(): void {
        this.updateProgress();
        this.updateTotalTime();
    }

    /**
     * Updates the progress display.
     */
    private updateProgress(): void {
        let sum: number = 0;
        for (let i: number = 0; i < RenderConfig.threads; i++) {
            const workerProgress: number = this.workerProgresses[i];
            sum += workerProgress;
        }

        this.frameBuffer.updateProgress(sum / RenderConfig.threads);
    }

    /**
     * Updates the total time display.
     */
    private updateTotalTime(): void {
        this.endTime = Date.now();
        this.frameBuffer.updateTimeTaken(this.endTime - this.startTime);
    }

    /**
     * Handles a worker when a worker finishes a render.
     * @param workerMessage The raw WorkerMessage object.
     */
    private workerOnRender(workerMessage: any): void {
        const workerIndex: number = workerMessage.workerIndex;
        const imageData: number[] = workerMessage.imageData;

        this.terminateWorker(workerIndex);
        this.loadWorkerRender(workerIndex, imageData);
    
        if (this.workerRenderCount === RenderConfig.threads) {
            this.terminateDraw();

            this.updateDisplays();
        }
    }

    /**
     * Terminates a worker.
     * @param workerIndex The index of the worker to terminate.
     */
    private terminateWorker(workerIndex: number): void {
        const worker: Worker = this.workers[workerIndex];
        worker.terminate();
        this.workerProgresses[workerIndex] = 1;
        this.workerRenderCount += 1;
    }

    /**
     * Loads the render of a worker into the display.
     * @param workerIndex The index of the worker.
     * @param imageData The image data of the worker.
     */
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
                const color: Color = new Vector3(imageData[pixelIndex], imageData[pixelIndex + 1], imageData[pixelIndex + 2]);

                this.frameBuffer.setPixel(j, i, this.linearToSRGB(color).multiply(255));
            }
        }
    }

    /**
     * Terminates the render.
     */
    private terminateDraw(): void {
        this.workers = [];
        this.frameBuffer.draw(); 
    }

    /**
     * Converts a color from linear space to sRGB space, assuming that the color is between inclusive 0 and inclusive 1.
     * @param color The color in linear space.
     * @returns The color in sRGB space.
     */
    private linearToSRGB(color: Color): Color {
        const newColor: Color = new Vector3();

        const red: number = color.getX();
        const green: number = color.getY();
        const blue: number = color.getZ();

        const newRed: number = this.linearValueToSRGB(red);
        const newGreen: number = this.linearValueToSRGB(green);
        const newBlue: number = this.linearValueToSRGB(blue);

        newColor.fromValues(newRed, newGreen, newBlue);

        return newColor;
    }

    /**
     * Converts a color value from linear space to sRGB space, assuming that the value is between inclusive 0 and inclusive 1.
     * @param value The color value in linear space.
     * @returns The color value in sRGB space.
     */
    private linearValueToSRGB(value: number): number {
        if (value <= 0.0031308) {
            return value * 12.92;
        }
        return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
    }
}

export { Renderer };