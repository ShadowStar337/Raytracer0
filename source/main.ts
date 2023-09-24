import { Color } from "./Color.js";
import { Paper } from "./Paper.js";
import { Ray } from "./Ray.js";
import { Position } from "./Kinematics.js";
import { Vector3 } from "./Vector3.js";
import { Direction } from "./Direction.js";
 
window.addEventListener("load", main);

function main() {
    const paper: Paper = new Paper();

    const canvasWidth: number = paper.getCanvasWidth();
    const canvasHeight: number = paper.getCanvasHeight();
    const aspectRatio: number = paper.getAspectRatio();

    const viewportHeight: number = 2;
    const viewportWidth: number = aspectRatio * viewportHeight;

    const viewportStartX: number = -viewportWidth / 2;
    const viewportStartY: number = -viewportHeight / 2;
    const viewportStartZ: number = -1;

    const viewportStart: Position = new Position();
    viewportStart.fromValues(viewportStartX, viewportStartY, viewportStartZ);

    const deltaWidth: Vector3 = new Vector3();
    deltaWidth.fromValues(viewportWidth / canvasWidth, 0, 0);
    const deltaHeight: Vector3 = new Vector3();
    deltaHeight.fromValues(0, viewportHeight / canvasHeight, 0);

    const cameraPos: Position = new Position();
    cameraPos.fromValues(0, 0, 0);

    let previousProgress: number = 0;
    
    for (let i: number = 0; i < canvasHeight; i++) {
        for (let j: number = 0; j < canvasWidth; j++) {
            const viewportPoint: Position = viewportStart.add(deltaHeight.multiply(i)).add(deltaWidth.multiply(j));

            const ray: Ray = new Ray();
            ray.fromValues(cameraPos, viewportPoint.add(cameraPos.negate()).normalize());

            const color: Color = new Color();
            
            const normalizedY: number = (ray.getDirection().getY() + 1) * 0.5;

            const blue: Color = new Color();
            blue.fromValues(0, 0, 255);
            const white: Color = new Color();
            white.fromValues(255, 255, 255);
            const blend: Color = blue.multiply(1 - normalizedY).add(white.multiply(normalizedY));

            color.fromVector3(blend);

            paper.setPixel(j, i, color);
        }

        if (i / window.innerHeight > previousProgress + 0.1) {
            console.log(i / window.innerHeight);
            previousProgress = i / window.innerHeight;
        }
    }

    paper.draw();
}

