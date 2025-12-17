/**
 *
 * @param {import("p5").p5InstanceExtensions} p5
 */
export function lines(p5) {
  const size = p5.windowWidth;
  const step = 30;
  const leftToRight = [];

  const drawLine = (x, y, width, height, amt) => {
    const hWidth = width / 2;
    const hHeight = height / 2;

    p5.translate(x + hWidth, y + hHeight);

    amt = p5.fract(amt * leftToRight[x][y]);
    let angle = p5.lerp(0, p5.PI, amt);
    if (leftToRight[x][y] > 0) {
      angle += p5.HALF_PI;
    }

    const rotation = angle;

    const co = p5.cos(rotation);
    const si = p5.sin(rotation);

    let x1 = -hWidth;
    let y1 = hHeight;

    let x1r = x1 * co - y1 * si;
    let y1r = y1 * co + x1 * si;

    let x2 = hWidth;
    let y2 = -hHeight;

    let x2r = x2 * co - y2 * si;
    let y2r = y2 * co + x2 * si;

    // line(x1,y1,x2,y2)
    x1r = p5.constrain(x1r, -hWidth, hWidth);
    x2r = p5.constrain(x2r, -hWidth, hWidth);
    y1r = p5.constrain(y1r, -hHeight, hHeight);
    y2r = p5.constrain(y2r, -hHeight, hHeight);

    p5.line(x1r, y1r, x2r, y2r);
    p5.resetMatrix();
  };

  const speeds = [1, 2, 4, 8];

  p5.setup = () => {
    p5.frameRate(30);
    p5.createCanvas(size, size);
    p5.strokeWeight(2);
    for (let x = 0; x < size; x += step) {
      leftToRight[x] = [];
      for (let y = 0; y < size; y += step) {
        const direction = Math.random() >= 0.5 ? 1 : -1;
        const speed = p5.random(speeds);
        // const direction = p5.noise(x, y) >= 0.5 ? 1 : -1
        // const speed = speeds[Math.floor(p5.noise(x, y) * speeds.length)]
        leftToRight[x][y] = speed * direction;
      }
    }
  };

  let elapsedTime = 0;
  let rotating = true;
  const interval = 60; //segundos rotando

  p5.draw = () => {
    p5.background(253, 250, 254);

    elapsedTime += p5.deltaTime / 1000;
    let rotation = 0;
    if (rotating == true) {
      rotation = elapsedTime;
      if (elapsedTime > interval) {
        elapsedTime = 0;
        rotation = 0;
        rotating = false;
      }
    } else if (elapsedTime > 1) {
      elapsedTime = 0;
      rotating = true;
    }

    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        drawLine(x, y, step, step, rotation / interval);
      }
    }
  };
}
