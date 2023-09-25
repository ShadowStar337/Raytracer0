import { FrameBuffer } from "./FrameBuffer.js";
import { Position } from "../Geometry/Position.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Ray } from "../Geometry/Ray.js";
import { Color } from "../Geometry/Color.js";
import { Sphere } from "../Entity/Sphere.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityManager } from "../Entity/EntityManager.js";
import { Entity } from "../Entity/Entity.js";

class Renderer {
    FrameBuffer: FrameBuffer;
    entityManager: EntityManager;

    canvasHeight: number;
    canvasWidth: number;
    aspectRatio: number;

    viewportHeight: number;
    viewportWidth: number;

    cameraPos: Position;

    constructor() {
        this.FrameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.canvasHeight = this.FrameBuffer.getCanvasHeight();
        this.canvasWidth = this.FrameBuffer.getCanvasWidth();
        this.aspectRatio = this.FrameBuffer.getAspectRatio();

        this.viewportHeight = 2;
        this.viewportWidth = this.aspectRatio * this.viewportHeight;

        this.cameraPos = new Position(0, 0, 0);
    }

    public addEntity(entity: Entity) {
        this.entityManager.addEntity(entity);
    }

    public draw() {
        const viewportStartX: number = -this.viewportWidth / 2;
        const viewportStartY: number = this.viewportHeight / 2;
        const viewportStartZ: number = -1;
        const viewportStart: Position = new Position(viewportStartX, viewportStartY, viewportStartZ);
    
        const deltaWidth: Vector3 = new Vector3(this.viewportWidth / this.canvasWidth, 0, 0);
        const deltaHeight: Vector3 = new Vector3(0, -this.viewportHeight / this.canvasHeight, 0);
    
        
    
        let previousProgress: number = 0;
        
        for (let i: number = 0; i < this.canvasHeight; i++) {
            for (let j: number = 0; j < this.canvasWidth; j++) {
                
                const color: Color = this.samplePixel(viewportStart, deltaHeight.multiply(i).add(deltaWidth.multiply(j)), deltaWidth, deltaHeight);
                
                if (i === 0 && j === 0) {
                    console.log("Color:", color);
                }

                this.FrameBuffer.setPixel(j, i, color);
            }
    
            if (i / window.innerHeight > previousProgress + 0.1) {
                console.log("Progress: ", Math.floor(i / window.innerHeight * 10) / 10);
                previousProgress = i / window.innerHeight;
            }
        }

        this.FrameBuffer.draw();
    }

    private samplePixel(viewportStart: Position, currentDelta: Vector3, deltaWidth: Vector3, deltaHeight: Vector3): Color {
        const viewportPoint: Position = viewportStart.add(currentDelta);
        const sampleColors: Color[] = [];

        for (let i: number = -1; i < 2; i++) {
            for (let j: number = -1; j < 2; j++) {
                const sample: Vector3 = deltaWidth.multiply(j / 3).add(deltaHeight.multiply(i / 3));
                
                const sampleViewportPoint: Position = viewportPoint.add(sample);

                const ray: Ray = new Ray(this.cameraPos, sampleViewportPoint.add(this.cameraPos.negate()).normalize());
                sampleColors.push(this.traceRay(ray));
            }
        }

        let sampleColorSum: Color = new Color(0, 0, 0);
        for (let i: number = 0; i < sampleColors.length; i++) {
            const sampleColor: Color = sampleColors[i];
            sampleColorSum = sampleColorSum.add(sampleColor);
        }
        
        const sampleColorAverage: Color = sampleColorSum.multiply(1 / sampleColors.length);

        return sampleColorAverage;
    }

    private traceRay(ray: Ray): Color {
        const color: Color = new Color();
        const hitInformation: HitInformation = this.entityManager.hit(ray, 0, Number.MAX_SAFE_INTEGER);

        if (hitInformation.getHit()) {
            color.fromVector3(hitInformation.getNormal().multiply(255));
        } else {
            const normalizedY: number = (ray.getDirection().getY() + 1) * 0.5;
            const blue: Color = new Color(0, 0, 255);
            const white: Color = new Color(255, 255, 255);
            const blend: Color = white.multiply(1 - normalizedY).add(blue.multiply(normalizedY));
            color.fromVector3(blend);
        }

        return color;
    }
}

export { Renderer };