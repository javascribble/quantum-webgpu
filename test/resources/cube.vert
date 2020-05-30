#version 450

layout(location=0) in vec4 position;
layout(location=1) in vec3 normal;
layout(location=2) in vec2 uv;

layout(set=0, binding=0) uniform VertexUniforms {
	mat4 worldMatrix;
	mat4 viewProjectionMatrix;
};

layout(location=0) out vec3 vPosition;
layout(location=1) out vec3 vNormal;
layout(location=2) out vec2 vUV;

void main() {
	vec4 worldPosition = worldMatrix * position;
	vPosition = worldPosition.xyz;
	vNormal = mat3(worldMatrix) * normal;
	vUV = uv;
	gl_Position = viewProjectionMatrix * worldPosition;
}