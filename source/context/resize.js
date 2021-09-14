export function resize() {
    const { scale, context, adapter } = this;
    const { canvas } = context;
    const { clientWidth, clientHeight } = canvas;

    const size = { width: clientWidth * scale, height: clientHeight * scale };
    const format = context.getPreferredFormat(adapter);

    Object.assign(this, { size, format });
    //Object.assign(canvas, size);

    context.configure(this);
}