import { loadBuffers } from '../resources/buffers.js';
import { loadTextures } from '../resources/textures.js';
import { loadShaders } from '../resources/shaders.js';

const { WebGPU } = Quantum;

WebGPU.prototype.load = async function (data) {
    return {
        buffers: await loadBuffers(this.device, data.buffers),
        shaders: await loadShaders(this.device, data.shaders),
        textures: await loadTextures(this.device, data.textures)
    };
};

WebGPU.prototype.unload = function (state) {
    const { buffers, shaders, textures } = state;

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