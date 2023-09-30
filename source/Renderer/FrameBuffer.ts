import { Color } from "../Generic/Color.js";
import { RenderConfig } from "../RenderConfig.js";
import { Mathematics } from "../Generic/Mathematics.js";
import { Vector3 } from "../Generic/Vector3.js";

/** A display. */
class FrameBuffer {

    private container: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private progressElement: HTMLSpanElement;
    private totalTimeElement: HTMLSpanElement;
    private ctx: CanvasRenderingContext2D;
    private imageData: ImageData;

    /**
     * Constructs a new FrameBuffer instance.
     */
    constructor() {
        this.container = document.createElement("div");
        this.progressElement = document.createElement("span");
        this.totalTimeElement = document.createElement("span");
        this.canvas = document.createElement("canvas");

        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx === null) {
            throw new Error("[FrameBuffer]: nullCtx is null.");
        }
        this.ctx = nullCtx;

        this.imageData = this.ctx.createImageData(RenderConfig.canvasWidth, RenderConfig.canvasHeight);
    }

    /**
     * Initializes this display.
     */
    public init(): void {
        this.container.className = "containerDiv";
        document.body.insertBefore(this.container, null);

        this.progressElement.className = "informationSpan";
        this.container.insertBefore(this.progressElement, null);

        this.totalTimeElement.className = "informationSpan";
        this.container.insertBefore(this.totalTimeElement, null);

        this.canvas.width = RenderConfig.canvasWidth;
        this.canvas.height = RenderConfig.canvasHeight;
        this.container.insertBefore(this.canvas, null);
    }

    /**
     * Returns a specified pixel color of the canvas.
     * @param x The x-coordinate of the pixel.
     * @param y The y-coordinate of the pixel.
     * @returns The specified pixel color.
     */
    public getPixel(x: number, y: number): Color {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;

        const red: number = this.imageData.data[pixelIndex + 0];
        const green: number = this.imageData.data[pixelIndex + 1];
        const blue: number = this.imageData.data[pixelIndex + 2];
        
        return new Vector3(red, green, blue);
    }

    /**
     * Sets a pixel color of the canvas.
     * @param x The x-coordinate of the pixel.
     * @param y The y-coordinate of the pixel.
     * @param color The pixel color to set.
     */
    public setPixel(x: number, y: number, color: Color): void {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;
        this.imageData.data[pixelIndex + 0] = color.getX();
        this.imageData.data[pixelIndex + 1] = color.getY();
        this.imageData.data[pixelIndex + 2] = color.getZ();
        this.imageData.data[pixelIndex + 3] = 255;
    }

    /**
     * Updates the progress display.
     * @param progress The progress of a renderer between inclusive 0 and inclusive 1.
     */
    public updateProgress(progress: number): void {
        this.progressElement.innerHTML = "Progress: " + Mathematics.roundDownToPlace(progress, 100000);
    }

    /**
     * Updates the total time display.
     * @param totalTime The total time of a renderer in milliseconds.
     */
    public updateTimeTaken(totalTime: number): void {
        this.totalTimeElement.innerHTML = "Time since start in milliseconds: " + totalTime;
    }

    /**
     * Updates the canvas with the current image data.
     */
    public draw(): void {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}

export { FrameBuffer };