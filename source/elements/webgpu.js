import { canvasOptions } from '../constants/canvas.js';
import { requestAdapter } from '../utilities/navigator.js';
import { generateCommands } from '../renderer/commands.js';
import { loadBuffers } from '../resources/buffers.js';
import { loadTextures } from '../resources/textures.js';
import { loadShaders } from '../resources/shaders.js';
import webgpu from '../templates/webgpu.js';
import '../plugins/loaders.js';

export class WebGPU extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');
    context = this.#canvas.getContext('webgpu', canvasOptions);
    scale = devicePixelRatio;

    get size() {
        const { clientWidth, clientHeight } = this.#canvas;
        return { width: clientWidth * this.scale, height: clientHeight * this.scale };
    }

    async initialize() {
        const adapter = await requestAdapter();
        this.device = await adapter.requestDevice();
        this.format = this.context.getPreferredFormat(adapter);
        this.context.configure(this);
    }

    render(state) {
        generateCommands(state, this);
    }

    resize() {
        // this.context.unconfigure();
        // this.context.configure(this);
    }

    async load(options) {
        return {
            buffers: await loadBuffers(this, options.buffers),
            shaders: await loadShaders(this, options.shaders),
            textures: await loadTextures(this, options.textures)
        };
    }

    unload(resources) {
        const { buffers, shaders, textures } = resources;

        for (const buffer of buffers) {
            //buffer.destroy();
        }

        for (const shader of shaders) {
            //shader.destroy();
        }

        for (const texture of textures) {
            //texture.destroy();
        }
    }
}

WebGPU.define('quantum-webgpu', webgpu);