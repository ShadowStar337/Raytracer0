import { Paper } from "./Paper.js";
import { Position } from "./Kinematics.js";
import { Vector3 } from "./Vector3.js";
import { Ray } from "./Ray.js";
import { Color } from "./Color.js";
import { Sphere } from "./Entity.js";
import { Direction } from "./Direction.js";
import { HitInformation } from "./HitInformation.js";

class Renderer {
    paper: Paper;

    canvasHeight: number;
    canvasWidth: number;
    aspectRatio: number;

    viewportHeight: number;
    viewportWidth: number;

    constructor() {
        this.paper = new Paper();

        this.canvasHeight = this.paper.getCanvasHeight();
        this.canvasWidth = this.paper.getCanvasWidth();
        this.aspectRatio = this.paper.getAspectRatio();

        this.viewportHeight = 2;
        this.viewportWidth = this.aspectRatio * this.viewportHeight;
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
                const hitInformation: HitInformation = sphere.hit(ray)

                if (hitInformation.hit) {
                    const normal: Vector3 = ray.at(hitInformation.time).add(sphere.getCenter().negate()).normalize();
                    color.fromVector3(normal.multiply(255));
                } else {
                    const normalizedY: number = (ray.getDirection().getY() + 1) * 0.5;
                    const blue: Color = new Color(0, 0, 255);
                    const white: Color = new Color(255, 255, 255);
                    const blend: Color = white.multiply(1 - normalizedY).add(blue.multiply(normalizedY));
                    color.fromVector3(blend);
                }
    
                this.paper.setPixel(j, i, color);
            }
    
            if (i / window.innerHeight > previousProgress + 0.1) {
                console.log("Progress: ", Math.floor(i / window.innerHeight * 10) / 10);
                previousProgress = i / window.innerHeight;
            }
        }

        this.paper.draw();
    }

    
}

export { Renderer };