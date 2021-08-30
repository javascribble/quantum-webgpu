import { createView } from '../context/texture.js';
import { createRenderPipeline } from '../device/pipeline.js';

export const generateCommands = (state, device, context) => {
    const drawable = state.children[0];
    if (!state.pipeline) {
        state.pipeline = createRenderPipeline(device, {
            vertex: drawable.vertex,
            fragment: drawable.fragment
        });
    }

    const commands = [
        {
            passes: [
                {
                    descriptor: {
                        colorAttachments: [
                            {
                                view: createView(context),
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
    ];

    return commands;
};