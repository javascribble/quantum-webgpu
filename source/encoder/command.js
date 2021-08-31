import { encodePass } from './pass.js';

export const encodeCommand = (command, encoder) => {
    const { descriptor, passes } = command;
    for (const pass of passes) {
        encodePass(pass, encoder);
    }

    return encoder.finish(descriptor);
};