import { Entity } from "./Entity.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { Ray } from "../Geometry/Ray.js";

class EntityManager {

    entities: Entity[];

    constructor() {
        this.entities = [];
    }

    public addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    public hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation {
        const hitInformation: HitInformation = new HitInformation();
        let lowestTime: number = Number.MAX_SAFE_INTEGER;

        const entitiesLength: number = this.entities.length;
        for (let i: number = 0; i < entitiesLength; i++) {
            const entity: Entity = this.entities[i];
            const entityHitInformation: HitInformation = entity.hit(ray, minimumTime, maximumTime);
            if (entityHitInformation.getHit() && entityHitInformation.getTime() < lowestTime) {
                lowestTime = entityHitInformation.getTime();
                hitInformation.fromHitInformation(entityHitInformation);
            }
        }

        return hitInformation;
    }
}

export { EntityManager };