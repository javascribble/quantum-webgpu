export const defaultCommandEncoderOptions = {
};

export const createCommandEncoder = (device, options) => device.createCommandEncoder({ ...defaultCommandEncoderOptions, ...options });