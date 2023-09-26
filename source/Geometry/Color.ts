import { Vector3 } from "../Generic/Vector3.js";

class Color extends Vector3 {
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
        return new Color(super.clone());
    }
    public negate(): Color {
        return new Color(super.negate());
    }
    public reciprocate(): Color {
        return new Color(super.reciprocate());
    }
    public add(other: Vector3 | number): Color {
        return new Color(super.add(other));
    }
    public multiply(other: Vector3 | number): Color {
        return new Color(super.multiply(other));
    }
    public exponentiate(other: Vector3 | number): Color {
        return new Color(super.exponentiate(other));
    }
    public normalize(): Color {
        return new Color(super.normalize());
    }
}

export { Color };