class RenderConfig {
    static canvasWidth: number = 640; // The width of the canvas and the image.
    static canvasHeight: number = 360; // The height of the canvas and the image.
    static maxBouncesPerRay: number = 50; // Maximum number of bounces a ray can make.
    static samplesPerPixel: number = 100; // The number of samples per pixel. This value cannot be 0.

    static viewportHeight: number = 2; // The viewport height.
    static viewportWidth: number = RenderConfig.canvasWidth / RenderConfig.canvasHeight * RenderConfig.viewportHeight; // The viewport width.

    static threads: number = 3; // The number of workers to dispatch.
}

export { RenderConfig };