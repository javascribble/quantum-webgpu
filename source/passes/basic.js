export const configureBasicPass = (pass, options) => {
    const { pipeline, bindGroups } = options;
    pass.setPipeline(pipeline);
    if (bindGroups) {
        for (let i = 0; i < bindGroups.length; i++) {
            pass.setBindGroup(i, bindGroups[i]);
        }
    }
};