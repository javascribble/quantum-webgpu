import { createImageTexture } from '../device/texture.js';

const { load } = quantum;

export const defaultTextureOptions = {
};

export const loadTextures = async (device, options) => {
    const textures = [];
    for (const option of options) {
        const image = await load(option.source);
        const source = await createImageBitmap(image);
        const texture = createImageTexture(device, { size: [source.width, source.height, 1] });
        device.queue.copyExternalImageToTexture({ source }, { texture }, [source.width, source.height]);
        textures.push(texture);
    }

    return textures;
};