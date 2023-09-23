import { Vector3 } from "./Vector3.js";

class Color extends Vector3 {
    constructor() {
        super();
    }

    public fromColor(other: Color): void {
        super.fromVector3(other);
    }

    public getRed(): number {
        return super.getX();
    }
    public getGreen(): number {
        return super.getY();
    }
    public getBlue(): number {
        return super.getZ();
    }

    public clone(): Color {
        return super.clone() as Color;
    }
    public negate(): Color {
        return super.negate() as Color;
    }
    public reciprocate(): Color {
        return super.reciprocate() as Color;
    }
    public add(other: Vector3 | number): Color {
        return super.add(other) as Color;
    }
    public multiply(other: Vector3 | number): Color {
        return super.multiply(other) as Color;
    }
}

export { Color };