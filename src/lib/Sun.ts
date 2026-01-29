import * as THREE from "three";
import CelestialBody from "./CelestialBody";
import PlanetData from "./planet-data.json";

export default class Sun extends CelestialBody {
  light: THREE.PointLight;
  constructor(texture: THREE.Texture | null) {
    // Sun's average radius in kilometers
    super("Sun", PlanetData.Sun.radius, PlanetData.Sun.mass, texture);

    // Emissive material to simulate the Sun's glow
    (this.mesh!.material as THREE.MeshStandardMaterial).emissive =
      new THREE.Color(0xffff00);
    (this.mesh!.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5;

    // Light
    this.light = new THREE.PointLight(0xffffff, 2, 1000);
    this.light.position.set(0, 0, 0);
    this.mesh!.add(this.light);
  }

  update(delta: number): void {
    // The Sun might have a slow rotation
    this.mesh!.rotation.y += 0.0001 * delta;
  }
}
