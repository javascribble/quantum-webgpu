import { vertexBufferUsage, uniformBufferUsage, copyDestinationBufferUsage } from '../constants/gpu.js';

export const defaultBufferOptions = {
    mappedAtCreation: true
};

export const createUniformBuffer = (device, options) => createBuffer(device, { usage: uniformBufferUsage | copyDestinationBufferUsage, ...options });

export const createVertexBuffer = (device, options) => createBuffer(device, { usage: vertexBufferUsage, ...options });

export const createBuffer = (device, options) => device.createBuffer({ ...defaultBufferOptions, ...options });