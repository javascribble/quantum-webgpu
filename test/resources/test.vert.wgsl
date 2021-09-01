[[block]] struct Uniforms {
    transform : mat4x4<f32>;
};

[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

[[stage(vertex)]]
fn main([[location(0)]] position : vec2<f32>) -> [[builtin(position)]] vec4<f32> {
    return uniforms.transform * vec4<f32>(position, 0.0, 1.0);
}