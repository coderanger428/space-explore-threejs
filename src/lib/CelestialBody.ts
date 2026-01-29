import * as THREE from "three";

export default class CelestialBody {
  name: string;
  radius: number;
  mass: number;
  texture: THREE.Texture | null = null;
  visited: boolean = false;
  mesh: THREE.Mesh;
  parent: CelestialBody | null = null;

  constructor(
    name: string,
    radius: number,
    mass: number,
    texture: THREE.Texture | null,
    parent: CelestialBody | null = null,
  ) {
    this.name = name;
    this.radius = radius;
    this.mass = mass;
    this.texture = texture;

    this.mesh = this.createMesh();
    this.parent = parent;

    if(this.parent) {
      this.parent.mesh.add(this.mesh);
    }
  }

  createMesh(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    const materialOptions: THREE.MeshStandardMaterialParameters = {};
    if (this.texture) {
      materialOptions.map = this.texture;
    }
    const material = new THREE.MeshStandardMaterial(materialOptions);
    return new THREE.Mesh(geometry, material);
  }

  getDensity(): number {
    const volume = (4 / 3) * Math.PI * Math.pow(this.radius, 3);
    return this.mass / volume;
  }

  update(_delta: number): void {
    // Placeholder for update logic (e.g., position, rotation)
  }
}
