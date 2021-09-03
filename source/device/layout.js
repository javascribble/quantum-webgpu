export const defaultBingGroupLayoutDescriptor = {
};

export const defaultPipelineLayoutDescriptor = {
};

export const createBingGroupLayout = (device, descriptor) => device.createBingGroupLayout({ ...defaultBingGroupLayoutDescriptor, ...descriptor });

export const createPipelineLayout = (device, descriptor) => device.createPipelineLayout({ ...defaultPipelineLayoutDescriptor, ...descriptor });