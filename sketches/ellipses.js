/**
 *
 * @param {import("p5").p5InstanceExtensions} p
 */
export function ellipses(p) {
  const size = p.min(p.windowWidth, p.windowHeight);
  const state = {
    n: 10,
    alpha: false,
    colorA: [218, 165, 32],
    colorB: [151, 28, 118],
  };

  /**
   * @type {import("lil-gui").GUI}
   */
  const gui = window.gui.addFolder("Ellipses");
  gui.add(state, "n", 2, 50, 1);
  gui.add(state, "alpha");
  gui.addColor(state, "colorA", 255);
  gui.addColor(state, "colorB", 255);

  p.registerMethod("remove", () => {
    gui.destroy();
  });

  p.setup = () => {
    p.createCanvas(size, size);

    p.noFill();
    p.stroke(200);
    p.strokeWeight(10);
    p.describe("");
  };

  let elapsed = 0;

  p.draw = () => {
    let from = p.color(...state.colorA);
    let to = p.color(...state.colorB);
    p.translate(400, 400);

    const n = state.n;
    elapsed += p.deltaTime * 0.001; //seconds
    //elapsed = 1
    p.background(10, state.alpha ? 10 : 255);

    const deltax = (p.sin((elapsed * p.TWO_PI) / 3) + 1) / 2;
    const deltay = (p.cos((elapsed * p.TWO_PI) / 3) + 1) / 2;
    const gap = (800 - 80) / n;

    for (let i = 0; i < n; i++) {
      p.stroke(p.lerpColor(from, to, i / n));
      const r = i * gap;
      const exr = (n - 1 - i) * (gap - 5);
      p.strokeWeight((1 - p.max(deltax, deltay)) * 10 + 3);
      const w = 40 + r + exr * deltax;
      const h = 40 + r + exr * deltay;

      p.ellipse(0, 0, w, h, 50);
    }
  };
}
