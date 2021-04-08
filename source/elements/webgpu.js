import { loadImage } from '../network/loader.js';

export class WebGPU extends Quantum.Canvas {
    getContext(options) {
        const adapter = await navigator.gpu.requestAdapter();
        const device = await adapter.requestDevice();

        //await enableRendererSystem(options, device);

        return super.getContext('gpupresent', options);
    }

    clear() {
    }

    resize() {
        super.resize();
    }
}