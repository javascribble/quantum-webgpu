import { renderAttachmentTextureUsage } from '../constants/gpu.js';

export const defaultDepthTextureOptions = {
    usage: renderAttachmentTextureUsage,
    format: 'depth24plus'
};

export const defaultTextureOptions = {
    //sampleCount: 1,
    format: 'rgba8unorm',
    dimension: '2d'
};

export const createDepthTexture = (device, options) => createTexture(device, { size: device.size, ...defaultDepthTextureOptions, ...options });

export const createTexture = (device, options) => device.createTexture({ ...defaultTextureOptions, ...options });