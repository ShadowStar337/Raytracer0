import { ScatterInformation } from "../ScatterInformation.js";
import { Ray } from "../../Geometry/Ray.js";
import { HitInformation } from "../HitInformation.js";
import { MaterialType } from "./MaterialType.js";

/** A material. Materials define how a ray is scattered. */
abstract class Material {

    protected type: MaterialType;

    /**
     * 
     * Constructs a new Material instance.
     * @param type The type of this material.
     */
    constructor(type: MaterialType) {
        this.type = type;
    }

    /**
     * Calculates how a new ray is scattered when an existing ray hits an entity. 
     * @param ray The existing ray.
     * @param hitInformation The hit information of the existing ray and the entity.
     */
    public abstract scatter(ray: Ray, hitInformation: HitInformation): ScatterInformation;
}

export { Material };