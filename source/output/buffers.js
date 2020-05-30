import { uniformBufferUsage, vertexBufferUsage, indexBufferUsage, copySourceBufferUsage, copyDestinationBufferUsage } from './constants';

export const defaultBufferOptions = {};

export const createUniformBuffer = (device, options) => createBuffer(device, { ...options, usage: uniformBufferUsage | copyDestinationBufferUsage });

export const createVertexBuffer = (device, options) => createBuffer(device, { ...options, usage: vertexBufferUsage | copyDestinationBufferUsage });

export const createIndexBuffer = (device, options) => createBuffer(device, { ...options, usage: indexBufferUsage | copyDestinationBufferUsage });

export const createCopyBuffer = (device, options) => createBuffer(device, { ...options, usage: copyDestinationBufferUsage | copySourceBufferUsage });

export const createBuffer = (device, options) => device.createBuffer({ ...defaultBufferOptions, ...options });

export const bufferData = (buffer, index, data) => buffer.setSubData(index, data);
