const testCube = () => {
    const cubeData = {
        vertices,
        normals,
        colors
    };

    const count = cubeData.vertices.length / 3;

    const positionBuffer = device.createBuffer({
        size: cubeData.vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    const normalBuffer = device.createBuffer({
        size: cubeData.normals.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    const uvBuffer = device.createBuffer({
        size: cubeData.colors.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });

    const indexBuffer = createBuffer(device, new Uint16Array(cubeData.indices), GPUBufferUsage.INDEX);
    positionBuffer.setSubData(0, cubeData.vertices);
    normalBuffer.setSubData(0, cubeData.normals);
    uvBuffer.setSubData(0, cubeData.colors);


    const eyePosition = new Float32Array([1, 1, 1]);
    const lightPosition = new Float32Array([1, 1, 1]);

    const viewMatrix = matrix4.create();
    const modelMatrix = matrix4.create();
    const viewProjectionMatrix = matrix4.create();

    const projectionMatrix = matrix4.perspective(Math.PI / 2, canvas.width / canvas.height, 0.1, 10.0)
    matrix4.lookAt(viewMatrix, [0, 0, 0], eyePosition, [0, 1, 0]);
    matrix4.multiply(projectionMatrix, viewMatrix, viewProjectionMatrix);


    const vertexUniformBuffer = device.createBuffer({
        size: 128,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const fragmentUniformBuffer = device.createBuffer({
        size: 32,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    vertexUniformBuffer.setSubData(64, viewProjectionMatrix);
    fragmentUniformBuffer.setSubData(0, eyePosition);
    fragmentUniformBuffer.setSubData(16, lightPosition);

    const sceneUniformBindGroupLayout = device.createBindGroupLayout({
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

    const sceneUniformBindGroup = device.createBindGroup({
        layout: sceneUniformBindGroupLayout,
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
        layout: device.createPipelineLayout({ bindGroupLayouts: [sceneUniformBindGroupLayout] }),
        vertexStage: {
            module: device.createShaderModule({
                code: await loadResource('cube.vert.spv')
            }),
            entryPoint: "main"
        },
        fragmentStage: {
            module: device.createShaderModule({
                code: await loadResource('cube.frag.spv')
            }),
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
    renderPass.setBindGroup(0, sceneUniformBindGroup);
    renderPass.draw(numVertices, 1, 0, 0);
};