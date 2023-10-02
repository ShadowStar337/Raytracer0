import { Entity } from "./Entity/Entity.js";
import { HitInformation } from "./HitInformation.js";
import { Ray } from "../Geometry/Ray.js";
import { Creator } from "../Utility/Creator.js";

/**
 * A collection of entities.
 */
class EntityManager {

    entities: Entity[];

    /**
     * Constructs a new EntityManager instance.
     */
    constructor() {
        this.entities = [];
    }

    /**
     * Adds an entity to this entity manager.
     * @param entity The entity to add to this entity manager.
     */
    public addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    /**
     * Returns the entities that this entity manager contains.
     * @returns The entities that this entity manager contains.
     */
    public getEntities(): Entity[] {
        return this.entities;
    }

    /**
     * Tests for the earliest intersection of a ray and an entity in this entity manager.
     * @param ray The ray to use for the ray intersection test.
     * @param minimumTime The minimum ray time to consider during the ray intersection test.
     * @param maximumTime The maximum ray time to consider during the ray intersection test.
     * @returns Information about the ray intersection.
     */
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

    /**
     * Constructs a new EntityManager instance from a raw object.
     * @param other The raw object.
     * @returns A new EntityManager instance.
     */
    public static createFromRaw(other: any): EntityManager {
        const entityManager: EntityManager = new EntityManager();
    
        const otherEntitiesLength: number = other.entities.length;
        for (let i: number = 0; i < otherEntitiesLength; i++) {
            const entity: Entity = Creator.createEntityFromRaw(other.entities[i]);
            entityManager.addEntity(entity);
        }
    
        return entityManager;
    }
}

export { EntityManager };