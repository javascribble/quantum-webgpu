[[block]] struct Uniforms {
    transform : [[stride(64)]] array<mat4x4<f32>, 16>;
};

struct Vertex {
    [[builtin(position)]] Position : vec4<f32>;
};

[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

[[stage(vertex)]]
fn main([[builtin(instance_index)]] instance : u32, [[location(0)]] position : vec4<f32>) -> Vertex {  
    var vertex : Vertex;
    vertex.Position = uniforms.transform[instance] * position;
    return vertex;
}