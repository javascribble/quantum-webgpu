import { configureBasicPass } from './basic.js';

export const configureRenderPass = (pass, options) => {
    configureBasicPass(pass, options);

    const { viewport, scissorRect, vertexBuffers, indexBuffer, draws } = options;
    if (viewport) {
        pass.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
    }

    if (scissorRect) {
        pass.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height);
    }

    if (vertexBuffers) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            pass.setVertexBuffer(i, vertexBuffers[i]);
        }
    }

    if (indexBuffer) {
        pass.setIndexBuffer(indexBuffer);
    }

    for (const draw of draws) {
        const { indexed, indirect } = draw;
        if (indexed) {
            if (indirect) {
                pass.drawIndexedIndirect(draw.buffer, draw.offset);
            } else {
                pass.drawIndexed(draw.count, draw.instances, draw.firstElement, draw.baseVertex, draw.firstInstance);
            }
        } else {
            if (indirect) {
                pass.drawIndirect(draw.buffer, draw.offset);
            } else {
                pass.draw(draw.count, draw.instances, draw.firstElement, draw.firstInstance);
            }
        }
    }

    pass.endPass();
};