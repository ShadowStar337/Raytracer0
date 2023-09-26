import { Position } from "./Geometry/Position.js";
import { Sphere } from "./Entity/Sphere.js";
import { Renderer } from "./Renderer/Renderer.js";
import { Vector3 } from "./Generic/Vector3.js";

window.addEventListener("load", main);
function main(): void {
    const renderer = new Renderer();
    renderer.addEntity(new Sphere(new Vector3(0, 0, -4), 2));
    renderer.addEntity(new Sphere(new Vector3(0, -102, -4), 100));
    renderer.draw();
}
