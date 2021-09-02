import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { createUniformBuffer } from '../device/buffer.js';
import { createBindGroup } from '../device/group.js';
import { createDepthTexture } from '../device/texture.js';

export const generateCommands = (state, { device, context, size }) => {
    const drawable = state.children[0];
    if (!state.initialized) {
        const uniforms = new Float32Array([0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1]);
        const uniformBuffer = createUniformBuffer(device, { size: uniforms.byteLength });
        device.queue.writeBuffer(uniformBuffer, 0, uniforms);

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

        state.pipeline = pipeline;
        state.depthTexture = depthTexture;
        state.vertexBuffers = [drawable.buffer];
        state.bindGroups = [bindGroup];
        state.initialized = true;
    }

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
                            view: state.depthTexture.createView(),
                            depthLoadValue: 1.0,
                            depthStoreOp: 'store',
                            stencilLoadValue: 0,
                            stencilStoreOp: 'store',
                        }
                    },
                    options: {
                        bindGroups: state.bindGroups,
                        vertexBuffers: state.vertexBuffers,
                        pipeline: state.pipeline,
                        draws: [
                            {
                                count: 36,
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