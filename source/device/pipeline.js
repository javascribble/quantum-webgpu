export const defaultComputePipelineDescriptor = {
};

export const defaultRenderPipelineDescriptor = {
    primitive: {
        topology: 'triangle-list',
        cullMode: 'back'
    },
    depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus'
    }
};

export const createComputePipeline = (device, descriptor) => device.createComputePipeline({ ...defaultComputePipelineDescriptor, ...descriptor });

export const createRenderPipeline = (device, descriptor) => device.createRenderPipeline({ ...defaultRenderPipelineDescriptor, ...descriptor });