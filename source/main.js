//export * from './components';
//export * from './entities';

import { enableRenderableSystem } from './systems/renderable';
import { enableRendererSystem } from './systems/renderer';
import { plugins } from '../../engine/main';

plugins.video = async (options) => {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    enableRenderableSystem(options, device);
    await enableRendererSystem(options, device);
}; 