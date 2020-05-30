#version 450

layout(location=0) in vec2 fragmentCoordinate;
layout(location=0) out vec4 fragmentColor;

layout(set=0, binding=1) uniform sampler textureSampler;
layout(set=0, binding=2) uniform texture2D textureData;

void main() 
{
    fragmentColor = texture(sampler2D(textureData, textureSampler), fragmentCoordinate);
}