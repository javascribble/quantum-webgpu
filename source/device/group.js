export const defaultBindGroupOptions = {
};

export const createBindGroup = (device, options) => device.createBindGroup({ ...defaultBindGroupOptions, ...options });