const { loaders } = quantum;

loaders.spv = (url, options) => fetch(url, options).then(response => new Uint32Array(response.arrayBuffer()));