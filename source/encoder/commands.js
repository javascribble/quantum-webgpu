import { createCommandEncoder } from '../device/encoder.js';
import { configureComputePass } from '../passes/compute.js';
import { configureRenderPass } from '../passes/render.js';

export const encodeCommands = (commands, device, context) => {
    const passes = [];
    for (const command of commands) {
        const encoder = createCommandEncoder(device, command);
        for (const pass of command.passes) {
            if (pass.draws) {
                configureRenderPass(pass, encoder);
            } else if (pass.dispatch) {
                configureComputePass(pass, encoder);
            }

            passes.push(encoder.finish(command.descriptor));
        }
    }

    return passes;
};