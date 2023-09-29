class Mathematics {
    static intervalRandom(minimum: number, maximum: number): number {
        return minimum + Math.random() * (maximum - minimum);
    }

    static roundDown(value: number, nearest: number): number {
        return Math.floor(value / nearest) * nearest;
    }

    static roundUp(value: number, nearest: number): number {
        return Math.ceil(value / nearest) * nearest;
    }

    static roundDownToPlace(value: number, place: number): number {
        return Math.floor(value * place) / place;
    }

    static roundUpToPlace(value: number, place: number): number {
        return Math.ceil(value * place) / place;
    }
}

export { Mathematics };