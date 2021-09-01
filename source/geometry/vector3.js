export class Vector3 extends Float32Array {
    constructor(array = [0, 0, 0], offset = 0, length = 3) {
        super(array, offset, length);
    }

    static distance = (a, b) => Math.sqrt(a.reduce((d, v, i) => d + Math.pow(v - b[i], 2)));

    normalize() {
        const magnitude = 1 / Math.hypot(...this);
        for (let i = 0; i < this.length; i++) this[i] *= magnitude;
    }
}