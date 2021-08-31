import { loadBuffers } from '../resources/buffers.js';
import { loadTextures } from '../resources/textures.js';
import { loadShaders } from '../resources/shaders.js';

const { WebGPU } = Quantum;

WebGPU.prototype.load = async function (options) {
    return {
        buffers: await loadBuffers(this.device, options.buffers),
        shaders: await loadShaders(this.device, options.shaders),
        textures: await loadTextures(this.device, options.textures)
    };
};

WebGPU.prototype.unload = function (resources) {
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
};