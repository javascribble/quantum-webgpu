import { canvasOptions } from '../constants/canvas.js';

export class WebGPU extends Quantum.Canvas {
    getContext() {
        return super.getContext('webgpu', canvasOptions);
    }

    async initialize() {
        this.adapter = await navigator.gpu.requestAdapter();
        this.format = this.context.getPreferredFormat(this.adapter);
        this.device = await this.adapter.requestDevice();
        this.context.configure(this);
    }

    resize(size, event) {
        super.resize(size, event);

        this.context.configure(this);
    }
}

WebGPU.define('quantum-webgpu');