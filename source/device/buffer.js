import { vertexBufferUsage, uniformBufferUsage, copyDestinationBufferUsage } from '../constants/gpu.js';

export const defaultBufferDescriptor = {
    mappedAtCreation: true
};

export const createUniformBuffer = (device, descriptor) => createBuffer(device, { usage: uniformBufferUsage | copyDestinationBufferUsage, ...descriptor });

export const createVertexBuffer = (device, descriptor) => createBuffer(device, { usage: vertexBufferUsage, ...descriptor });

export const createBuffer = (device, descriptor) => device.createBuffer({ ...defaultBufferDescriptor, ...descriptor });