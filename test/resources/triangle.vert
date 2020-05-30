#version 450

layout(location=0) in vec2 vertexCoordinate; 
layout(location=1) in vec2 vertexTranslation; 
layout(location=2) in vec2 modelTranslation;
layout(location=3) in float modelRotation;
layout(location=4) in vec2 modelScale;
layout(location=5) in float modelDepth;
layout(location=0) out vec2 fragmentCoordinate; 

layout(set=0, binding=0) uniform Uniforms {
	mat4 projectionView;
};

void main() 
{
	float s = sin(modelRotation);
	float c = cos(modelRotation);
    vec2 scaledTranslation = vertexTranslation * modelScale;
    vec2 rotatedTranslation = vec2(scaledTranslation.x * c + scaledTranslation.y * s, scaledTranslation.y * c - scaledTranslation.x * s);
	gl_Position = projectionView * vec4(rotatedTranslation + modelTranslation, 1, 1);
	
	fragmentCoordinate = vertexCoordinate;
}