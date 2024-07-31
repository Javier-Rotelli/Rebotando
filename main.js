import p5 from "p5/lib/p5";
import GUI from "lil-gui";

import "./style.css";
import { lines } from "./sketches/lines";
import { clock } from "./sketches/clock";
import { hypnotic } from "./sketches/hypnotic";

const gui = new GUI();

const state = {
  sketch: lines,
};

let currentSketch = new p5(lines);

gui.add(state, "sketch", { lines, clock, hypnotic }).onChange((value) => {
  currentSketch.remove();
  currentSketch = new p5(value);
});

//new p5(hypnotic);
//new p5(clock);
