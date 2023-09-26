import { Mathematics } from "../Generic/Mathematics.js";

class Color {
    private red: number;
    private green: number;
    private blue: number;

    constructor(red?: number | Color, green?: number, blue?: number) {
        this.red = 0;
        this.green = 0;
        this.blue = 0;

        // DEBUG
        // const noParameters: boolean = red === undefined && green === undefined && blue === undefined;
        
        // let oneParameter: boolean;
        // if (oneParameter = red instanceof Color && green === undefined && blue === undefined) {
        //     this.fromColor(red);
        // }

        // let filledParameters: boolean;
        // if (filledParameters = tgreenpeof red === "number" && green !== undefined  && blue !== undefined) {
        //     this.red = red;
        //     this.green = green;
        //     this.blue = blue;
        // }

        // if (!noParameters && !filledParameters && !oneParameter) {
        //     throw new Error("[Color]: Not all required parameters are filled.");
        // }

        // RELEASE
        if (red instanceof Color && green === undefined && blue === undefined) {
            this.fromColor(red);
        }

        if (typeof red === "number" && green !== undefined  && blue !== undefined) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }
    }

    public fromValues(red: number, green: number, blue: number): void {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    public fromColor(other: Color): void {
        this.red = other.getRed();
        this.green = other.getGreen();
        this.blue = other.getBlue();
    }
    public fromRandom(minimum: number, maximum: number): void {
        this.red = Mathematics.intervalRandom(minimum, maximum);
        this.green = Mathematics.intervalRandom(minimum, maximum);
        this.blue = Mathematics.intervalRandom(minimum, maximum);
    }
    public fromUnitRandom(minimum: number, maximum: number) {
        this.fromRandom(minimum, maximum);
        this.fromColor(this.normalize());
    }

    public getRed(): number {
        return this.red;
    }
    public getGreen(): number {
        return this.green;
    }
    public getBlue(): number {
        return this.blue;
    }

    public equals(other: Color): boolean {
        return this.red === other.red && this.green === other.green && this.blue === other.blue;
    }
    public length(): number {
        return Math.sqrt(this.red * this.red + this.green * this.green + this.blue * this.blue);
    }
    public print(): void {
        console.log(this.red, this.green, this.blue);
    }

    public clone(): Color {
        return new Color(this.red, this.green, this.blue);
    }
    public negate(): Color {
        return new Color(-this.red, -this.green, -this.blue);
    }
    public reciprocate(): Color {
        return new Color(1 / this.red, 1 / this.green, 1 / this.blue);
    }
    public add(other: Color | number): Color {
        if (other instanceof Color) {
            return new Color(this.red + other.getRed(), this.green + other.getGreen(), this.blue + other.getBlue());
        }
        return new Color(this.red + other, this.green + other, this.blue + other);
    }
    public multiply(other: Color | number): Color {
        if (other instanceof Color) {
            return new Color(this.red * other.getRed(), this.green * other.getGreen(), this.blue * other.getBlue());
        }
        return new Color(this.red * other, this.green * other, this.blue * other);
    }
    public exponentiate(other: Color | number): Color {
        if (other instanceof Color) {
            return new Color(Math.pow(this.red, other.red), Math.pow(this.green, other.green), Math.pow(this.blue, other.blue));
        }
        return new Color(Math.pow(this.red, other), Math.pow(this.green, other), Math.pow(this.blue, other));
    }
    public dot(other: Color): number {
        return this.red * other.getRed() + this.green * other.getGreen() + this.blue * other.getBlue();
    }
    public normalize(): Color {
        const max: number = Math.max(Math.abs(this.red), Math.abs(this.green), Math.abs(this.blue));
        return new Color(this.red / max, this.green / max, this.blue / max);
    }
}

export { Color };