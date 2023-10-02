import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Ray } from "../Geometry/Ray.js";
import { Color } from "../Generic/Color.js";
import { HitInformation } from "../Entity/HitInformation.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { RenderConfig } from "../RenderConfig.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { MessageType } from "./Message/MessageType.js";
import { RenderMessage } from "./Message/RenderMessage.js";
import { ProgressMessage } from "./Message/ProgressMessage.js";
import { ScatterInformation } from "../Entity/ScatterInformation.js";

/** A web worker that renders a part of a scene. */
class RenderWorker {
    private workerIndex: number;
    private cameraPosition: Position;
    private entityManager: EntityManager;
    private startPosition: Position;
    private endPosition: Position;

    private imageData: number[];

    private workerPixels: number;
    private finishedPixels: number;

    private backgroundColor1: Color;
    private backgroundColor2: Color;

    private nextResponseTime: number;

    /**
     * Constructs a new RenderWorker instance.
     * @param workerIndex The index of the worker.
     * @param cameraPosition The camera position of the scene.
     * @param entityManager The entity manager to render with.
     * @param startPosition The canvas start position of the worker.
     * @param endPosition The canvas end position of the worker.
     */
    constructor(workerIndex: number, cameraPosition: Vector3, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        this.workerIndex = workerIndex;
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;

        this.imageData = [];

        const startX: number = this.startPosition.getX();
        const startY: number = this.startPosition.getY();
        const endX: number = this.endPosition.getX();
        const endY: number = this.endPosition.getY();
        this.workerPixels = Math.abs(endX - startX) * Math.abs(endY - startY);
        this.finishedPixels = 0;

        this.backgroundColor1 = new Vector3(0.5, 0.7, 1.0);
        this.backgroundColor2 = new Vector3(1.0, 1.0, 1.0);

        this.nextResponseTime = Mathematics.roundUp(Date.now(), 1000);
    }

