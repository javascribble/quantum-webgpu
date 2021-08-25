import { encodeScene } from '../graphics/scene.js';

const { WebGPU } = Quantum;

WebGPU.prototype.draw = function (state) {
    state.scenes[0].commands[0].passes[0].descriptor.colorAttachments[0].view = this.context.getCurrentTexture().createView();

    for (const scene of state.scenes) {
        this.device.queue.submit(encodeScene(this.device, scene));
    }
};