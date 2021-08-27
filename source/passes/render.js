export const configureRenderPass = (pass, encoder) => {
    const renderPass = encoder.beginRenderPass(pass.descriptor);

    const { pipeline, bindGroups } = pass;
    renderPass.setPipeline(pipeline);
    if (bindGroups) {
        for (let i = 0; i < bindGroups.length; i++) {
            renderPass.setBindGroup(i, bindGroups[i]);
        }
    }

    const { viewport, scissorRect, vertexBuffers, indexBuffer, draws } = pass;
    if (viewport) {
        renderPass.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
    }

    if (scissorRect) {
        renderPass.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height);
    }

    if (vertexBuffers) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            renderPass.setVertexBuffer(i, vertexBuffers[i]);
        }
    }

    if (indexBuffer) {
        renderPass.setIndexBuffer(indexBuffer);
    }

    for (const draw of draws) {
        const { indexed, indirect } = draw;
        if (indexed) {
            if (indirect) {
                renderPass.drawIndexedIndirect(draw.buffer, draw.offset);
            } else {
                renderPass.drawIndexed(draw.count, draw.instances, draw.firstElement, draw.baseVertex, draw.firstInstance);
            }
        } else {
            if (indirect) {
                renderPass.drawIndirect(draw.buffer, draw.offset);
            } else {
                renderPass.draw(draw.count, draw.instances, draw.firstElement, draw.firstInstance);
            }
        }
    }

    renderPass.endPass();
};