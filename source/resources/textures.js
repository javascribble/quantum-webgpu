import { createImageTexture } from '../device/texture.js';

const { load } = quantum;

export const defaultTextureOptions = {
};

export const loadTextures = async (device, options) => {
    const textures = [];
    for (const option of options) {
        const image = await load(option.source);
        const imageBitmap = await createImageBitmap(image);
        const texture = createImageTexture(device, { size: [imageBitmap.width, imageBitmap.height, 1] });
        device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture }, [imageBitmap.width, imageBitmap.height]);
        textures.push(texture);
    }

    return textures;
};