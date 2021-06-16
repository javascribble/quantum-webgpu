let dummy : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
    vec2<f32>(0.0, 0.5),
    vec2<f32>(-0.5, -0.5),
    vec2<f32>(0.5, -0.5)
);

[[stage(vertex)]]
fn main([[builtin(vertex_index)]] index : u32) -> [[builtin(position)]] vec4<f32> {
  return vec4<f32>(dummy[index], 0.0, 1.0);
}