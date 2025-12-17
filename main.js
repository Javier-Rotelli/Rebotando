import p5 from "p5/lib/p5";
import GUI from "lil-gui";

import "./style.css";
import { lines } from "./sketches/lines";
import { clock } from "./sketches/clock";
import { clock2 } from "./sketches/clock2";
import { ellipses } from "./sketches/ellipses";
import { hypnotic } from "./sketches/hypnotic";

const gui = new GUI({ title: "" });
gui.close();
window.gui = gui;
const state = {
  sketch: clock2,
  fullscreen: false,
};

gui
  .add(state, "sketch", { lines, clock, clock2, hypnotic, ellipses })
  .onChange((value) => {
    currentSketch.remove();
    currentSketch = new p5(value);
  });

gui.add(state, "fullscreen").onChange((fs) => {
  p5.fullscreen(fs);
});

p5.disableFriendlyErrors = true;
let currentSketch = new p5(state.sketch);

//new p5(hypnotic);
//new p5(clock);
