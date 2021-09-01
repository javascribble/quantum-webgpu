import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { createUniformBuffer } from '../device/buffer.js';
import { createVertexBuffer } from '../device/buffer.js';
import { createBindGroup } from '../device/group.js';
import { createDepthTexture } from '../device/texture.js';

export const generateCommands = (state, { device, context, size }) => {
    const uniformBuffer = createUniformBuffer(device, { size: 64 });
    const uniforms = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    const vertexBuffer = createVertexBuffer(device, { size: 32 });
    new Float32Array(vertexBuffer.getMappedRange()).set([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]);
    vertexBuffer.unmap();

    const drawable = state.children[0];
    const pipeline = createRenderPipeline(device, {
        vertex: drawable.vertex,
        fragment: drawable.fragment
    });

    const depthTexture = createDepthTexture(device, { size });

    const bindGroup = createBindGroup(device, {
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: uniformBuffer
                }
            }
        ]
    });

    device.queue.writeBuffer(uniformBuffer, 0, uniforms);

    const commands = [
        {
            passes: [
                {
                    descriptor: {
                        colorAttachments: [
                            {
                                view: createView(context),
                                //resolveTarget
                                storeOp: 'store',
                                loadValue: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                    a: 1
                                }
                            }
                        ],
                        depthStencilAttachment: {
                            view: depthTexture.createView(),
                            depthLoadValue: 1.0,
                            depthStoreOp: 'store',
                            stencilLoadValue: 0,
                            stencilStoreOp: 'store',
                        }
                    },
                    options: {
                        bindGroups: [bindGroup],
                        vertexBuffers: [vertexBuffer],
                        pipeline,
                        draws: [
                            {
                                count: 4,
                                instances: 1,
                                firstElement: 0,
                                firstInstance: 0
                            }
                        ]
                    }
                }
            ]
        }
    ];

    return commands;
};