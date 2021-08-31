export const defaultShaderModuleDescriptor = {
};

export const createShaderModule = (device, descriptor) => device.createShaderModule({ ...defaultShaderModuleDescriptor, ...descriptor });