const { WebGPU } = Quantum;

WebGPU.prototype.load = function (scene) {
    for (const [type, options] of Object.entries(scene)) {
    }

    const pipeline = this.device.createRenderPipeline({
        vertex: {
            module: this.device.createShaderModule({ code: scene.shaders[0].source }),
            entryPoint: 'main'
        },
        fragment: {
            module: this.device.createShaderModule({ code: scene.shaders[1].source }),
            entryPoint: 'main',
            targets: [{ format: this.format }]
        },
        primitive: {
            topology: 'triangle-list'
        }
    });

    return pipeline;
};

WebGPU.prototype.unload = function (scene) {
    for (const [type, options] of Object.entries(scene)) {
    }
};