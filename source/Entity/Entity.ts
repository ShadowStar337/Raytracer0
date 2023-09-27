import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { EntityType } from "./EntityType.js";

class Entity {
    type: EntityType;

    constructor(type: EntityType) {
        this.type = type;
    }

    public hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation {
        return new HitInformation();
    }
}

export { Entity };