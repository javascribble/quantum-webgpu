import { createShaderModule } from '../device/module.js';

const { load } = quantum;

export const defaultShaderOptions = {
    entryPoint: 'main'
};

export const loadShaders = async (device, options) => {
    const shaders = [];
    for (const option of options) {
        const module = createShaderModule(device, { code: await load(option.source) });
        const shader = {
            ...defaultShaderOptions,
            ...option, // TODO: Selectively copy properties.
            module
        };

        shaders.push(shader);
    }

    return shaders;
};