import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-plugins.js';
import '/bundles/main.js';
import '/bundles/main-extensions.js';
import '/bundles/main-plugins.js';

const display = document.querySelector('#display');
const webgpu = document.querySelector('quantum-webgpu');
await webgpu.initialize();

const { load } = quantum;

const data = await load('debug.json');
const resources = await webgpu.load(data);

const object = { vertex: resources.shaders[0], fragment: resources.shaders[1], buffer: resources.buffers[0] };
const state = { children: [object] };

webgpu.render(state);
// const animation = quantum.animate(({ delta }) => {
//     const fps = Math.trunc(1000 / delta);

//     display.innerHTML = `FPS: ${fps} Count: ${1}`;

//     webgpu.render(state);

//     if (fps > 0 && fps < 30) {
//         animation.stop();
//         webgpu.unload(resources);
//     }
// });

// animation.start();

document.body.style.visibility = 'visible';