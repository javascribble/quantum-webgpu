import { vertexBufferUsage } from '../constants/gpu.js';

const { WebGPU } = Quantum;

WebGPU.prototype.draw = function (data) {
    // const vertexBuffer = this.this.device.createBuffer({
    //     usage: vertexBufferUsage,
    //     mappedAtCreation: true,
    //     size: 4
    // });

    // new Float32Array(vertexBuffer.getMappedRange()).set(buffers[0]);
    // vertexBuffer.unmap();

    // const depthTexture = this.device.createTexture({
    //     size: presentationSize,
    //     format: 'depth24plus',
    //     usage: GPUTextureUsage.RENDER_ATTACHMENT,
    // });

    // const numInstances = 16;
    // const matrixFloatCount = 16;
    // const matrixSize = 4 * matrixFloatCount;
    // const uniformBufferSize = numInstances * matrixSize;
    // const uniformBuffer = this.device.createBuffer({
    //     size: uniformBufferSize,
    //     usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    // });

    // const uniformBindGroup = this.device.createBindGroup({
    //     layout: pipeline.getBindGroupLayout(0),
    //     entries: [
    //         {
    //             binding: 0,
    //             resource: {
    //                 buffer: uniformBuffer,
    //             },
    //         },
    //     ],
    // });

    // this.device.queue.writeBuffer(
    //     uniformBuffer,
    //     0,
    //     matrixData.buffer,
    //     matrixData.byteOffset,
    //     matrixData.byteLength
    // );

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

    const { scenes } = data;
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