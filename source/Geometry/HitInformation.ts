import { Vector3 } from "../Generic/Vector3.js";
import { Position } from "./Position.js";

class HitInformation {
    private hit: boolean;
    private position: Position;
    private time: number;
    private normal: Vector3;
    private outwardFace: boolean;

    constructor(hit?: boolean, position?: Position, time?: number, normal?: Vector3, outwardFace?: boolean) {
        this.hit = false;
        this.position = new Position();
        this.time = 0;
        this.normal = new Vector3();
        this.outwardFace = false;
        
        let filledParameters: boolean;
        if (filledParameters = hit !== undefined && position !== undefined && time !== undefined && normal !== undefined && outwardFace !== undefined) {
            this.hit = hit;
            this.position = position;
            this.time = time;
            this.normal = normal;
            this.outwardFace = outwardFace;
        }

        if (hit !== undefined && !filledParameters) {
            throw new Error("[HitInformation]: Not all required parameters are filled.");
        }
    }

    public fromValues(hit: boolean, position: Position, time: number, normal: Vector3, outwardFace: boolean) {
        this.hit = hit;
        this.position.fromVector3(position);
        this.time = time;
        this.normal.fromVector3(normal);
        this.outwardFace = outwardFace;
    }

    public fromHitInformation(other: HitInformation) {
        this.hit = other.getHit();
        this.position.fromVector3(other.getPosition());
        this.time = other.getTime();
        this.normal.fromVector3(other.getNormal());
        this.outwardFace = other.getOutwardFace();
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