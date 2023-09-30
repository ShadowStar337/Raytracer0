/**
 * A collection of useful mathematical functions.
 */
class Mathematics {
    /**
     * Returns a random number between the inclusive minimum and the exclusive maximum.
     * @param minimum The inclusive minimum of the random number.
     * @param maximum The exclusive maximum of the random number.
     * @returns A random number between the inclusive minimum and the exclusive maximum.
     */
    static intervalRandom(minimum: number, maximum: number): number {
        return minimum + Math.random() * (maximum - minimum);
    }

    /**
     * Rounds down a value to the nearest multiple.
     * @param value The value to round down.
     * @param nearest The number that the multiple is of.
     * @returns The rounded-down value.
     */
    static roundDown(value: number, nearest: number): number {
        return Math.floor(value / nearest) * nearest;
    }

    /**
     * Rounds up a value to the nearest multiple.
     * @param value The value to round up.
     * @param nearest The number that the multiple is of.
     * @returns The rounded-up value.
     */
    static roundUp(value: number, nearest: number): number {
        return Math.ceil(value / nearest) * nearest;
    }

    /**
     * Rounds down a value to the nearest place value.
     * @param value The value to round down.
     * @param place The place value to round down to.
     * @returns The rounded-down value.
     */
    static roundDownToPlace(value: number, place: number): number {
        return Math.floor(value * place) / place;
    }

    /**
     * Rounds up a value to the nearest place value.
     * @param value The value to round up.
     * @param place The place value to round up to.
     * @returns The rounded-up value.
     */
    static roundUpToPlace(value: number, place: number): number {
        return Math.ceil(value * place) / place;
    }
}

export { Mathematics };