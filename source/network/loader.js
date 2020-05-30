import { parseObj } from '../parsers/obj';

export const loadModel = async (resource) => {
    // TODO: Add other formats.
    return await parseObj(await load(resource));
};

export const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

export const loadTexture = async (resource) => {
    const textureResource = await load(resource);

    const sprites = [];
    for (const sprite of textureResource.sprites) {
        const image = await load(textureResource.image);
        const imageBitmap = await loadImageBitmap(image, sprite);
        sprites.push({ name: sprite.name, imageBitmap });
    }

    return {
        sprites
    }
}

//const loadImageBitmap = (image, options) => createImageBitmap(image, options.x, options.y, options.w, options.h);