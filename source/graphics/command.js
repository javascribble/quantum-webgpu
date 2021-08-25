import { createCommandEncoder } from '../decorators/encoder.js';

export const encodeCommand = (device, command) => {
    const commandEncoder = createCommandEncoder(device, command.descriptor);
    for (const pass of command.passes) {
        if (pass.compute) {
            const computePassEncoder = commandEncoder.beginComputePass(pass.descriptor);
            encodePass(pass, computePassEncoder);
            computePassEncoder.dispatch(0);
            computePassEncoder.endPass();
        } else {
            const renderPassEncoder = commandEncoder.beginRenderPass(pass.descriptor);
            encodePass(pass, renderPassEncoder);

            const { viewport, scissorRect, vertexBuffers, indexBuffer, draws } = pass;
            if (viewport) {
                renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
            }

            if (scissorRect) {
                renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height);
            }

            if (vertexBuffers) {
                for (let i = 0; i < vertexBuffers.length; i++) {
                    renderPassEncoder.setVertexBuffer(i, vertexBuffers[i]);
                }
            }

            if (indexBuffer) {
                renderPassEncoder.setIndexBuffer(indexBuffer);
            }

            for (const draw of draws) {
                const { indexed, indirect } = draw;
                if (indexed) {
                    if (indirect) {
                        renderPassEncoder.drawIndexedIndirect(draw.buffer, draw.offset);
                    } else {
                        renderPassEncoder.drawIndexed(draw.count, draw.instances, draw.firstElement, draw.baseVertex, draw.firstInstance);
                    }
                } else {
                    if (indirect) {
                        renderPassEncoder.drawIndirect(draw.buffer, draw.offset);
                    } else {
                        renderPassEncoder.draw(draw.count, draw.instances, draw.firstElement, draw.firstInstance);
                    }
                }
            }

            renderPassEncoder.endPass();
        }
    }

    return commandEncoder.finish();
};

const encodePass = (pass, passEncoder) => {
    const { pipeline, bindGroups } = pass;
    passEncoder.setPipeline(pipeline);
    if (bindGroups) {
        for (let i = 0; i < bindGroups.length; i++) {
            passEncoder.setBindGroup(i, bindGroups[i]);
        }
    }
};