import { configureBasicPass } from './basic.js';

export const configureComputePass = (pass, options) => {
    configureBasicPass(pass, options);

    pass.dispatch();

    pass.endPass();
};