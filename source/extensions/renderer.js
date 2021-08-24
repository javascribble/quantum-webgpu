import { vertexBufferUsage } from '../constants/gpu.js';

const { WebGPU } = Quantum;

WebGPU.prototype.draw = function () {
    const renderPassDescriptor = {
        colorAttachments: [
            {
                loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                view: this.context.getCurrentTexture().createView(),
                storeOp: 'store'
            }
        ],
        // depthStencilAttachment: {
        //     view: depthTexture.createView(),
        //     depthLoadValue: 1.0,
        //     depthStoreOp: 'store',
        //     stencilStoreOp: 'store',
        //     stencilLoadValue: 0
        // }
    };

    const { pipelines, scenes } = this.data;
    for (const scene of scenes) {
        const commands = [];
        for (const command of scene.commands) {
            const commandEncoder = this.device.createCommandEncoder();
            for (const pass of command.passes) {
                const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
                passEncoder.setPipeline(this.pipelines[pipeline]);
                // passEncoder.setBindGroup(0, uniformBindGroup);
                // passEncoder.setVertexBuffer(0, verticesBuffer);
                // passEncoder.draw(cubeVertexCount, numInstances, 0, 0);
                passEncoder.draw(3, 1, 0, 0);
                passEncoder.endPass();
            }

            commands.push(commandEncoder.finish());
        }

        this.device.queue.submit(commands);
    }
};