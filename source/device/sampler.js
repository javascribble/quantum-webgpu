export const defaultSamplerDescriptor = {
    minFilter: 'nearest',
    magFilter: 'nearest'
};

export const createSampler = (device, descriptor) => device.createSampler({ ...defaultSamplerDescriptor, ...descriptor });
