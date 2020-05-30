export const defaultPipelineLayoutOptions = {
};

export const createPipelineLayout = (device, options) => device.createPipelineLayout({ ...defaultPipelineLayoutOptions, ...options });