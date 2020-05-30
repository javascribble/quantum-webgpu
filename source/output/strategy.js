//import { orthographicMatrix4 } from '../../graphics/main';
import { bufferData, createIndexBuffer, createUniformBuffer, createVertexBuffer } from './buffers';
import { createDepthTexture, createSampledTexture } from './textures';
import { createCanvasViewport } from './viewport';
import { createPipelineLayout } from './layouts';
import { createShaderModule } from './modules';
import { createProgram } from './programs';
import { createSampler } from './samplers';
import { createShader } from './shaders';

export const updateStrategy = (commands, targets, adds, deletes) => {
    for (const renderable of adds) {
        const scene = renderable;
        const resources = scene.resources;
        const buffers = resources.buffers;
        const renderPassDescriptor = resources.passes.defaultRenderPass;
        const textureResource = resources.textures.defaultTexture.sprites[0];
        const { canvas, swapChain } = targets[0];

        const imageSize = [
            textureResource.imageBitmap.width,
            textureResource.imageBitmap.height,
            1
        ];

        const sampler = createSampler(device);
        const texture = createSampledTexture(device, { size: imageSize });

        const gpuImageBitmapCopyView = {
            imageBitmap: textureResource.imageBitmap,
            origin: { x: 0, y: 0 }
        };

        const gpuTextureCopyView = { texture };

        device.defaultQueue.copyImageBitmapToTexture(gpuImageBitmapCopyView, gpuTextureCopyView, imageSize);

        //const viewProjectionMatrix = orthographicMatrix4(100, canvas.width / canvas.height);
        const vertexUniformBuffer = createUniformBuffer(device, { size: viewProjectionMatrix.byteLength });
        bufferData(vertexUniformBuffer, 0, viewProjectionMatrix);

        const uniformBindGroupLayout = device.createBindGroupLayout(scene.resources.layouts.defaultLayout);

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
                    resource: sampler
                },
                {
                    binding: 2,
                    resource: texture.createView()
                }

            ]
        });

        const programOptions = {
            layout: createPipelineLayout(device, { bindGroupLayouts: [uniformBindGroupLayout] }),
            vertexStage: createShader({ module: createShaderModule(device, { code: resources.shaders.defaultVertexShader }) }),
            fragmentStage: createShader({ module: createShaderModule(device, { code: resources.shaders.defaultFragmentShader }) }),
            ...resources.programs.defaultProgram
        };

        const program = createProgram(programOptions);
        const pipeline = device.createRenderPipeline(program);

        const depthTextureDescriptor = {
            format: 'depth24plus-stencil8',
            size: {
                width: canvas.width,
                height: canvas.height,
                depth: 1
            }
        };

        renderPassDescriptor.depthStencilAttachment.attachment = createDepthTexture(device, depthTextureDescriptor).createView();
        renderPassDescriptor.colorAttachments[0].attachment = renderer.swapChain.getCurrentTexture().createView();

        const entities = scene.entities;
        const count = entities.length;
        const modelTransformations = new Float32Array(count * 6);
        const staticData = new Float32Array(buffers.staticBuffer.data);
        const staticDataBuffer = createVertexBuffer(device, { size: staticData.byteLength });
        const modelTransformationsBuffer = createVertexBuffer(device, { size: modelTransformations.byteLength });
        const vertexBuffers = [
            staticDataBuffer,
            modelTransformationsBuffer
        ];

        bufferData(staticDataBuffer, 0, staticData);

        const indexData = new Uint16Array(buffers.staticBuffer.indices);
        const indexBuffer = createIndexBuffer(device, { size: indexData.byteLength });
        bufferData(indexBuffer, 0, indexData);

        for (let i = 0; i < count; i++) {
            const entity = entities[i];
            entity.bufferIndex = i * 6;
            entity.data = modelTransformations;
            entity.buffer = modelTransformationsBuffer;
        }

        const command = {
            passes: [
                {
                    descriptor: renderPassDescriptor,
                    pipeline,
                    viewport: createCanvasViewport(canvas),
                    scissorRect: {
                        x: 0,
                        y: 0,
                        width: canvas.width,
                        height: canvas.height
                    },
                    bindGroups: [uniformBindGroup],
                    vertexBuffers,
                    indexBuffer,
                    draws: [
                        {
                            indexed: true,
                            count: 4,
                            instances: count,
                            firstElement: 0,
                            firstInstance: 0,
                            baseVertex: 0
                        }
                    ]
                }
            ]
        };

        commands.set('default', command);
    }
};