import { vertexBufferUsage, uniformBufferUsage, copyDestinationBufferUsage } from '../constants/gpu.js';

export const defaultBufferOptions = {
    mappedAtCreation: true,
    size: 4
};

export const createUniformBuffer = (device, options) => createBuffer(device, { usage: uniformBufferUsage | copyDestinationBufferUsage, ...options });

export const ceateVertexBuffer = (device, options) => createBuffer(device, { usage: vertexBufferUsage, ...options });

export const createBuffer = (device, options) => device.createBuffer({ ...defaultBufferOptions, ...options });

// new Float32Array(vertexBuffer.getMappedRange()).set(buffers[0]);
// vertexBuffer.unmap();


// this.device.queue.writeBuffer(
//     uniformBuffer,
//     0,
//     matrixData.buffer,
//     matrixData.byteOffset,
//     matrixData.byteLength
// );