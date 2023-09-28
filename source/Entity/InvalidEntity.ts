import { Entity } from "./Entity.js";
import { EntityType } from "./EntityType.js";
import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";

class InvalidEntity extends Entity {
    constructor() {
        super(EntityType.None);
    }

    public hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation {
        return new HitInformation();
    }
}

export { InvalidEntity };