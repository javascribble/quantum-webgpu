export const defaultComputePipelineDescriptor = {
};

export const defaultRenderPipelineDescriptor = {
    primitive: {
        topology: 'triangle-strip',
        stripIndexFormat: 'uint32',
        cullMode: 'back'
    },
    depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus'
    }
    // multisample: {
    //     count: 1,
    // }
};

export const createComputePipeline = (device, descriptor) => device.createComputePipeline({ ...defaultComputePipelineDescriptor, ...descriptor });

export const createRenderPipeline = (device, descriptor) => device.createRenderPipeline({ ...defaultRenderPipelineDescriptor, ...descriptor });