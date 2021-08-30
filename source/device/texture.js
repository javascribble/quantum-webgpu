import { renderAttachmentTextureUsage } from '../constants/gpu.js';

export const defaultTextureOptions = {
    format: 'rgba8unorm',
    dimension: '2d'
};

export const createRenderTexture = (device, options) => createTexture(device, { size: device.size, format: 'depth24plus', ...options });

export const createTexture = (device, options) => device.createTexture({ ...defaultTextureOptions, ...options });