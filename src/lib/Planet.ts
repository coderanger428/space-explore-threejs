import * as THREE from "three";
import CelestialBody from "./CelestialBody.js";
export default class Planet extends CelestialBody {
  distance: number;
  angle: number;
  orbitSpeed: number;
  constructor(
    name: string,
    radius: number,
    mass: number,
    distance: number,
    orbitSpeed: number,
    texture: THREE.Texture | null,
    parent: CelestialBody | null = null,
  ) {
    super(name, radius, mass, texture || null, parent);
    this.distance = distance;
    this.parent = parent; // Sun or planet for moons
    this.angle = Math.random() * Math.PI * 2;
    this.orbitSpeed = orbitSpeed;
  }

  update(delta: number): void {
    this.angle += this.orbitSpeed * delta;
    this.mesh.position.x = Math.cos(this.angle) * this.distance;
    this.mesh.position.z = Math.sin(this.angle) * this.distance;
  }
}
