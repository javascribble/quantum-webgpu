import { createTexture } from '../device/texture.js';

const { load } = quantum;

export const defaultTextureOptions = {
};

export const loadTextures = async (device, options) => {
    const textures = [];
    for (const option of options) {
        // const texture = createTexture(device, option.descriptor);
        // const image = await load(option.source);
        // textures.push(texture);
    }

    return textures;
};