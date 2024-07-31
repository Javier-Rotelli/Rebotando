/**
 *
 * @param {import("p5").p5InstanceExtensions} p
 */
export function clock(p) {
  const size = p.min(p.windowWidth, p.windowHeight) / 2;

  p.setup = () => {
    p.createCanvas(size * 2, size * 2);
    p.colorMode(p.HSB);
  };

  const steps = 10;

  let angle = 1.5;
  const stepSize = size / steps;

  p.draw = () => {
    let colorA = p.color(angle % 360, 90, 100);
    let colorB = p.color(360 - (angle % 360), 80, 50);

    // Draw stripe

    p.background(0, 0.02);
    p.translate(size, size);

    p.beginShape();
    p.noFill();

    for (let i = 0; i < steps; i++) {
      let betweenColor = p.lerpColor(colorA, colorB, i / steps);
      p.stroke(betweenColor);
      const stAngle = (angle * (i + 1)) / steps;
      const r = i * stepSize;
      const co = p.cos(stAngle);
      const si = p.sin(stAngle);

      const x = -r * si;
      const y = r * co;

      //curvep.Vertex(x,y)
      p.vertex(x, y);
      p.rotate(stAngle);
      p.line(0, i * stepSize, 0, stepSize + i * stepSize);
      p.rotate(-stAngle);
    }
    p.endShape();
    angle += p.TWO_PI / 60;
  };
}
