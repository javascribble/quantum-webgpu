import { configureComputePass } from '../passes/compute.js';
import { configureRenderPass } from '../passes/render.js';

export const encodePass = (pass, encoder) => {
    if (pass.compute) {
        configureComputePass(encoder.beginComputePass(pass.descriptor), pass.options);
    } else {
        configureRenderPass(encoder.beginRenderPass(pass.descriptor), pass.options);
    }
};