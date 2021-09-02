[[block]] struct Uniforms {
    transform : mat4x4<f32>;
};

[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

struct Vertex {
  [[builtin(position)]] position : vec4<f32>;
  [[location(0)]] uv : vec2<f32>;
};

[[stage(vertex)]]
fn main([[location(0)]] position : vec3<f32>, [[location(1)]] uv : vec2<f32>) -> Vertex {
    var vertex = Vertex();
    vertex.position = uniforms.transform * vec4<f32>(position, 1.0);
    vertex.uv = uv;
    return vertex;
}