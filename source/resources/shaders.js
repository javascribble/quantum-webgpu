import { createShaderModule } from '../device/module.js';

const { load } = quantum;

export const defaultShaderOptions = {
    entryPoint: 'main'
};

export const loadShaders = async (device, options) => {
    const shaders = [];
    for (const option of options) {
        const code = await load(option.source);
        const module = createShaderModule(device, { code });
        const shader = {
            ...defaultShaderOptions,
            ...option.descriptor,
            module
        };

        shaders.push(shader);
    }

    return shaders;
};