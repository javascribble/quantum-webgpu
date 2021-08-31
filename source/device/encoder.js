export const defaultCommandEncoderDescriptor = {
};

export const createCommandEncoder = (device, descriptor) => device.createCommandEncoder({ ...defaultCommandEncoderDescriptor, ...descriptor });