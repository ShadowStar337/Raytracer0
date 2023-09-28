import { Color } from "../Geometry/Color.js";
import { RenderConfig } from "../RenderConfig.js";

class FrameBuffer {

    private container: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private progressElement: HTMLSpanElement;
    private timeTakenElement: HTMLSpanElement;
    private ctx: CanvasRenderingContext2D;
    private imageData: ImageData;

    constructor() {
        this.container = document.createElement("div");
        this.container.className = "containerDiv";
        document.body.insertBefore(this.container, null);

        this.progressElement = document.createElement("span");
        this.progressElement.className = "informationSpan";
        this.container.insertBefore(this.progressElement, null);

        this.timeTakenElement = document.createElement("span");
        this.timeTakenElement.className = "informationSpan";
        this.container.insertBefore(this.timeTakenElement, null);

        this.canvas = document.createElement("canvas");
        this.canvas.width = RenderConfig.canvasWidth;
        this.canvas.height = RenderConfig.canvasHeight;
        this.container.insertBefore(this.canvas, null);

        

        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx === null) {
            throw new Error("[main]: nullCtx is null.");
        }

        this.ctx = nullCtx;

        this.imageData = this.ctx.createImageData(RenderConfig.canvasWidth, RenderConfig.canvasHeight);
    }

    public getPixel(x: number, y: number): Color {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;

        const red: number = this.imageData.data[pixelIndex + 0];
        const green: number = this.imageData.data[pixelIndex + 1];
        const blue: number = this.imageData.data[pixelIndex + 2];
        
        return new Color(red, green, blue);
    }

    public setPixel(x: number, y: number, color: Color): void {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;
        this.imageData.data[pixelIndex + 0] = color.getRed();
        this.imageData.data[pixelIndex + 1] = color.getGreen();
        this.imageData.data[pixelIndex + 2] = color.getBlue();
        this.imageData.data[pixelIndex + 3] = 255;
    }

    public updateProgress(progress: number): void {
        this.progressElement.innerHTML = "Progress: " + Math.floor(progress * 10000) / 10000;
    }

    public updateTimeTaken(timeTaken: number): void {
        this.timeTakenElement.innerHTML = "Time since start in milliseconds: " + timeTaken;
    }

    public draw(): void {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}

export { FrameBuffer };