import { renderAttachmentTextureUsage, textureBindingTextureUsage } from '../constants/gpu.js';

export const defaultDepthTextureDescriptor = {
    usage: renderAttachmentTextureUsage,
    format: 'depth24plus'
};

export const defaultImageTextureDescriptor = {
    usage: textureBindingTextureUsage
};

export const defaultTextureDescriptor = {
};

export const createDepthTexture = (device, descriptor) => createTexture(device, { ...defaultDepthTextureDescriptor, ...descriptor });

export const createImageTexture = (device, descriptor) => createTexture(device, { ...defaultImageTextureDescriptor, ...descriptor });

export const createTexture = (device, descriptor) => device.createTexture({ ...defaultTextureDescriptor, ...descriptor });