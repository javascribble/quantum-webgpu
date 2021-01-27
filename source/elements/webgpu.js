import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';
import html from '../templates/webgpu.js';

const { Component, template, define } = quantum;

export class WebGPU extends Component {
    constructor() {
        super();

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

    static template = template(html);

    static attributes = [];

    animate(deltaTime) {
        resizeCanvas(this.canvas);
        for (const { renderable } of this.entities) {
        }
    }
}

define('quantum-webgpu', WebGPU);

// import { enableRenderableSystem } from './systems/renderable';
// import { enableRendererSystem } from './systems/renderer';
// import { plugins } from '../../engine/main';

// plugins.video = async (options) => {
//     const adapter = await navigator.gpu.requestAdapter();
//     const device = await adapter.requestDevice();

//     enableRenderableSystem(options, device);
//     await enableRendererSystem(options, device);
// }; 