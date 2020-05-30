export const defaultShaderOptions = {
    entryPoint: 'main'
};

export const createShader = (options) => ({ ...defaultShaderOptions, ...options });
