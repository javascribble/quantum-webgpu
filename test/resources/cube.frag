#version 450

layout(location=0) in vec3 vPosition;
layout(location=1) in vec3 vNormal;
layout(location=2) in vec2 vUV;

layout(set=0, binding=1) uniform FragmentUniforms {
	vec4 eyePosition;
	vec4 lightPosition;
};

layout(set=0, binding=2) uniform sampler textureSampler;
layout(set=0, binding=3) uniform texture2D textureData;

layout(location=0) out vec4 fragColor;

void main() {
	vec3 surfaceColor = texture(sampler2D(textureData, textureSampler), vUV).rgb;

	vec3 normal = normalize(vNormal);
	vec3 eyeVec = normalize(eyePosition.xyz - vPosition);
	vec3 incidentVec = normalize(vPosition - lightPosition.xyz);
	vec3 lightVec = -incidentVec;
	float diffuse = max(dot(lightVec, normal), 0.0);
	float highlight = pow(max(dot(eyeVec, reflect(incidentVec, normal)), 0.0), 100.0);
	float ambient = 0.1;
	fragColor = vec4(surfaceColor * (diffuse + highlight + ambient), 1.0);
}