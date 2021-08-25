export const defaultShaderModuleOptions = {
};

export const createShaderModule = (device, options) => device.createShaderModule({ ...defaultShaderModuleOptions, ...options });