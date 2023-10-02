import { Entity } from "./Entity.js";
import { EntityType } from "./EntityType.js";
import { Ray } from "../../Geometry/Ray.js";
import { HitInformation } from "../HitInformation.js";
import { InvalidMaterial } from "../Material/InvalidMaterial.js";

/** An invalid or uninitialized object in a scene. */
class InvalidEntity extends Entity {
    /**
     * Constructs a new InvalidEntity instance.
     */
    constructor() {
        super(EntityType.Invalid, new InvalidMaterial());
    }

    /**
     * Returns an empty HitInformation instance.
     * @param ray Does nothing.
     * @param minimumTime Does nothing.
     * @param maximumTime Does nothing.
     * @returns An empty HitInformation instance.
     */
    public hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation {
        return new HitInformation();
    }
}

export { InvalidEntity };