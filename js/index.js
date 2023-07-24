// Obtener el elemento canvas y su contexto
const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");

// Función para calcular el ángulo de inclinación
function calculateAngle(degrees) {
  return (degrees * Math.PI) / 180;
}

// Función para calcular los colores del gradiente
function calculateGradientColors() {
  const time = Date.now();
  const color1 = Math.round(127 + 127 * Math.sin(time * 0.001));
  const color2 = Math.round(
    127 + 127 * Math.sin(time * 0.001 + (2 * Math.PI) / 3)
  );
  const color3 = Math.round(
    127 + 127 * Math.sin(time * 0.001 + (4 * Math.PI) / 3)
  );
  return [
    `rgb(${color1}, 0, 0)`,
    `rgb(0, ${color2}, 0)`,
    `rgb(0, 0, ${color3})`,
  ];
}

// Función para calcular el gradiente con animación
function updateGradientColors() {
  const angleDeg = -10;
  const gradientColors = calculateGradientColors();
  const gradient = createLinearGradient(angleDeg, gradientColors);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(updateGradientColors);
}

// Función para crear un gradiente lineal
function createLinearGradient(angleDeg, colors) {
  const angleRad = calculateAngle(angleDeg);
  const startX = 0;
  const startY = canvas.height;
  const endX = canvas.width;
  const endY = canvas.height * 0.3; // Puedes ajustar la altura del gradiente aquí

  const centerX = (startX + endX) / 2;
  const centerY = (startY + endY) / 2;
  const diffX = endX - startX;
  const diffY = endY - startY;

  const rotatedStartX =
    centerX + diffX * Math.cos(angleRad) - diffY * Math.sin(angleRad);
  const rotatedStartY =
    centerY + diffX * Math.sin(angleRad) + diffY * Math.cos(angleRad);

  const rotatedEndX =
    centerX - diffX * Math.cos(angleRad) - diffY * Math.sin(angleRad);
  const rotatedEndY =
    centerY - diffX * Math.sin(angleRad) + diffY * Math.cos(angleRad);

  const gradient = ctx.createLinearGradient(
    rotatedStartX,
    rotatedStartY,
    rotatedEndX,
    rotatedEndY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);

  return gradient;
}

// Función para ajustar el tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.3; // El canvas ocupará el 30% de la altura
}

// Ajustar el tamaño del canvas al tamaño del viewport y reiniciar la animación
resizeCanvas();
updateGradientColors();

// Actualizar el tamaño del canvas en caso de redimensionar la ventana
window.addEventListener("resize", resizeCanvas);
