import { canvasOptions } from '../constants/canvas.js';
import { requestAdapter } from '../utilities/navigator.js';
import '../plugins/loaders.js';

export class WebGPU extends Quantum.Canvas {
    getContext() {
        return super.getContext('webgpu', canvasOptions);
    }

    async initialize() {
        const adapter = await requestAdapter();
        this.device = await adapter.requestDevice();
        this.format = this.context.getPreferredFormat(adapter);
        this.context.configure(this);
    }

    resize(size, event) {
        super.resize(size, event);

        // this.context.unconfigure();
        // this.context.configure(this);
    }
}

WebGPU.define('quantum-webgpu');