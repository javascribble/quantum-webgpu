import { WebGPU } from '../elements/webgpu.js';

WebGPU.prototype.drawImage = function (data) {
};

WebGPU.prototype.drawImageTree = function (data) {
    if (!data.hidden) {
        // TODO: TRS

        if (data.image) {
            this.drawImage(data);
        }

        if (data.children?.length) {
            for (const child of data.children) {
                this.drawImageTree(child);
            }
        }
    }
};