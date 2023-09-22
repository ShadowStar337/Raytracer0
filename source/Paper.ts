class Paper {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.insertBefore(this.canvas, null);

        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx == null) {
            throw new Error("[main]: nullCtx is null.");
        }

        this.ctx = nullCtx;

        this.imageData = this.ctx.createImageData(window.innerWidth, window.innerHeight);
    }

    getPixel(x: number, y: number) {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;
        this.imageData.data[pixelIndex]
    }

    setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;
        this.imageData.data[pixelIndex + 0] = r;
        this.imageData.data[pixelIndex + 1] = g;
        this.imageData.data[pixelIndex + 2] = b;
        this.imageData.data[pixelIndex + 3] = a;
    }

    draw() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}

export { Paper };