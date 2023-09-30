import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityType } from "./EntityType.js";

/**
 * A single object in a scene.
 */
abstract class Entity {
    type: EntityType;

    /**
     * Constructs a new Entity instance.
     * @param type The type of this entity.
     */
    constructor(type: EntityType) {
        this.type = type;
    }

    /**
     * Tests for the earliest intersection of a ray and this entity.
     * @param ray The ray to use for the ray intersection test.
     * @param minimumTime The minimum ray time to consider during the ray intersection test.
     * @param maximumTime The maximum ray time to consider during the ray intersection test.
     */
    public abstract hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation;
}

export { Entity };