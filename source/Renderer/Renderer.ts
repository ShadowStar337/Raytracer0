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

    constructor() {
        this.FrameBuffer = new FrameBuffer();
        this.entityManager = new EntityManager();

        this.canvasHeight = this.FrameBuffer.getCanvasHeight();
        this.canvasWidth = this.FrameBuffer.getCanvasWidth();
        this.aspectRatio = this.FrameBuffer.getAspectRatio();

        this.viewportHeight = 2;
        this.viewportWidth = this.aspectRatio * this.viewportHeight;
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
    
        const cameraPos: Position = new Position(0, 0, 0);

        const sphere: Sphere = new Sphere(new Position(0, 0, -4), 2);
    
        let previousProgress: number = 0;
        
        for (let i: number = 0; i < this.canvasHeight; i++) {
            for (let j: number = 0; j < this.canvasWidth; j++) {
                const viewportPoint: Position = viewportStart.add(deltaHeight.multiply(i)).add(deltaWidth.multiply(j));
    
                const ray: Ray = new Ray(cameraPos, viewportPoint.add(cameraPos.negate()).normalize());
    
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
    
                this.FrameBuffer.setPixel(j, i, color);
            }
    
            if (i / window.innerHeight > previousProgress + 0.1) {
                console.log("Progress: ", Math.floor(i / window.innerHeight * 10) / 10);
                previousProgress = i / window.innerHeight;
            }
        }

        this.FrameBuffer.draw();
    }

    
}

export { Renderer };