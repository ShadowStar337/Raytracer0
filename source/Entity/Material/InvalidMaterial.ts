import { Material } from "./Material.js";
import { ScatterInformation } from "../ScatterInformation.js";
import { Ray } from "../../Geometry/Ray.js";
import { HitInformation } from "../HitInformation.js";
import { MaterialType } from "./MaterialType.js";

/**
 * An invalid material.
 */
class InvalidMaterial extends Material {
    /**
     * Constructs a new InvalidMaterial instance.
     */
    constructor() {
        super(MaterialType.Invalid);
    }

    /**
     * Returns an empty ScatterInformation instance.
     * @param ray Does nothing.
     * @param hitInformation Does nothing.
     * @returns An empty ScatterInformation instance.
     */
    public scatter(ray: Ray, hitInformation: HitInformation): ScatterInformation {
        return new ScatterInformation();
    };
}

export { InvalidMaterial };