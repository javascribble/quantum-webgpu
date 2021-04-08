import { isValidLine } from '../utilities/strings';
import { parseMtl } from './mtl';

export const parseObj = async (text) => {
    let mesh;
    let meshes = [];
    let materials = [];
    const lines = splitNewLines(text).filter(isValidLine);
    for (const line of lines) {
        const words = line.split(' ');
        switch (words.shift()) {
            case 'mtllib':
                materials = materials.concat(parseMtl(await load(words.shift())));
                break;
            case 'usemtl':
                const materialName = words.shift();
                for (const material of materials) {
                    if (material.name === materialName) {
                        //mesh.colorComponents.push(material.color); 
                        break;
                    }
                }

                break;
            case 'o':
                mesh = {
                    name: words.shift(),
                    vertexIndices: [],
                    normalIndices: [],
                    colorIndices: [],
                    vertices: [],
                    normals: [],
                    colors: []
                };

                meshes.push(mesh);
                break;
            case 'v':
                mesh.vertices.push(words.map(parseFloat));
                break;
            case 'vt':
                mesh.colors.push(words.map(parseFloat));
                break;
            case 'vn':
                mesh.normals.push(words.map(parseFloat));
                break;
            case 'f':
                for (let i = 0; i < 3; i++) {
                    const indices = words.shift().split('/');
                    mesh.normalIndices.push(parseFloat(indices.pop()));
                    mesh.colorIndices.push(parseFloat(indices.pop()));
                    mesh.vertexIndices.push(parseFloat(indices.pop()));
                }

                break;
        }
    }

    return {
        materials,
        meshes
    };
};

export const parseMtl = async (text) => {
    let material;
    const materials = [];
    const lines = splitNewLines(text).filter(isValidLine);
    for (const line of lines) {
        const words = line.split(' ').reverse();
        switch (words.pop()) {
            case 'newmtl':
                material = {
                    name: words.pop()
                };

                materials.push(material);
                break;
            case 'Kd':
                material.color = words.map(parseFloat);
                break;
        }
    }

    return materials;
};