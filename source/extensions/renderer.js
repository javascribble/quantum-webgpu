import { createCommandEncoder } from '../device/encoder.js';
import { generateCommands } from '../renderer/commands.js';
import { encodeCommand } from '../encoder/command.js';

const { WebGPU } = Quantum;

WebGPU.prototype.render = function (state) {
    const commands = generateCommands(state, this.device, this.context);
    this.device.queue.submit(commands.map(command => encodeCommand(command, createCommandEncoder(this.device, command))));
};