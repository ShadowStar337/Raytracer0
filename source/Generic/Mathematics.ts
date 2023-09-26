class Mathematics {
    static intervalRandom(minimum: number, maximum: number) {
        return minimum + Math.random() * (maximum - minimum);
    }
}

export { Mathematics };