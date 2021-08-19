const { WebGPU } = Quantum;

WebGPU.prototype.draw = function (pipeline) {
    // const texture = this.device.createTexture({
    //     size: this.size,
    //     format: this.format,
    //     sampleCount: 4,
    //     usage: GPUTextureUsage.RENDER_ATTACHMENT,
    // });

    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();
    const renderPassDescriptor = {
        colorAttachments: [
            {
                loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                view: textureView,
                //resolveTarget for multisampling
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