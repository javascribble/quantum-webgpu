import { createUniformBuffer } from '../device/buffer.js';
import { createBindGroup } from '../device/group.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { createDepthTexture } from '../device/texture.js';
import { createSampler } from '../device/sampler.js';
import { createCommandEncoder } from '../device/encoder.js';
import { encodeCommand } from '../encoder/command.js';

export function render(state) {
    const { device, context, size } = this;
    const drawable = state.root;
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
                    resource: {
                        buffer: uniformBuffer
                    }
                },
                {
                    resource: createSampler(device)
                },
                {
                    resource: drawable.texture.createView()
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
                        colorAttachments: [{ view: context.getCurrentTexture().createView() }],
                        depthStencilAttachment: { view: state.depthTexture.createView() }
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

    device.queue.submit(commands.map(command => encodeCommand(command, createCommandEncoder(device, command))));
}