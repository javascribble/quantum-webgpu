const { load } = quantum;

export const defaultBufferOptions = {
};

export const loadBuffers = async (device, options) => {
    const buffers = [];
    for (const option of options) {
        const vertices = new Float32Array(await load(option.source));

        const buffer = {
            ...defaultBufferOptions,
            vertices,
        };

        buffers.push(buffer);
    }

    return buffers;
};