//ConvertingColorsToProperFormat
function normalizeColor(hexCode) {
  const red = (hexCode >> 16) & 255;
  const green = (hexCode >> 8) & 255;
  const blue = 255 & hexCode;
  
  return [red / 255, green / 255, blue / 255];
}

const result = ["SCREEN", "LINEAR_LIGHT"].reduce((hexCodes, value, index) => {
  hexCodes[value] = index;
  return hexCodes;
}, {});
/*EssentialFuntionalityOfWebgl*/

class Material {
  constructor(vertexShaders, fragments, uniforms = {}) {
    const context = _miniGl.gl;
    
    function compileShader(type, source) {
      const shader = context.createShader(type);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error(context.getShaderInfoLog(shader));
      }
      
      _miniGl.debug("Material.compileShaderSource", { source });
      
      return shader;
    }
    
    function getUniformDeclarations(uniforms, type) {
      return Object.entries(uniforms)
        .map(([uniform, value]) => value.getDeclaration(uniform, type))
        .join("\n");
    }
    
    this.uniforms = uniforms;
    this.uniformInstances = [];
    
    const prefix = "\nprecision highp float;\n";
    
    this.vertexSource = `
      ${prefix}
      attribute vec4 position;
      attribute vec2 uv;
      attribute vec2 uvNorm;
      ${getUniformDeclarations(_miniGl.commonUniforms, "vertex")}
      ${getUniformDeclarations(uniforms, "vertex")}
      ${vertexShaders}
    `;
    
    this.source = `
      ${prefix}
      ${getUniformDeclarations(_miniGl.commonUniforms, "fragment")}
      ${getUniformDeclarations(uniforms, "fragment")}
      ${fragments}
    `;
    
    this.vertexShader = compileShader(context.VERTEX_SHADER, this.vertexSource);
    this.fragmentShader = compileShader(context.FRAGMENT_SHADER, this.source);
    
    this.program = context.createProgram();
    context.attachShader(this.program, this.vertexShader);
    context.attachShader(this.program, this.fragmentShader);
    context.linkProgram(this.program);
    
    if (!context.getProgramParameter(this.program, context.LINK_STATUS)) {
      console.error(context.getProgramInfoLog(this.program));
    }
    
    context.useProgram(this.program);
    this.attachUniforms(undefined, _miniGl.commonUniforms);
    this.attachUniforms(undefined, this.uniforms);
  }
}
