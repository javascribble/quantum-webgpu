import { setElementParent } from '../../../engine/main';

export const defaultCanvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export const configureCanvas = (canvasOptions) => {
    const options = {
        ...defaultCanvasOptions,
        ...canvasOptions
    }
};

export const createCanvas = (options) => {
    const canvas = document.createElement('canvas');

    if (options.parent) {
        setElementParent(canvas, options.parent);
    }

    if (options.scale) {
        resizeCanvas(canvas, options.scale);
    }

    return canvas;
}

export const getCanvasContext = (canvas, options = canvasOptions) => canvas.getContext('2d', options);

export const getWebGLContext = (canvas, options = canvasOptions) => canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);

export const getWebGPUContext = (canvas) => canvas.getContext('gpupresent');

export const resizeCanvas = (canvas, scale) => {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
};
