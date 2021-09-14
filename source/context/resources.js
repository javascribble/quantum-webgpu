import { loadBuffers } from '../resources/buffers.js';
import { loadTextures } from '../resources/textures.js';
import { loadShaders } from '../resources/shaders.js';

export async function load(options) {
    const resources = {};

    if (options.buffers) {
        resources.buffers = await loadBuffers(this, options.buffers);
    }

    if (options.shaders) {
        resources.shaders = await loadShaders(this, options.shaders);
    }

    if (options.textures) {
        resources.textures = await loadTextures(this, options.textures);
    }

    return resources;
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