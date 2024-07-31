const colors = [
  "30362f",
  "625834",
  "a59132",
  "fffbdb",
  "da7422",
  "a1e8af",
  "d4d2d5",
  "e3dbdb",
  "947eb0",
  "a3a5c3",
];

export function hypnotic(p5) {
  let size = 100;
  const finalSize = 10;
  const offset = 2;
  let tileStep = (size - offset * 2) / 7;
  let startSize = tileStep;
  const directions = [-1, 0, 1];
  let startSteps;

  p5.setup = () => {
    size = p5.windowWidth;

    tileStep = (size - offset * 2) / 7;
    startSize = tileStep;
  };

  const draw = (x, y, width, height, xMovement, yMovement, steps) => {
    p5.stroke("#" + colors[Math.floor(p5.noise(x, y) * colors.length)]);
    p5.rect(x, y, width, height);

    if (steps >= 0) {
      const newSize = startSize * (steps / startSteps) + finalSize;
      let newX = x + (width - newSize) / 2;
      let newY = y + (height - newSize) / 2;
      newX = newX - ((x - newX) / (steps + 2)) * xMovement;
      newY = newY - ((y - newY) / (steps + 2)) * yMovement;

      draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
    }
  };

  p5.draw = () => {
    for (let x = offset; x < size - offset; x += tileStep) {
      for (let y = offset; y < size - offset; y += tileStep) {
        startSteps = 2 + Math.ceil(Math.random() * 3);
        const xDirection =
          directions[Math.floor(Math.random() * directions.length)];
        const yDirection =
          directions[Math.floor(Math.random() * directions.length)];
        draw(
          x,
          y,
          startSize,
          startSize,
          xDirection,
          yDirection,
          startSteps - 1
        );
      }
    }
  };
}
