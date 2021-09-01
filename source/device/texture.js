import { renderAttachmentTextureUsage } from '../constants/gpu.js';

export const defaultDepthTextureDescriptor = {
    usage: renderAttachmentTextureUsage,
    format: 'depth24plus'
};

export const defaultTextureDescriptor = {
    //sampleCount: 1,
    format: 'rgba8unorm',
    dimension: '2d'
};

export const createDepthTexture = (device, descriptor) => createTexture(device, { ...defaultDepthTextureDescriptor, ...descriptor });

export const createTexture = (device, descriptor) => device.createTexture({ ...defaultTextureDescriptor, ...descriptor });