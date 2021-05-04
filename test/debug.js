import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/decorators/loaders.js';
import '/source/extensions/node.js';
import '/source/extensions/sprite.js';
import '/source/main.js';

const display = document.querySelector('#display');
const webgpu = document.querySelector('quantum-webgpu');
const image = document.querySelector('img');

const { Node, Sprite, context } = webgpu;

const draw = () => {
    const data = {
        vertices
    };

    const positionBuffer = device.createBuffer({
        size: data.vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });

    positionBuffer.setSubData(0, data.vertices);

    const indexBuffer = createBuffer(device, new Uint16Array(data.indices), GPUBufferUsage.INDEX);

    const vertexUniformBuffer = device.createBuffer({
        size: 128,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    vertexUniformBuffer.setSubData(64, viewProjectionMatrix);

    const fragmentUniformBuffer = device.createBuffer({
        size: 32,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const uniformBindGroupLayout = device.createBindGroupLayout({
        bindings: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                type: "uniform-buffer"
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                type: "uniform-buffer"
            },
            {
                binding: 2,
                visibility: GPUShaderStage.FRAGMENT,
                type: "sampler"
            },
            {
                binding: 3,
                visibility: GPUShaderStage.FRAGMENT,
                type: "sampled-texture"
            }
        ]
    });

    const uniformBindGroup = device.createBindGroup({
        layout: uniformBindGroupLayout,
        bindings: [
            {
                binding: 0,
                resource: {
                    buffer: vertexUniformBuffer
                }
            },
            {
                binding: 1,
                resource: {
                    buffer: fragmentUniformBuffer
                }
            },
            {
                binding: 2,
                resource: sampler
            },
            {
                binding: 3,
                resource: texture.createView()
            }

        ]
    });

    const pipeline = device.createRenderPipeline({
        layout: device.createPipelineLayout({ bindGroupLayouts: [uniformBindGroupLayout] }),
        vertexStage: {
            module: device.createShaderModule({ code: await loadResource('triangle.vert.spv') }),
            entryPoint: "main"
        },
        fragmentStage: {
            module: device.createShaderModule({ code: await loadResource('triangle.frag.spv') }),
            entryPoint: "main"
        },
        primitiveTopology: "triangle-list",
        depthStencilState: {
            format: "depth24plus",
            depthWriteEnabled: true,
            depthCompare: "less"
        },
        vertexState: {
            vertexBuffers: [
                {
                    arrayStride: 12,
                    attributes: [{
                        shaderLocation: 0,
                        format: "float3",
                        offset: 0
                    }]
                },
                {
                    arrayStride: 12,
                    attributes: [{
                        shaderLocation: 1,
                        format: "float3",
                        offset: 0
                    }]
                },
                {
                    arrayStride: 8,
                    attributes: [{
                        shaderLocation: 2,
                        format: "float2",
                        offset: 0
                    }]
                }
            ]
        },
        colorStates: [{
            format: swapChainFormat
        }]
    });

    const depthTexture = device.createTexture({
        size: [canvas.width, canvas.height, 1],
        format: "depth24plus",
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT
    })

    const renderPassDescription = {
        colorAttachments: [{
            attachment: swapChain.getCurrentTexture().createView(),
            loadValue: [0, 0, 0, 1]
        }],
        depthStencilAttachment: {
            attachment: depthTexture.createView(),
            depthLoadValue: 1,
            depthStoreOp: "store",
            stencilLoadValue: 0,
            stencilStoreOp: "store"
        }
    };

    vertexUniformBuffer.setSubData(0, modelMatrix);

    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, positionBuffer);
    renderPass.setVertexBuffer(1, normalBuffer);
    renderPass.setVertexBuffer(2, uvBuffer);
    renderPass.setBindGroup(0, uniformBindGroup);
    renderPass.draw(numVertices, 1, 0, 0);
};

let count = 0;
const root = new Node();
const sprite = new Sprite(image);
const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    for (let i = 0; i < 100; i++) {
        const node = new Node();
        node.children.push(sprite);
        root.children.push(node);
        count++;
    }

    // for (const { transform } of root.children) {
    //     const { translation } = transform;
    //     translation.x = Math.random() * clientWidth * devicePixelRatio;
    //     translation.y = Math.random() * clientHeight * devicePixelRatio;
    // }

    draw();

    display.innerHTML = `FPS: ${fps} Count: ${count}`;

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';