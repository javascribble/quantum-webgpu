import { updates, systems } from '../../../engine/main';
import { createCanvas } from './api/canvas';
import { createSwapChain } from './api/context';
import { encodeCommand } from './api/commands';
import { updateStrategy } from './api/strategy';
import { renderableComponent } from '../network/renderable';

const defaultRendererOptions = {
    scale: devicePixelRatio,
    parent: document.body
};

export const enableRendererSystem = async (rendererOptions) => {
    const options = {
        ...defaultRendererOptions,
        ...rendererOptions
    };

    const adds = new Set();
    const deletes = new Set();
    const commands = new Map();
    const targets = new Map();

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    for (const canvas of options.canvases || [createCanvas(options)]) {
        const swapChain = await createSwapChain(device, canvas);
        targets.set(canvas.name, { canvas, swapChain });
    }

    systems.add({
        components: [renderableComponent],
        add: (entity) => {
            adds.add(entity.renderable);
        },
        delete: (entity) => {
            deletes.add(entity.renderable);
        }
    });

    updates.push((deltaTime) => {
        for (const target of targets.values()) {
            target.texture = target.swapChain.getCurrentTexture().createView();
        }

        if (adds.size > 0 || deletes.size > 0) {
            updateStrategy(commands, targets, adds, deletes);
            adds.clear();
            deletes.clear();
        }

        const encodedCommands = [];
        for (const command of commands.values()) {
            encodedCommands.push(encodeCommand(device, command));
        }

        // TODO: Support multiple queues.
        device.defaultQueue.submit(encodedCommands);
    });
};