import { Position } from "./Geometry/Position.js";
import { Sphere } from "./Entity/Sphere.js";
import { Renderer } from "./Renderer/Renderer.js";

window.addEventListener("load", main);
function main(): void {
    const renderer = new Renderer();
    renderer.addEntity(new Sphere(new Position(0, 0, -4), 2));
    renderer.addEntity(new Sphere(new Position(0, -102, -4), 100));
    renderer.draw();
}