    /**
     * Renders part of a scene.
     */
    public draw(): void {
        const viewportStartX: number = -RenderConfig.viewportWidth / 2;
        const viewportStartY: number = RenderConfig.viewportHeight / 2;

        const viewportStartZ: number = -1;
        const viewportStart: Position = new Vector3(viewportStartX, viewportStartY, viewportStartZ);

        const deltaWidth: Vector3 = new Vector3(RenderConfig.viewportWidth / RenderConfig.canvasWidth, 0, 0);
        const deltaHeight: Vector3 = new Vector3(0, -RenderConfig.viewportHeight / RenderConfig.canvasHeight, 0);

        const startX: number = this.startPosition.getX();
        const startY: number = this.startPosition.getY();
        const endX: number = this.endPosition.getX();
        const endY: number = this.endPosition.getY();

        for (let i: number = startY; i < endY; i++) {
            for (let j: number = startX; j < endX; j++) {
                const color: Color = this.samplePixel(viewportStart, deltaHeight.multiply(i).add(deltaWidth.multiply(j)), deltaWidth, deltaHeight);
                this.setPixel(j, i, color);
                this.finishedPixels += 1;
            }
        }
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

    /**
     * Sends a progress message to the main thread with the current progress of this worker.
     */
    private sendProgress(): void {
        const progress: number = this.finishedPixels / this.workerPixels;
        postMessage(new ProgressMessage(this.workerIndex, progress));
    }

    /**
     * Sets a pixel color of the image data of this worker.
     * @param x The x-coordinate of the pixel.
     * @param y The y-coordinate of the pixel.
     * @param color The pixel color to set.
     */
    private setPixel(x: number, y: number, color: Color): void {
        const pixelIndex: number = y * RenderConfig.canvasWidth * 4 + x * 4;
        this.imageData[pixelIndex + 0] = color.getX();
        this.imageData[pixelIndex + 1] = color.getY();
        this.imageData[pixelIndex + 2] = color.getZ();
        this.imageData[pixelIndex + 3] = 1;
    }

    /**
     * Samples a pixel by sending out multiple rays into the scene and averaging the collected light color.
     * @param viewportStart The viewport start position of the pixel to sample.
     * @param currentOffset The viewport of the pixel to sample.
     * @param deltaWidth The width of the viewport delta.
     * @param deltaHeight The height of the viewport delta.
     * @returns The result of the sample.
     */
    private samplePixel(viewportStart: Position, currentOffset: Vector3, deltaWidth: Vector3, deltaHeight: Vector3): Color {
        const viewportPoint: Position = viewportStart.add(currentOffset);
        const sampleColors: Color[] = [];

        for (let i: number = 0; i < RenderConfig.samplesPerPixel; i++) {
            const sampleDeltaX: number = Mathematics.intervalRandom(-1 / 3, 1 / 3);
            const sampleDeltaY: number = Mathematics.intervalRandom(-1 / 3, 1 / 3);
            const sample: Vector3 = deltaWidth.multiply(sampleDeltaX).add(deltaHeight.multiply(sampleDeltaY));
                
            const sampleViewportPoint: Position = viewportPoint.add(sample);

            const ray: Ray = new Ray(this.cameraPosition, sampleViewportPoint.add(this.cameraPosition.negate()).normalize());
            sampleColors.push(this.traceRay(ray, RenderConfig.maxBouncesPerRay));

            if (Date.now() > this.nextResponseTime) {
                this.sendProgress();
                this.nextResponseTime += 1000;
            }
        }

        let sampleColorSum: Color = new Vector3(0, 0, 0);
        const sampleColorsLength: number = sampleColors.length;
        for (let i: number = 0; i < sampleColorsLength; i++) {
            const sampleColor: Color = sampleColors[i];
            sampleColorSum = sampleColorSum.add(sampleColor);
        }
        
        const sampleColorAverage: Color = sampleColorSum.multiply(1 / sampleColorsLength);

        return sampleColorAverage;
    }

    /**
     * Calculates the collected light color of a ray recursively.
     * @param ray The ray to calculate with.
     * @param depth The remaining depth of the recursion.
     * @returns The collected light color.
     */
    private traceRay(ray: Ray, depth: number): Color {
        if (depth == 0) {
            return new Vector3(0, 0, 0);
        }

        const hitInformation: HitInformation = this.entityManager.hit(ray, 0.001, Number.MAX_SAFE_INTEGER);

        if (hitInformation.getHit()) {
            const scatterInformation: ScatterInformation = hitInformation.getMaterial().scatter(ray, hitInformation);

            if (scatterInformation.getScattered()) {
                return this.traceRay(scatterInformation.getScatteredRay(), depth - 1).multiply(scatterInformation.getAttentuation());
            }
            return new Vector3(0, 0, 0);
        }

        const normalizedY: number = (ray.getDirection().getY() + 1) * 0.5;
        
        return this.backgroundColor2.multiply(1 - normalizedY).add(this.backgroundColor1.multiply(normalizedY));
    }
}

let renderWorker: RenderWorker;

onmessage = onMainMessage;

/**
 * Determines the action to take when a message is sent from the main thread to a worker.
 */
function onMainMessage(e: any): void {
    switch (e.data.type) {
        case MessageType.PRELOAD:
            loadPreload(e.data);
            startRender();
            break;
    }
}

/**
 * Loads a preload message into a RenderWorker instance.
 * @param workerMessage 
 */
function loadPreload(workerMessage: any): void {
    const workerIndex: number = workerMessage.workerIndex;

    const otherCameraPosition: any = workerMessage.cameraPosition;
    const cameraPosition: Position = Vector3.createFromRaw(otherCameraPosition);

    const entityManager: EntityManager = EntityManager.createFromRaw(workerMessage.entityManager);

    const otherStartPosition: any = workerMessage.startPosition;
    const startPosition: Position = Vector3.createFromRaw(otherStartPosition);

    const otherEndPosition: any = workerMessage.endPosition;
    const endPosition: Position = Vector3.createFromRaw(otherEndPosition);

    renderWorker = new RenderWorker(workerIndex, cameraPosition, entityManager, startPosition, endPosition);
}

/**
 * Starts the render and sends a render message to the main thread when done.
 */
function startRender(): void {
    renderWorker.draw();

    const imageData: number[] = renderWorker.getImageData();

    postMessage(new RenderMessage(renderWorker.getWorkerIndex(), imageData));
}