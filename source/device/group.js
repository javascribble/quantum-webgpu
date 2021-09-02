export const defaultBindGroupDescriptor = {
};

export const createBindGroup = (device, descriptor) => {
    const { entries } = descriptor;
    for (let i = 0; i < entries.length; i++) {
        entries[i].binding = i;
    }

    return device.createBindGroup({ ...defaultBindGroupDescriptor, ...descriptor });
};