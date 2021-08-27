export const configureComputePass = (pass, encoder) => {
    const computePass = encoder.beginComputePass(pass.descriptor);

    const { pipeline, bindGroups } = pass;
    computePass.setPipeline(pipeline);
    if (bindGroups) {
        for (let i = 0; i < bindGroups.length; i++) {
            computePass.setBindGroup(i, bindGroups[i]);
        }
    }

    computePass.dispatch();

    computePass.endPass();
};