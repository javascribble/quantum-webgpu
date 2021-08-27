import { encodeCommands } from '../encoder/commands.js';

const { WebGPU } = Quantum;

WebGPU.prototype.draw = function (state) {
    state.commandGroups[0].commands[0].passes[0].descriptor.colorAttachments[0].view = this.context.getCurrentTexture().createView();

    for (const commandGroup of state.commandGroups) {
        this.device.queue.submit(encodeCommands(commandGroup.commands, this.device));
    }
};