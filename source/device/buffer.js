import { vertexBufferUsage, uniformBufferUsage, copyDestinationBufferUsage } from '../constants/gpu.js';

export const defaultUniformBufferDescriptor = {
    usage: uniformBufferUsage | copyDestinationBufferUsage
};

export const defaultVertexBufferDescriptor = {
    usage: vertexBufferUsage,
    mappedAtCreation: true
};

export const defaultBufferDescriptor = {
};

export const createUniformBuffer = (device, descriptor) => createBuffer(device, { ...defaultUniformBufferDescriptor, ...descriptor });

export const createVertexBuffer = (device, descriptor) => createBuffer(device, { ...defaultVertexBufferDescriptor, ...descriptor });

export const createBuffer = (device, descriptor) => device.createBuffer({ ...defaultBufferDescriptor, ...descriptor });