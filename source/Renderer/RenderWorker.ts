import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Ray } from "../Geometry/Ray.js";
import { Color } from "../Geometry/Color.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";
import { Sphere } from "../Entity/Sphere.js";
import { RenderConfig } from "../RenderConfig.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { EntityType } from "../Entity/EntityType.js";

class RenderWorker {
    private cameraPosition: Position;
    private entityManager: EntityManager;
    private startPosition: Position;
    private endPosition: Position;

    private imageData: number[];

    backgroundColor1: Color;
    backgroundColor2: Color;

    constructor(cameraPosition: Vector3, entityManager: EntityManager, startPosition: Position, endPosition: Position) {
        this.cameraPosition = cameraPosition;
        this.entityManager = entityManager;
        this.startPosition = startPosition;
        this.endPosition = endPosition;

        this.imageData = [];

        this.backgroundColor1 = new Color(0.5, 0.7, 1.0);
        this.backgroundColor2 = new Color(1, 1, 1);
    }

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
            }
        }
    }

    public getImageData(): number[] {
        return this.imageData;
    }

    public setPixel(x: number, y: number, color: Color): void {
        const pixelIndex: number = y * RenderConfig.canvasWidth * 4 + x * 4;
        this.imageData[pixelIndex + 0] = color.getRed();
        this.imageData[pixelIndex + 1] = color.getGreen();
        this.imageData[pixelIndex + 2] = color.getBlue();
        this.imageData[pixelIndex + 3] = 1;
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

onmessage = function(e: any): void {
    const workerMessage: any = e.data[0];

    const otherCameraPosition: any = workerMessage.cameraPosition;
    const cameraPosition: Position = Vector3.createFromRaw(otherCameraPosition);

    const otherEntityManager: any = workerMessage.entityManager;
    const entityManager: EntityManager = new EntityManager();

    const otherEntitiesLength: number = otherEntityManager.entities.length;
    for (let i: number = 0; i < otherEntitiesLength; i++) {
        const otherRawEntity: any = otherEntityManager.entities[i];

        switch (otherRawEntity.type) {
            case EntityType.Sphere:
                const otherEntity: Sphere = Sphere.createFromRaw(otherRawEntity);
                entityManager.addEntity(otherEntity);
                break;
        }
    }

    const otherStartPosition: any = workerMessage.startPosition;
    const startPosition: Position = Vector3.createFromRaw(otherStartPosition);

    const otherEndPosition: any = workerMessage.endPosition;
    const endPosition: Position = Vector3.createFromRaw(otherEndPosition);

    const renderWorker: RenderWorker = new RenderWorker(cameraPosition, entityManager, startPosition, endPosition);
    renderWorker.draw();

    this.postMessage(renderWorker.getImageData());
}