import { Position } from "../Geometry/Position.js";
import { Ray } from "../Geometry/Ray.js";
import { HitInformation } from "../Geometry/HitInformation.js";
import { Direction } from "../Geometry/Direction.js";
import { Vector3 } from "../Generic/Vector3.js";
import { Entity } from "../Entity/Entity.js";
import { EntityType } from "./EntityType.js";

class Sphere extends Entity {
    private center: Position;
    private radius: number;

    constructor(center?: Position, radius?: number) {
        super(EntityType.Sphere);

        // RELEASE
        if (center !== undefined && radius !== undefined) {
            this.center = center;
            this.radius = radius;
            return;
        }

        this.center = new Vector3();
        this.radius = 0;
        
        // DEBUG
        // let filledParameters: boolean;
        // if (filledParameters = center !== undefined && radius !== undefined) {
        //     this.center = center;
        //     this.radius = radius;
        // }
        
        // if (center !== undefined && !filledParameters) {
        //     throw new Error("[Sphere]: Not all required parameters are filled.");
        // }
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

    public hit(ray: Ray, minimumTime: number, maximumTime: number): HitInformation {
        const rayDirection: Direction = ray.getDirection();
        // origin minus center
        const oMC: Position = ray.getOrigin().add(this.center.negate());

        const a: number = rayDirection.dot(rayDirection);
        const b: number = rayDirection.multiply(2).dot(oMC);
        const c: number = oMC.dot(oMC) - this.radius * this.radius;

        const discriminant: number = b * b - 4 * a * c;
        
        const times: number[] = [
            (-b - Math.sqrt(discriminant)) / (2 * a),
            (-b + Math.sqrt(discriminant)) / (2 * a)
        ];
        
        let foundValidTime: boolean = false;
        let lowestTime: number = Number.MAX_SAFE_INTEGER;

        const timesLength: number = times.length;
        for (let i: number = 0; i < timesLength; i++) {
            const time: number = times[i];
            if (time < minimumTime || time > maximumTime) {
                continue;
            }

            if (time < lowestTime) {
                lowestTime = time;
                foundValidTime = true;
            }
        }

        if (!foundValidTime) {
            return new HitInformation();
        }

        const position: Position = ray.at(lowestTime);
        const outwardNormal: Vector3 = position.add(this.center.negate()).normalize();
        const outwardFace: boolean = rayDirection.dot(outwardNormal) < 0;
        const normal: Vector3 = new Vector3();
        if (outwardFace) {
            normal.fromVector3(outwardNormal);
        } else {
            normal.fromVector3(outwardNormal.negate());
        }

        return new HitInformation(discriminant > 0, position, lowestTime, normal, outwardFace);
    }

    public static createFromRaw(other: any): Sphere {
        const rawCenter: any = other.center;
        const center: Vector3 = Vector3.createFromRaw(rawCenter);

        const radius: number = other.radius;

        return new Sphere(center, radius);
    }
}

export { Sphere };