export const defaultComputePipelineOptions = {
};

export const defaultRenderPipelineOptions = {
    primitive: {
        topology: 'triangle-strip',
        stripIndexFormat: 'uint32',
        cullMode: 'back'
    },
    // depthStencil: {
    //     depthWriteEnabled: true,
    //     depthCompare: 'less',
    //     format: 'depth24plus'
    // }
    // multisample: {
    //     count: 1,
    // }
};

export const createComputePipeline = (device, options) => device.createComputePipeline({ ...defaultComputePipelineOptions, ...options });

export const createRenderPipeline = (device, options) => device.createRenderPipeline({ ...defaultRenderPipelineOptions, ...options });