import { defaultColorAttachmentDescriptor, defaultDepthStencilAttachmentDescriptor } from '../passes/attachment.js';
import { configureComputePass } from '../passes/compute.js';
import { configureRenderPass } from '../passes/render.js';

export const defaultComputePassDescriptor = {
};

export const defaultRenderPassDescriptor = {
};

export const encodePass = (pass, encoder) => {
    const { compute, descriptor, options } = pass;
    if (compute) {
        configureComputePass(encoder.beginComputePass({ ...defaultComputePassDescriptor, ...descriptor }), options);
    } else {
        if (descriptor.colorAttachments) {
            for (let i = 0; i < descriptor.colorAttachments.length; i++) {
                descriptor.colorAttachments[i] = { ...defaultColorAttachmentDescriptor, ...descriptor.colorAttachments[i] };
            }
        }

        if (descriptor.depthStencilAttachment) {
            descriptor.depthStencilAttachment = { ...defaultDepthStencilAttachmentDescriptor, ...descriptor.depthStencilAttachment };
        }

        configureRenderPass(encoder.beginRenderPass({ ...defaultRenderPassDescriptor, ...descriptor }), options);
    }
};