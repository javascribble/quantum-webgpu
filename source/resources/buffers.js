import { createVertexBuffer } from '../device/buffer.js';

const { load } = quantum;

export const defaultBufferOptions = {
};

export const loadBuffers = async (device, options) => {
    const buffers = [];
    for (const option of options) {
        const vertices = new Float32Array(await load(option.source));
        const vertexBuffer = createVertexBuffer(device, { size: vertices.byteLength });
        new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
        vertexBuffer.unmap();
        buffers.push(vertexBuffer);
    }

    return buffers;
};