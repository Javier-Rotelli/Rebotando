import p5 from "p5/lib/p5";
import GUI from "lil-gui";

import "./style.css";
import { lines } from "./sketches/lines";
import { clock } from "./sketches/clock";
import { hypnotic } from "./sketches/hypnotic";

const gui = new GUI({ title: "" });
gui.close();
window.gui = gui;
const state = {
  sketch: clock,
};

gui.add(state, "sketch", { lines, clock, hypnotic }).onChange((value) => {
  currentSketch.remove();
  currentSketch = new p5(value);
});

p5.disableFriendlyErrors = true;
let currentSketch = new p5(state.sketch);

//new p5(hypnotic);
//new p5(clock);
