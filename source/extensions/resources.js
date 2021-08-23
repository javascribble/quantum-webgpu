const { WebGPU } = Quantum;
const { load } = quantum;

WebGPU.prototype.load = async function (scene) {
    const { shaders, pipelines } = scene;

    for (const shader of shaders) {
        shader.entryPoint = 'main';
        shader.module = this.device.createShaderModule({ code: await load(shader.source) });
    }

    this.pipelines = [];
    for (const pipeline of pipelines) {
        pipeline.vertex = shaders[pipeline.vertex];
        pipeline.fragment = shaders[pipeline.fragment];
        this.pipelines.push(this.device.createRenderPipeline(pipeline));
    }
};

WebGPU.prototype.unload = function (scene) {
};