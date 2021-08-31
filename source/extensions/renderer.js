import { encodeCommands } from '../encoder/commands.js';
import { generateCommands } from '../renderer/commands.js';

const { WebGPU } = Quantum;

WebGPU.prototype.render = function (state) {
    const commands = generateCommands(state, this.device, this.context);
    this.device.queue.submit(encodeCommands(commands, this.device));
};