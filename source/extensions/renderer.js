import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';
import { encodeCommands } from '../encoder/commands.js';

const { WebGPU } = Quantum;

WebGPU.prototype.render = function (state) {
    const drawable = state.children[0];
    if (!state.pipeline) {
        state.pipeline = createRenderPipeline(this.device, {
            vertex: drawable.vertex,
            fragment: drawable.fragment
        });
    }

    const commnands = [
        {
            passes: [
                {
                    descriptor: {
                        colorAttachments: [
                            {
                                view: createView(this.context),
                                storeOp: 'store',
                                loadValue: {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                    a: 1
                                }
                            }
                        ]
                    },
                    bindGroups: [],
                    pipeline: state.pipeline,
                    draws: [
                        {
                            count: 3,
                            instances: 1,
                            firstElement: 0,
                            firstInstance: 0
                        }
                    ]
                }
            ]
        }
    ]

    this.device.queue.submit(encodeCommands(commnands, this.device, this.context));
};