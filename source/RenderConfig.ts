class RenderConfig {
    // static canvasWidth: number = 1920;
    // static canvasHeight: number = 1080;
    static canvasWidth: number = 640;
    static canvasHeight: number = 360;
    static maxBouncesPerRay: number = 50; // Maximum number of bounces a ray can make
    static samplesPerPixel: number = 10;

    static viewportHeight: number = 2;
    static viewportWidth: number = RenderConfig.canvasWidth / RenderConfig.canvasHeight * RenderConfig.viewportHeight;

    static threads: number = 3;
}

export { RenderConfig };