[[group(0), binding(1)]] var sample: sampler;
[[group(0), binding(2)]] var texture: texture_2d<f32>;

[[stage(fragment)]]
fn main([[builtin(position)]] position : vec4<f32>, [[location(0)]] uv: vec2<f32>) -> [[location(0)]] vec4<f32> {
    return textureSample(texture, sample, uv);
}