import { resize } from '../context/resize.js';
import { load, unload } from '../context/resources.js';
import { render } from '../renderer/render.js';
import webgpu from '../templates/webgpu.js';

const { resizeObserver } = quantum;

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

export class WebGPU extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');
    context = this.#canvas.getContext('webgpu');
    scale = devicePixelRatio;

    constructor() {
        super();

        this.observers.add(resizeObserver);

        this.adapter = adapter;
        this.device = device;
    }

    load = load;
    unload = unload;
    resize = resize;
    render = render;
}

WebGPU.define('quantum-webgpu', webgpu);