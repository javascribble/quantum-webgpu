export class Vector3 extends Float32Array {
    constructor(array = [0, 0, 0], offset = 0, length = 3) {
        super(array, offset, length);
    }

    get x() { return this[0]; }
    set x(value) { this[0] = value; }

    get y() { return this[1]; }
    set y(value) { this[1] = value; }

    get z() { return this[2]; }
    set z(value) { this[2] = value; }

    static distance = (a, b) => Math.sqrt(a.reduce((d, v, i) => d + Math.pow(v - b[i], 2)));

    normalize() {
        const magnitude = 1 / Math.hypot(...this);
        for (let i = 0; i < this.length; i++) this[i] *= magnitude;
    }
}