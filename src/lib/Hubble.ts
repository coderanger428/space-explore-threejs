import * as THREE from "three";
import type CelestialBody from "./CelestialBody";

export default class Hubble {
  camera: THREE.PerspectiveCamera;
  planet!: CelestialBody;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number = 0;
  yaw: number = 0;
  sceneWidth: number = 0;
  constructor(
    planet: CelestialBody,
    orbitRadius: number,
    sceneWidth: number,
    orbitSpeed: number = 0.2,
    fov: number = 60,
    aspectRatio: number = 1,
    near: number = 0.1,
    far: number = 10000,
  ) {
    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    this.planet = planet;
    this.orbitRadius = orbitRadius;
    this.sceneWidth = sceneWidth;
    this.orbitSpeed = orbitSpeed;

    window.addEventListener("mousemove", (ev) => {
      const mouseX = ev.clientX;
      this.yaw =
        (2 * Math.PI * (mouseX - this.sceneWidth / 2)) / this.sceneWidth;
    });
  }

  update(delta: number) {
    this.orbitAngle += this.orbitSpeed * delta;
    if (this.orbitAngle > Math.PI * 2) this.orbitAngle -= Math.PI * 2;
    this.camera.position.x =
      this.planet.mesh.position.x +
      this.orbitRadius * Math.cos(Math.PI * this.orbitAngle);
    this.camera.position.z =
      this.planet.mesh.position.z +
      this.orbitRadius * Math.sin(Math.PI * this.orbitAngle);

    // 1. base direction: camera → planet
    const baseDir = this.planet.mesh.position
      .clone()
      .sub(this.camera.position)
      .normalize();

    // 2. rotate around Y (yaw only)
    const rotatedDir = baseDir.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      this.yaw,
    );

    // 3. look forward
    const target = this.camera.position.clone().add(rotatedDir);
    this.camera.lookAt(target);
  }
}
