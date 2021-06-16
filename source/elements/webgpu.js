const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

export class WebGPU extends Quantum.Canvas {
    constructor() {
        super();

        this.adapter = adapter;
        this.device = device;
    }

    getContext() {
        return super.getContext('gpupresent');
    }

    resize(event) {
        super.resize();

        const contentBox = event.detail.devicePixelContentBoxSize[0];
        const format = this.context.getPreferredFormat(adapter);
        this.context.configure({
            device,
            format,
            size: {
                width: contentBox.inlineSize,
                height: contentBox.blockSize,
            }
        });
    }
}