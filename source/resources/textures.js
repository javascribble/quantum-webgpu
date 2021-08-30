const { load } = quantum;

export const defaultTextureOptions = {
};

export const loadTextures = async (device, options) => {
    const textures = [];
    for (const option of options) {
        const image = await load(option.source);

        const texture = {
            ...defaultTextureOptions,
            image
        };

        textures.push(texture);
    }

    return textures;
};