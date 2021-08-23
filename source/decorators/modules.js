export const defaultShaderModuleOptions = {
    entryPoint: 'main'
};

export const createShaderModule = (device, options) => device.createShaderModule({ ...defaultShaderModuleOptions, ...options });