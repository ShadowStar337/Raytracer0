import { Paper } from "./Paper.js";

window.addEventListener("load", main);

function main() {
    const paper: Paper = new Paper();

    let previousProgress: number = 0;
    
    for (let i: number = 0; i < window.innerHeight; i++) {
        for (let j: number = 0; j < window.innerWidth; j++) {
            const r: number = j / (window.innerWidth - 1);
            const g: number = i / (window.innerHeight - 1);
            const b: number = 0;

            const ir: number = Math.floor(255 * r);
            const ig: number = Math.floor(255 * g);
            const ib: number = Math.floor(255 * b);

            paper.setPixel(j, i, ir, ig, ib, 255);
        }

        if (i / window.innerHeight > previousProgress + 0.1) {
            console.log(i / window.innerHeight);
            previousProgress = i / window.innerHeight;
        }
    }

    console.log(...paper.imageData.data.subarray(0, 100));
    console.log("Width of imageData:", paper.imageData);

    paper.draw();
}

