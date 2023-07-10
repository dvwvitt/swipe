function normalizeColor(hexCode) {
    const red = parseInt(hexCode.slice(1, 3), 16) / 255;
    const green = parseInt(hexCode.slice(3, 5), 16) / 255;
    const blue = parseInt(hexCode.slice(5, 7), 16) / 255;
  
    return [red, green, blue];
  }
  