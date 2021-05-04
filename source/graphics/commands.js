export const encodeCommand = (device, command) => {
    const commandEncoder = device.createCommandEncoder();
    for (const pass of command.passes) {
        if (pass.compute) {
            const computePassEncoder = commandEncoder.beginComputePass(pass.descriptor);
            encodeComputePass(pass, computePassEncoder);
            computePassEncoder.endPass();
        } else {
            const renderPassEncoder = commandEncoder.beginRenderPass(pass.descriptor);
            encodeRenderPass(pass, renderPassEncoder);
            renderPassEncoder.endPass();
        }
    }

    return commandEncoder.finish();
};

const encodeComputePass = (computePass, computePassEncoder) => {
    const { } = computePass;
    encodePass(computePass, computePassEncoder);
    computePassEncoder.dispatch(0);
};

const encodeRenderPass = (renderPass, renderPassEncoder) => {
    const { viewport, scissorRect, vertexBuffers, indexBuffer, draws } = renderPass;
    encodePass(renderPass, renderPassEncoder);

    // TODO: Set this only on viewport resize.
    if (viewport) {
        renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
    }

    if (scissorRect) {
        renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height); //canvas.width/height
    }

    if (vertexBuffers) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            renderPassEncoder.setVertexBuffer(i, vertexBuffers[i]);
        }
    }

    if (indexBuffer) {
        renderPassEncoder.setIndexBuffer(indexBuffer);
    }

    if (draws) {
        for (const draw of draws) {
            const indexed = draw.indexed;
            const indirect = draw.indirect;
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
    }
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