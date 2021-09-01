// [[stage(vertex)]]
// fn main([[builtin(vertex_index)]] VertexIndex : u32) -> [[builtin(position)]] vec4<f32> {
//     var position = array<vec2<f32>, 4>(vec2<f32>(-0.5, -0.5), vec2<f32>(0.5, -0.5), vec2<f32>(-0.5, 0.5), vec2<f32>(0.5, 0.5));
//     return vec4<f32>(position[VertexIndex], 0.0, 1.0);
// }


[[stage(vertex)]]
fn main([[location(0)]] position : vec2<f32>) -> [[builtin(position)]] vec4<f32> {
    return vec4<f32>(position, 0.0, 1.0);
}


// [[block]] struct Uniforms {
//     transform : [[stride(64)]] array<mat4x4<f32>, 16>;
// };

// struct Vertex {
//     [[builtin(position)]] Position : vec4<f32>;
// };

// [[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

// [[stage(vertex)]]
// fn main([[builtin(instance_index)]] instance : u32, [[location(0)]] position : vec4<f32>) -> Vertex {  
//     var vertex : Vertex;
//     vertex.Position = uniforms.transform[instance] * position;
//     return vertex;
// }