import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Ray } from "../Geometry/Ray.js";
import { Color } from "../Geometry/Color.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";
import { RenderConfig } from "../RenderConfig.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { WorkerMessage } from "./WorkerMessage.js";

class Renderer {
    frameBuffer: FrameBuffer;
    entityManager: EntityManager;

    cameraPosition: Position;

    backgroundColor1: Color;
    backgroundColor2: Color;

    renderWorkerCount: number;

    startTime: Date;
    endTime: Date;

    constructor() {
        this.frameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.cameraPosition = new Vector3(0, 0, 0);

        this.backgroundColor1 = new Color(0.5, 0.7, 1);
        this.backgroundColor2 = new Color(1, 1, 1);

        this.renderWorkerCount = 0;

        this.startTime = new Date();
        this.endTime = new Date();
    }

    public addEntity(entity: Entity): void {
        this.entityManager.addEntity(entity);
    }

    public draw(): void {
        const viewportStartX: number = -RenderConfig.viewportWidth / 2;
        const viewportStartY: number = RenderConfig.viewportHeight / 2;
        const viewportStartZ: number = -1;
        const viewportStart: Position = new Vector3(viewportStartX, viewportStartY, viewportStartZ);
    
        const deltaWidth: Vector3 = new Vector3(RenderConfig.viewportWidth / RenderConfig.canvasWidth, 0, 0);
        const deltaHeight: Vector3 = new Vector3(0, -RenderConfig.viewportHeight / RenderConfig.canvasHeight, 0);
    
        this.startTime = new Date();

        let previousProgress: number = 0;

        for (let i: number = 0; i < RenderConfig.threads; i++) {
            const worker: Worker = new Worker("./js/Renderer/RenderWorker.js", { type: "module" });

            const startPosition: Position = new Vector3(0, Math.floor(RenderConfig.canvasHeight / RenderConfig.threads) * i, 0);
            const endPosition: Position = new Vector3(RenderConfig.canvasWidth, Math.floor(RenderConfig.canvasHeight / RenderConfig.threads) * (i + 1), 0);

            worker.postMessage([
                new WorkerMessage(this.cameraPosition, this.entityManager, startPosition, endPosition)
            ]);

            this.renderWorkerCount += 1;

            worker.onmessage = (e: any): void => {
                worker.terminate();
                this.renderWorkerCount -= 1;

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

                if (this.renderWorkerCount == 0) {
                    this.endTime = new Date();
                    console.log("Milliseconds taken to render image:", this.endTime.getTime() - this.startTime.getTime());

                    this.frameBuffer.draw();
                }
            }
        }

        

        this.frameBuffer.draw();
    }

    private linearToGamma(color: Color): Color {
        return color.exponentiate(1 / 2);
    }

    private samplePixel(viewportStart: Position, currentDelta: Vector3, deltaWidth: Vector3, deltaHeight: Vector3): Color {
        const viewportPoint: Position = viewportStart.add(currentDelta);
        const sampleColors: Color[] = [];

        for (let i: number = 0; i < RenderConfig.samplesPerPixel; i++) {
            const sampleDeltaX: number = Mathematics.intervalRandom(-1 / 3, 1 / 3);
            const sampleDeltaY: number = Mathematics.intervalRandom(-1 / 3, 1 / 3);
            const sample: Vector3 = deltaWidth.multiply(sampleDeltaX).add(deltaHeight.multiply(sampleDeltaY));
                
            const sampleViewportPoint: Position = viewportPoint.add(sample);

            const ray: Ray = new Ray(this.cameraPosition, sampleViewportPoint.add(this.cameraPosition.negate()).normalize());
            sampleColors.push(this.traceRay(ray, RenderConfig.maxBouncesPerRay));
        }

        let sampleColorSum: Color = new Color(0, 0, 0);
        const sampleColorsLength: number = sampleColors.length;
        for (let i: number = 0; i < sampleColorsLength; i++) {
            const sampleColor: Color = sampleColors[i];
            sampleColorSum = sampleColorSum.add(sampleColor);
        }
        
        const sampleColorAverage: Color = sampleColorSum.multiply(1 / sampleColorsLength);

        return sampleColorAverage;
    }

    private traceRay(ray: Ray, depth: number): Color {
        if (depth == 0) {
            return new Color(0, 0, 0);
        }

        const hitInformation: HitInformation = this.entityManager.hit(ray, 0.001, Number.MAX_SAFE_INTEGER);

        if (hitInformation.getHit()) {
            const randomVector: Vector3 = new Vector3();
            randomVector.fromUnitRandom(-1, 1);

            const surfaceNormal: Vector3 = hitInformation.getNormal();

            // const surfaceVector: Vector3 = surfaceNormal.dot(randomVector) > 0 ? randomVector : randomVector.negate();
            const surfaceVector: Vector3 = surfaceNormal.add(randomVector);
            
            return this.traceRay(new Ray(hitInformation.getPosition(), surfaceVector), depth - 1).multiply(0.3);
        }

        const normalizedY: number = (ray.getDirection().getY() + 1) * 0.5;
        
        return this.backgroundColor2.multiply(1 - normalizedY).add(this.backgroundColor1.multiply(normalizedY));
    }
}

export { Renderer };