const getColorConstant = type => GPUColorWrite[type];
const getBufferConstant = type => GPUBufferUsage[type];
const getTextureConstant = type => GPUTextureUsage[type];
const getShaderConstant = type => GPUShaderStage[type];

export const redColorWrite = getColorConstant("RED");
export const greenColorWrite = getColorConstant("GREEN");
export const blueColorWrite = getColorConstant("BLUE");
export const alphaColorWrite = getColorConstant("ALPHA");
export const allColorWrite = getColorConstant("ALL");

export const mapReadBufferUsage = getBufferConstant("MAP_READ");
export const mapWriteBufferUsage = getBufferConstant("MAP_WRITE");
export const copySourceBufferUsage = getBufferConstant("COPY_SRC");
export const copyDestinationBufferUsage = getBufferConstant("COPY_DST");
export const indexBufferUsage = getBufferConstant("INDEX");
export const vertexBufferUsage = getBufferConstant("VERTEX");
export const uniformBufferUsage = getBufferConstant("UNIFORM");
export const storageBufferUsage = getBufferConstant("STORAGE");
export const indirectBufferUsage = getBufferConstant("INDIRECT");
export const queryResolveBufferUsage = getBufferConstant("QUERY_RESOLVE");

export const copySourceTextureUsage = getTextureConstant("COPY_SRC");
export const copyDestinationTextureUsage = getTextureConstant("COPY_DST");
export const textureBindingTextureUsage = getTextureConstant("TEXTURE_BINDING");
export const storageBindingTextureUsage = getTextureConstant("STORAGE_BINDING");
export const renderAttachmentTextureUsage = getTextureConstant("RENDER_ATTACHMENT");

export const vertexShaderStage = getShaderConstant("VERTEX");
export const fragmentShaderStage = getShaderConstant("FRAGMENT");
export const computeShaderStage = getShaderConstant("COMPUTE");