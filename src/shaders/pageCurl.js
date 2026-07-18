// Page curl vertex shader
export const pageCurlVertexShader = /* glsl */ `
  uniform float uBend;    // 0 = flat, 1 = fully curled inward
  uniform float uWidth;   // geometry width

  varying vec2 vUv;
  varying float vFogDepth;

  #define PI 3.14159265359

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Cylindrical page-curl: only applies along the X axis (page-turn direction)
    float t = (pos.x / uWidth + 0.5); // 0 at left edge, 1 at right edge
    float angle = t * uBend * PI;     // angular sweep up to PI (180 deg)

    float radius = uWidth / PI;       // radius of the cylinder

    // Cylindrical coordinates
    float cx = sin(angle) * radius - radius + pos.x; // offset to keep left edge fixed
    float cz = -cos(angle) * radius + radius;         // depth displacement

    // Blend: at uBend=0 pos.x stays, at uBend=1 full cylinder
    pos.x = mix(pos.x, cx, uBend);
    pos.z = mix(pos.z, cz, uBend);

    vFogDepth = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Page curl fragment shader
export const pageCurlFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uBend;
  uniform float uShadow;

  varying vec2 vUv;
  varying float vFogDepth;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Edge shadow on the right side during curl
    float edgeDist = 1.0 - vUv.x;
    float shadow = smoothstep(0.0, 0.35, edgeDist) * uBend * 0.5;

    // Spine shadow on the left side
    float spineShadow = (1.0 - smoothstep(0.0, 0.08, vUv.x)) * uBend * 0.4;

    vec3 color = texColor.rgb * (1.0 - shadow - spineShadow);

    // Back face: show light grey/cream paper color
    if (!gl_FrontFacing) {
      color = vec3(0.96, 0.93, 0.87); // cream paper back
    }

    gl_FragColor = vec4(color, texColor.a);
  }
`;
