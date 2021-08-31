export const defaultBindGroupDescriptor = {
};

export const createBindGroup = (device, descriptor) => device.createBindGroup({ ...defaultBindGroupDescriptor, ...descriptor });