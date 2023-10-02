import { EntityType } from "../Entity/Entity/EntityType.js";
import { Entity } from "../Entity/Entity/Entity.js";
import { Sphere } from "../Entity/Entity/Sphere.js";
import { InvalidEntity } from "../Entity/Entity/InvalidEntity.js";
import { Material } from "../Entity/Material/Material.js";
import { InvalidMaterial } from "../Entity/Material/InvalidMaterial.js";
import { MaterialType } from "../Entity/Material/MaterialType.js";
import { Diffuse } from "../Entity/Material/Diffuse.js";

/** A collection of factory functions that create instances from raw objects. */
class Creator {
    /**
     * Determines the entity type to create a new Entity instance from a raw Entity object.
     * @param other The raw object.
     * @returns The new Entity instance with the determined entity type.
     */
    public static createEntityFromRaw(other: any): Entity {
        switch (other.type) {
            case EntityType.Sphere:
                return Sphere.createFromRaw(other);
        }
    
        return new InvalidEntity();
    }

    /**
     * Determines the material type to create a new Material instance from a raw Material object.
     * @param other The raw object.
     * @returns The new Material instance with the determined material type.
     */
    public static createMaterialFromRaw(other: any): Material {
        switch (other.type) {
            case MaterialType.Diffuse: 
                return Diffuse.createFromRaw(other);
        }
        return new InvalidMaterial();
    }
}

export { Creator };