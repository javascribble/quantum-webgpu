export class WebGPU extends Quantum.Canvas {
    getContext() {
        return super.getContext('gpupresent');
    }
}