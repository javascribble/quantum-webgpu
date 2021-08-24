const { WebGPU } = Quantum;
const { load } = quantum;

WebGPU.prototype.load = async function (data) {
    const { textures, buffers, shaders, programs, layouts, scenes } = data;

    for (const texture of textures) {
        texture.image = await load(texture.source);
    }

    for (const shader of shaders) {
        shader.entryPoint = 'main';
        shader.code = await load(shader.source);
        shader.module = this.device.createShaderModule({ code: await load(shader.source) });
    }

    for (const buffer of buffers) {
        buffer.vertices = await load(buffer.source);
    }

    for (const program of programs) {
        program.vertex = shaders[program.vertex];
        program.fragment = shaders[program.fragment];
        program.pipeline = this.device.createRenderPipeline(program);
    }

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

    // const matrixSize = 4 * 16;
    // const uniformBufferSize = 16 * matrixSize;
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

    // TODO: Store this in a better way.
    this.data = data;
};

WebGPU.prototype.unload = function (data) {
    // TODO: this.data = null;
};