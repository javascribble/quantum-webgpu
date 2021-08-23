const getShaderConstant = type => GPUShaderStage[type];
const getBufferConstant = type => GPUBufferUsage[type];
const getTextureConstant = type => GPUTextureUsage[type];
const getColorConstant = type => GPUColorWrite[type];

export const indexBufferUsage = getBufferConstant("INDEX");
export const vertexBufferUsage = getBufferConstant("VERTEX");
export const uniformBufferUsage = getBufferConstant("UNIFORM");
export const copySourceBufferUsage = getBufferConstant("COPY_SRC");
export const copyDestinationBufferUsage = getBufferConstant("COPY_DST");

export const outputAttachmentTextureUsage = getTextureConstant("OUTPUT_ATTACHMENT");
export const copyDestinationTextureUsage = getTextureConstant("COPY_DST");
export const copySourceTextureUsage = getTextureConstant("COPY_SRC");