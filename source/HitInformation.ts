class HitInformation {
    hit: boolean;
    time: number;

    constructor(hit?: boolean, time?: number) {
        this.hit = false;
        this.time = 0;

        if (hit !== undefined && time !== undefined) {
            this.hit = hit;
            this.time = time;
        }
    }

    public fromValues(hit: boolean, time: number) {
        this.hit = hit;
        this.time = time;
    }
};

export { HitInformation };