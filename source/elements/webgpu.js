import { canvasOptions } from '../constants/canvas.js';

export class WebGPU extends Quantum.Canvas {
    getContext() {
        return super.getContext('webgpu', canvasOptions);
    }

    async initialize() {
        if (this.device) {
            this.context.unconfigure();
            this.device.destroy();
        }

        this.adapter = await navigator.gpu.requestAdapter();
        this.device = await this.adapter.requestDevice();

        this.format = this.context.getPreferredFormat(this.adapter);
        this.context.configure(this);
    }

    resize(size, event) {
        super.resize(size, event);

        // TODO: Reinitialize destroyed textures.
        //this.context.configure(this);
    }
}

WebGPU.define('quantum-webgpu');