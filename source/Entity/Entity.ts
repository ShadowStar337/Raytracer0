import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityType } from "./EntityType.js";

abstract class Entity {
    type: EntityType;

    constructor(type: EntityType) {
        this.type = type;
    }

    public abstract hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation;
}

export { Entity };