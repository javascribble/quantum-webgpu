import { createCommandEncoder } from '../decorators/encoder.js';
import { configureComputePass } from '../passes/compute.js';
import { configureRenderPass } from '../passes/render.js';

export const encodeCommands = (commands, device) => commands.map(command => encodeCommand(command, createCommandEncoder(device, command.descriptor)));

const encodeCommand = (command, encoder) => {
    for (const pass of command.passes) {
        if (pass.draws) {
            configureRenderPass(pass, encoder);
        } else if (pass.dispatch) {
            configureComputePass(pass, encoder);
        }
    }

    return encoder.finish();
};