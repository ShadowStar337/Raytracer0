import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";

abstract class Entity {
    public abstract hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation;
}

export { Entity };