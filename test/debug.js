import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-extensions.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-plugins.js';
import '/bundles/main.js';
import '/bundles/main-extensions.js';
import '/bundles/main-plugins.js';

const display = document.querySelector('#display');
const webgpu = document.querySelector('quantum-webgpu');

const { load } = quantum;
const { context, adapter, device } = webgpu;

const path = '/test/resources/';
const resources = ['vertex.wgsl', 'fragment.wgsl', 'scene.json', 'image.png'];
const [vertexShader, fragmentShader, scene, image] = await Promise.all(resources.map(resource => load(path + resource)));

const format = context.getPreferredFormat(adapter);
const pipeline = device.createRenderPipeline({
    vertex: {
        module: device.createShaderModule({ code: vertexShader }),
        entryPoint: 'main',
    },
    fragment: {
        module: device.createShaderModule({ code: fragmentShader }),
        entryPoint: 'main',
        targets: [
            {
                format,
            },
        ]
    },
    primitive: {
        topology: 'triangle-list'
    }
});

const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    display.innerHTML = `FPS: ${fps} Count: ${1}`;

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPassDescriptor = {
        colorAttachments: [
            {
                storeOp: 'store',
                loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                view: textureView
            }
        ]
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.endPass();
    device.queue.submit([commandEncoder.finish()]);

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();