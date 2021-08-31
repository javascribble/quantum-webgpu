import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { createVertexBuffer } from '../device/buffer.js';

export const generateCommands = (state, device, context) => {
    const drawable = state.children[0];
    if (!state.pipeline) {
        state.pipeline = createRenderPipeline(device, {
            vertex: drawable.vertex,
            fragment: drawable.fragment
        });

        // const vertices = drawable.buffer.vertices;
        // const vertexBuffer = createVertexBuffer(vertices.length);
        // new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
        // vertexBuffer.unmap();

        // const uniformBuffer = device.createBuffer({
        //     size: matrix4.byteLength,
        //     usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        // });

        // const uniformBindGroup = device.createBindGroup({
        //     layout:  .getBindGroupLayout(0),
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

    // device.queue.writeBuffer(
    //     uniformBuffer,
    //     0,
    //     transformationMatrix.buffer,
    //     transformationMatrix.byteOffset,
    //     transformationMatrix.byteLength
    // );

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
                    bindGroups: [],
                    //vertexBuffers: [],
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
            ]
        }
    ];

    return commands;
};