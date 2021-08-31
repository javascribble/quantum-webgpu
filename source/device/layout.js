export const defaultPipelineLayoutDescriptor = {
};

export const createPipelineLayout = (device, descriptor) => device.createPipelineLayout({ ...defaultPipelineLayoutDescriptor, ...descriptor });