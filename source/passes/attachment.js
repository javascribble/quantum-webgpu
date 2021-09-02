export const defaultColorAttachmentDescriptor = {
    loadValue: { r: 0, g: 0, b: 0, a: 1 },
    storeOp: 'store'
};

export const defaultDepthStencilAttachmentDescriptor = {
    depthLoadValue: 1.0,
    depthStoreOp: 'store',
    stencilLoadValue: 0,
    stencilStoreOp: 'store'
};