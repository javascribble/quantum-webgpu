export const defaultSamplerOptions = {
    minFilter: 'linear',
    magFilter: 'linear'
};

export const createSampler = (device, options) => device.createSampler({ ...defaultSamplerOptions, ...options });
