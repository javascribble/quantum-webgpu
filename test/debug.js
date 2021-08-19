import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-extensions.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-plugins.js';
import '/bundles/main.js';
import '/bundles/main-extensions.js';
import '/bundles/main-plugins.js';

const display = document.querySelector('#display');
const webgpu = document.querySelector('quantum-webgpu');
await webgpu.initialize();

const { load } = quantum;

const path = '/test/resources/';
const resources = ['vertex.wgsl', 'fragment.wgsl', 'scene.json', 'image.png'];
const [vertexShader, fragmentShader, scene, image] = await Promise.all(resources.map(resource => load(path + resource)));
scene.shaders[0].source = vertexShader;
scene.shaders[1].source = fragmentShader;
scene.textures[0].source = image;

const pipeline = webgpu.load(scene);

const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    display.innerHTML = `FPS: ${fps} Count: ${1}`;

    webgpu.draw(pipeline);

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';