import '/node_modules/@javascribble/quantum/source/main.js';
import '/source/main.js';

const source = document.querySelector('img');
const webgpu = document.querySelector('quantum-webgpu');

webgpu.addEventListener('resize', event => {
    webgpu.setResolution();
    webgpu.drawImage({
        source,
        sx: 0,
        sy: 0,
        sw: source.width,
        sh: source.height,
        dx: 100,
        dy: 100,
        dw: source.width,
        dh: source.height
    });
});

document.body.style.visibility = 'visible';