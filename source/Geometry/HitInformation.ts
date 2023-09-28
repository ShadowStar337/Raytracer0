import { Vector3 } from "../Generic/Vector3.js";
import { Position } from "./Position.js";

class HitInformation {
    private hit: boolean;
    private position: Position;
    private time: number;
    private normal: Vector3;
    private outwardFace: boolean;

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

    public fromValues(hit: boolean, position: Position, time: number, normal: Vector3, outwardFace: boolean) {
        this.hit = hit;
        this.position.fromVector3(position);
        this.time = time;
        this.normal.fromVector3(normal);
        this.outwardFace = outwardFace;
    }

    public fromHitInformation(other: HitInformation) {
        this.hit = other.hit;
        this.position.fromVector3(other.position);
        this.time = other.time;
        this.normal.fromVector3(other.normal);
        this.outwardFace = other.outwardFace;
    }

    public getHit(): boolean {
        return this.hit;
    }
    public getPosition(): Position {
        return this.position;
    }
    public getTime(): number {
        return this.time;
    }
    public getNormal(): Vector3 {
        return this.normal;
    }
    public getOutwardFace(): boolean {
        return this.outwardFace;
    }
};

export { HitInformation };