import { Quantum, define } from '@javascribble/quantum';
import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';
import { webgpu } from '../templates/webgpu.js';

export class WebGPU extends Quantum {
    constructor() {
        super(webgpu);

        // TODO: Unfinished.
        this.canvas = createCanvas();
        this.context = getContext(this.canvas);
        this.appendChild(this.canvas);

        this.entities = new Set();
        this.add = (entity) => this.entities.add(entity);
        this.delete = (entity) => this.entities.delete(entity);
        this.validate = (entity) => entity.renderable;

        const engine = this.parentElement;
        engine.loaders.png = loadImage;
        engine.loaders.obj = engine.loadText;
        engine.loaders.mtl = engine.loadText;
        engine.loaders.spv = async (url) => new Uint32Array(await engine.loadArrayBuffer(url));
        engine.animations.add(this);
        engine.systems.add(this);
    }

    animate(deltaTime) {
        resizeCanvas(this.canvas);
        for (const { renderable } of this.entities) {
        }
    }
}

define(WebGPU);