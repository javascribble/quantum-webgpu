export const defaultBindGroupOptions = {
};

export const createBindGroup = (device, options) => device.createBindGroup({ ...defaultBindGroupOptions, ...options });

// const uniformBindGroup = this.device.createBindGroup({
//     layout: pipeline.getBindGroupLayout(0),
//     entries: [
//         {
//             binding: 0,
//             resource: {
//                 buffer: uniformBuffer,
//             },
//         },
//     ],
// });