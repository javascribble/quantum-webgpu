export const getGPUShaderStageConstant = (type) => GPUShaderStage[type];
export const getGPUBufferUsageConstant = (type) => GPUBufferUsage[type];
export const getGPUTextureUsageConstant = (type) => GPUTextureUsage[type];
export const getGPUColorWriteConstant = (type) => GPUColorWrite[type];

export const indexBufferUsage = getGPUBufferUsageConstant("INDEX");
export const vertexBufferUsage = getGPUBufferUsageConstant("VERTEX");
export const uniformBufferUsage = getGPUBufferUsageConstant("UNIFORM");
export const copySourceBufferUsage = getGPUBufferUsageConstant("COPY_SRC");
export const copyDestinationBufferUsage = getGPUBufferUsageConstant("COPY_DST");

export const outputAttachmentTextureUsage = getGPUTextureUsageConstant("OUTPUT_ATTACHMENT");
export const copyDestinationTextureUsage = getGPUTextureUsageConstant("COPY_DST");
export const copySourceTextureUsage = getGPUTextureUsageConstant("COPY_SRC");
export const sampledTextureUsage = getGPUTextureUsageConstant("SAMPLED");