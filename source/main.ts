import { Sphere } from "./Entity/Entity/Sphere.js";
import { Renderer } from "./Renderer/Renderer.js";
import { Vector3 } from "./Generic/Vector3.js";
import { Diffuse } from "./Entity/Material/Diffuse.js";

window.addEventListener("load", main);

/**
 * The entry point of the program.
 */
function main(): void {
    const renderer = new Renderer();
    renderer.init();
    renderer.addEntity(new Sphere(new Vector3(0, 0, -4), 2, new Diffuse(new Vector3(1, 0.5, 0.5))));
    renderer.addEntity(new Sphere(new Vector3(0, -102, -4), 100, new Diffuse(new Vector3(0.5, 0.5, 1))));
    renderer.draw();
}