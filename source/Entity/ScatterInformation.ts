import { Color } from "../Generic/Color.js";
import { Ray } from "../Geometry/Ray.js";
import { Vector3 } from "../Generic/Vector3.js";

/** Information about a scatter from a material. */
class ScatterInformation {
    
    private scattered: boolean;
    private attenuation: Color;
    private scatteredRay: Ray;

    /**
     * Constructs a new ScatterInformation
     * @param attenuation The attenuation of the scatter.
     * @param scatteredRay The ray scattered as a result of the scatter.
     */
    constructor(scattered?: boolean | ScatterInformation, attenuation?: Color, scatteredRay?: Ray) {
        if (scattered instanceof ScatterInformation && attenuation === undefined && scatteredRay === undefined) {
            this.scattered = scattered.scattered;
            this.attenuation = scattered.attenuation;
            this.scatteredRay = scattered.scatteredRay;
            return;
        }

        if (typeof scattered === "boolean" && attenuation !== undefined && scatteredRay !== undefined) {
            this.scattered = scattered;
            this.attenuation = attenuation;
            this.scatteredRay = scatteredRay;
            return;
        }

        this.scattered = false;
        this.attenuation = new Vector3();
        this.scatteredRay = new Ray();
    }

    /**
     * Returns whether a scatter actually exists.
     * @returns Whether a scatter actually exists.
     */
    public getScattered(): boolean {
        return this.scattered;
    }

    /**
     * Returns the attentuation of the scatter.
     * @returns The attentuation of the scatter.
     */
    public getAttentuation(): Color {
        return this.attenuation;
    }

    /**
     * Returns the ray scattered as a result of the scatter.
     * @returns The ray scattered as a result of the scatter.
     */
    public getScatteredRay(): Ray {
        return this.scatteredRay;
    }
}

export { ScatterInformation };