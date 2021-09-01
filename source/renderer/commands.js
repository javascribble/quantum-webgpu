import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { createUniformBuffer } from '../device/buffer.js';
import { createVertexBuffer } from '../device/buffer.js';

export const generateCommands = (state, device, context) => {
    const drawable = state.children[0];
    if (!state.pipeline) {
        state.pipeline = createRenderPipeline(device, {
            vertex: drawable.vertex,
            fragment: drawable.fragment
        });

        // const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        // const uniformBuffer = createUniformBuffer(device, { size: matrix.byteLength });
        // device.queue.writeBuffer(uniformBuffer, 0, matrix, 0, matrix.byteLength);

        // const uniformBindGroup = createBindGroup(device, {
        //     layout: state.pipeline.getBindGroupLayout(0),
        //     entries: [
        //         {
        //             binding: 0,
        //             resource: {
        //                 buffer: uniformBuffer
        //             }
        //         }
        //     ]
        // });
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
                        // depthStencilAttachment: {
                        //     view: depthTexture.createView(),
                        //     depthLoadValue: 1.0,
                        //     depthStoreOp: 'store',
                        //     stencilLoadValue: 0,
                        //     stencilStoreOp: 'store',
                        // }
                    },
                    options: {
                        bindGroups: [],
                        vertexBuffers: [],
                        pipeline: state.pipeline,
                        draws: [
                            {
                                count: 4, //cubeVertexCount
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