export const defaultBufferOptions = {
};

export const createBuffer = (device, options) => device.createBuffer({ ...defaultBufferOptions, ...options });