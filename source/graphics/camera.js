import { Transform } from '../geometry/transform.js';

export class Camera extends Transform {
    aspect = 1;
    size = 1;
    near = 0;
    far = 1;
}