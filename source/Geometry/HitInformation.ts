import { Vector3 } from "../Generic/Vector3.js";
import { Position } from "./Position.js";

/** Information about an intersection of a ray and an entity. */
class HitInformation {
    private hit: boolean;
    private position: Position;
    private time: number;
    private normal: Vector3;
    private outwardFace: boolean;

    /**
     * Constructs a new HitInformation instance.
     * If no parameters are set, this hit information will be empty.
     * If one parameter is set, this hit information will take the values of the other hit information as its own values.
     * If all parameters are set, this hit information will take the parameters as its own values.
     * @param hit Either whether an hit actually exists, another hit information, or undefined.
     * @param position Either the position of the hit or undefined.
     * @param time Either the ray time when the hit occurs or undefined.
     * @param normal Either the surface normal of the entity of the hit or undefined.
     * @param outwardFace Either whether the ray struck an outward face of the entity or undefined.
     * @returns A new HitInformation instance.
     */
    constructor(hit?: boolean | HitInformation, position?: Position, time?: number, normal?: Vector3, outwardFace?: boolean) {
        // RELEASE
        if (hit instanceof HitInformation && position === undefined && time === undefined && normal === undefined && outwardFace === undefined) {
            this.hit = hit.hit;
            this.position = hit.position;
            this.time = hit.time;
            this.normal = hit.normal;
            this.outwardFace = hit.outwardFace;
            return;
        }

        if (typeof hit === "boolean" && position !== undefined && time !== undefined && normal !== undefined && outwardFace !== undefined) {
            this.hit = hit;
            this.position = position;
            this.time = time;
            this.normal = normal;
            this.outwardFace = outwardFace;
            return;
        }

        this.hit = false;
        this.position = new Vector3();
        this.time = 0;
        this.normal = new Vector3();
        this.outwardFace = false;

        

        // DEBUG
        // const noParameters: boolean = hit === undefined && position === undefined && time === undefined && normal === undefined && outwardFace === undefined;

        // let oneParameter: boolean;
        // if (oneParameter = hit instanceof HitInformation && position === undefined && time === undefined && normal === undefined && outwardFace === undefined) {
        //     this.fromHitInformation(hit);
        // }
        
        // let filledParameters: boolean;
        // if (filledParameters = typeof hit === "boolean" && position !== undefined && time !== undefined && normal !== undefined && outwardFace !== undefined) {
        //     this.hit = hit;
        //     this.position = position;
        //     this.time = time;
        //     this.normal = normal;
        //     this.outwardFace = outwardFace;
        // }

        // if (!noParameters && !oneParameter && !filledParameters) {
        //     throw new Error("[HitInformation]: Not all required parameters are filled.");
        // }
    }

    /**
     * Replaces the values of this hit information with the values of the parameters.
     * @param hit Whether an hit actually exists.
     * @param position The position of the hit.
     * @param time The ray time when the hit occurs.
     * @param normal The surface normal of the entity of the hit.
     * @param outwardFace Whether the ray struck an outward face of the entity.
     */
    public fromValues(hit: boolean, position: Position, time: number, normal: Vector3, outwardFace: boolean) {
        this.hit = hit;
        this.position.fromVector3(position);
        this.time = time;
        this.normal.fromVector3(normal);
        this.outwardFace = outwardFace;
    }

    /**
     * Replaces the values of this hit information with the values of another hit information.
     * @param other The other hit information.
     */
    public fromHitInformation(other: HitInformation) {
        this.hit = other.hit;
        this.position.fromVector3(other.position);
        this.time = other.time;
        this.normal.fromVector3(other.normal);
        this.outwardFace = other.outwardFace;
    }

    /**
     * Returns whether an hit actually exists.
     * @returns Whether an hit actually exists.
     */
    public getHit(): boolean {
        return this.hit;
    }

    /**
     * Returns the position of the hit.
     * @returns The position of the hit.
     */
    public getPosition(): Position {
        return this.position;
    }

    /**
     * Returns the ray time when the hit occurs.
     * @returns The ray time when the hit occurs.
     */
    public getTime(): number {
        return this.time;
    }

    /**
     * Returns the surface normal of the entity of the hit.
     * @returns The surface normal of the entity of the hit.
     */
    public getNormal(): Vector3 {
        return this.normal;
    }

    /**
     * Returns whether the ray struck an outward face of the entity.
     * @returns Whether the ray struck an outward face of the entity.
     */
    public getOutwardFace(): boolean {
        return this.outwardFace;
    }
};

export { HitInformation };