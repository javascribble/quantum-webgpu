export const defaultSamplerDescriptor = {
    minFilter: 'linear',
    magFilter: 'linear'
};

export const createSampler = (device, descriptor) => device.createSampler({ ...defaultSamplerDescriptor, ...descriptor });
