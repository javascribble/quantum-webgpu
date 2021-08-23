const { WebGPU } = Quantum;
const { load } = quantum;

WebGPU.prototype.load = async function (data) {
    const { textures, buffers, shaders, programs, layouts, scenes } = data;

    for (const texture of textures) {
        texture.image = await load(texture.source);
    }

    for (const shader of shaders) {
        shader.entryPoint = 'main';
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
};

WebGPU.prototype.unload = function (data) {
};