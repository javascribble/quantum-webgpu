[[stage(vertex)]]
fn main([[builtin(vertex_index)]] VertexIndex : u32) -> [[builtin(position)]] vec4<f32> {
  var position = array<vec2<f32>, 3>(vec2<f32>(0.0, 0.5), vec2<f32>(-0.5, -0.5), vec2<f32>(0.5, -0.5));

  return vec4<f32>(position[VertexIndex], 0.0, 1.0);
}