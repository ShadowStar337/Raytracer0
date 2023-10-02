import { Material } from "./Material.js";
import { Color } from "../../Generic/Color.js";
import { MaterialType } from "./MaterialType.js";
import { Ray } from "../../Geometry/Ray.js";
import { HitInformation } from "../HitInformation.js";
import { ScatterInformation } from "../ScatterInformation.js";
import { Vector3 } from "../../Generic/Vector3.js";

/** A diffuse material that scatters rays diffusely. */
class Diffuse extends Material {
    private color: Color;

    /**
     * Constructs a new Diffuse instance.
     * @param color The color of this diffuse material, such that each component ranges from inclusive 0 to inclusive 1.
     * @returns A new Diffuse instance.
     */
    constructor(color: Color) {
        super(MaterialType.Diffuse);

        this.color = color;
    }

    /**
     * Returns the color of this diffuse material.
     * @returns The color of this diffuse material.
     */
    public getColor(): Color {
        return this.color;
    }
    
    /**
     * Calculates how a new ray is scattered when an existing ray hits an entity. 
     * @param ray The existing ray.
     * @param hitInformation The hit information of the existing ray and the entity.
     */
    public scatter(ray: Ray, hitInformation: HitInformation): ScatterInformation {
        const randomVector: Vector3 = new Vector3();
        randomVector.fromUnitRandom(-1, 1);
        
        // Note: This code will cause issues if randomVector is exactly opposite the surface normal

        const surfaceNormal: Vector3 = hitInformation.getNormal();
        const surfaceVector: Vector3 = surfaceNormal.add(randomVector);

        return new ScatterInformation(true, this.color, new Ray(hitInformation.getPosition(), surfaceVector));
    }

    /**
     * Constructs a new Diffuse instance from a raw Diffuse object.
     * @param other The raw Diffuse object.
     * @returns A new Diffuse instance.
     */
    public static createFromRaw(other: any): Diffuse {
        const rawColor: any = other.color;
        const color: Color = Vector3.createFromRaw(rawColor);

        return new Diffuse(color);
    }
}

export { Diffuse };