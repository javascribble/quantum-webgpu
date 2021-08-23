export const defaultTextureOptions = {
    format: 'rgba8unorm',
    dimension: '2d'
};

export const createTexture = (device, options) => device.createTexture({ ...defaultTextureOptions, ...options });