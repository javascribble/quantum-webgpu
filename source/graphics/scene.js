import { encodeCommand } from '../graphics/command.js';

export const encodeScene = (device, scene) => {
    const commands = [];
    for (const command of scene.commands) {
        commands.push(encodeCommand(device, command));
    }

    return commands;
};