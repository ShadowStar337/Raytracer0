import { Color } from "./Color.js";
import { Paper } from "./Paper.js";
import { Ray } from "./Ray.js";
import { Position } from "./Kinematics.js";
import { Vector3 } from "./Vector3.js";
import { Direction } from "./Direction.js";
import { Sphere } from "./Entity.js";
import { Renderer } from "./Renderer.js";
 
window.addEventListener("load", main);
function main() {
    const renderer: Renderer = new Renderer();
    renderer.draw();
}

