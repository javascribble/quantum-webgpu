import { loadBuffers } from '../resources/buffers.js';
import { loadTextures } from '../resources/textures.js';
import { loadShaders } from '../resources/shaders.js';

export async function load(options) {
    return {
        buffers: await loadBuffers(this, options.buffers),
        shaders: await loadShaders(this, options.shaders),
        textures: await loadTextures(this, options.textures)
    };
}

export function unload(resources) {
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