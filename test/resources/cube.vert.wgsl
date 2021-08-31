[[block]] struct Uniforms {
    modelViewProjectionMatrix : [[stride(64)]] array<mat4x4<f32>, 16>;
};

struct VertexOutput {
    [[builtin(position)]] Position : vec4<f32>;
    [[location(1)]] position: vec4<f32>;
    [[location(0)]] uv : vec2<f32>;
};

[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

[[stage(vertex)]]
fn main([[builtin(instance_index)]] instanceIdx : u32, [[location(0)]] position : vec4<f32>, [[location(1)]] uv : vec2<f32>) -> VertexOutput {  
    var output : VertexOutput;
    output.Position = uniforms.modelViewProjectionMatrix[instanceIdx] * position;
    output.position = 0.5 * (position + vec4<f32>(1.0, 1.0, 1.0, 1.0));
    output.uv = uv;
    return output;
}