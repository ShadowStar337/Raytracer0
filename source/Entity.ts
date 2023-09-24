import { Position } from "./Kinematics.js";
import { Ray } from "./Ray.js";
import { HitInformation } from "./HitInformation.js";
import { Direction } from "./Direction.js";

abstract class Entity {
    public abstract hit(ray: Ray): HitInformation;
}

class Sphere extends Entity {
    private center: Position;
    private radius: number;

    constructor(center?: Position, radius?: number) {
        super();

        this.center = new Position();
        this.radius = 0;

        if (center !== undefined && radius !== undefined) {
            this.center = center;
            this.radius = radius;
        }
    }

    public fromValues(center: Position, radius: number): void {
        this.center = center;
        this.radius = radius;
    }

    public getCenter(): Position {
        return this.center;
    }

    public getRadius(): number {
        return this.radius;
    }

    public hit(ray: Ray): HitInformation {
        const rayDirection: Direction = ray.getDirection();
        // origin minus center
        const oMC: Position = ray.getOrigin().add(this.center.negate());

        const a: number = rayDirection.dot(rayDirection);
        const b: number = rayDirection.multiply(2).dot(oMC);
        const c: number = oMC.dot(oMC) - this.radius * this.radius;

        const discriminant: number = b * b - 4 * a * c;
        const time: number = (-b - Math.sqrt(discriminant)) / (2 * a);

        return new HitInformation(discriminant > 0, time);
    }
}

export { Sphere };