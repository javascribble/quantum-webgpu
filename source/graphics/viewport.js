export const defaultViewportOptions = {
    x: 0,
    y: 0,
    minDepth: 0,
    maxDepth: 1
};

export const createCanvasViewport = (canvas) => createViewport({ width: canvas.width, height: canvas.height });

export const createViewport = (options) => ({ ...defaultViewportOptions, ...options });