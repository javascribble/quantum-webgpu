import { vertexBufferUsage } from '../constants/gpu.js';

const { WebGPU } = Quantum;

WebGPU.prototype.draw = function (pipeline) {
    // const vertexBuffer = this.device.createBuffer({
    //     usage: vertexBufferUsage,
    //     mappedAtCreation: true,
    //     size: 4
    // });

    // new Float32Array(vertexBuffer.getMappedRange()).set(cubeVertexArray);
    // vertexBuffer.unmap();


    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();
    const renderPassDescriptor = {
        colorAttachments: [
            {
                loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                view: textureView,
                storeOp: 'store'
            }
        ]
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.endPass();
    this.device.queue.submit([commandEncoder.finish()]);
};