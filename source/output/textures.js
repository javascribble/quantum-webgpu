import { sampledTextureUsage, outputAttachmentTextureUsage, copySourceTextureUsage, copyDestinationTextureUsage } from './constants';

export const defaultTextureOptions = {
    format: 'rgba8unorm',
    dimension: '2d'
};

export const createSampledTexture = (device, options) => createTexture(device, { ...options, usage: sampledTextureUsage | copyDestinationTextureUsage });

export const createDepthTexture = (device, options) => createTexture(device, { ...options, usage: outputAttachmentTextureUsage | copySourceTextureUsage });

export const createTexture = (device, options) => device.createTexture({ ...defaultTextureOptions, ...options });

export const bufferTexture = (device) => {

};