export const defaultComputePipelineOptions = {
};

export const defaultRenderPipelineOptions = {
    primitive: {
        topology: 'triangle-list',
        cullMode: 'back'
    }
};

export const createComputePipeline = (device, options) => device.createComputePipeline({ ...defaultComputePipelineOptions, ...options });

export const createRenderPipeline = (device, options) => device.createRenderPipeline({ ...defaultRenderPipelineOptions, ...options });