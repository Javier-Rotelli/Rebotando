/**
 *
 * @param {import("p5").p5InstanceExtensions} p
 */
export function clock2(p) {
  const size = p.min(p.windowWidth, p.windowHeight) / 2;

  p.setup = () => {
    p.createCanvas(p.windowWidth, size * 2);
    p.noStroke();
  };

  const steps = 20;

  const stepSize = size / steps;
  let angle = 0;

  p.draw = () => {
    p.background(p.lerp(128, 220, p.cos(angle)));
    p.fill(p.lerp(128, 220, p.sin(angle)));
    p.translate(size + (p.windowWidth - p.windowHeight) / 2, size);

    for (let i = 0; i < steps; i++) {
      p.rotate((angle * i) / steps);
      p.circle(0, i * stepSize + stepSize / 2, 20);
      //line(0,i * stepSize,0,stepSize+ i * stepSize)
    }

    angle += p.TWO_PI / 600;
  };
}
