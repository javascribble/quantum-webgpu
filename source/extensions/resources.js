import { createShaderModule } from '../decorators/module.js';
import { createRenderPipeline } from '../decorators/pipeline.js';

const { WebGPU } = Quantum;
const { load } = quantum;

WebGPU.prototype.load = async function (data) {
    const { textures, buffers, shaders, programs, layouts, attachments, scenes } = data;

    for (const texture of textures) {
        texture.image = await load(texture.source);
    }

    for (const buffer of buffers) {
        buffer.vertices = await load(buffer.source);
    }

    for (const shader of shaders) {
        shader.entryPoint = 'main';
        shader.module = createShaderModule(this.device, { code: await load(shader.source) });
    }

    for (const program of programs) {
        program.vertex = shaders[program.vertex];
        program.fragment = shaders[program.fragment];
        program.pipeline = createRenderPipeline(this.device, program);
    }

    for (const layout of layouts) {

    }

    for (const scene of scenes) {
        for (const command of scene.commands) {
            for (const pass of command.passes) {
                const { colorAttachments } = pass.descriptor;
                for (let i = 0; i < colorAttachments.length; i++) {
                    colorAttachments[i] = attachments[i];
                }

                pass.pipeline = programs[pass.pipeline].pipeline;
            }
        }
    }
};

WebGPU.prototype.unload = function (data) {
};