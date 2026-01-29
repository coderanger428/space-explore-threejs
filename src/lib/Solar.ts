import * as THREE from "three";
import Sun from "./Sun";
import Planet from "./Planet";
import PlanetDataJSON from "./planet-data.json";
import type CelestialBody from "./CelestialBody";

interface PlanetType {
  radius: number;
  mass: number;
  distance: number;
  orbitSpeed: number;
  satellites?: Record<string, PlanetType>;
}
interface PlanetDictionary {
  [key: string]: PlanetType;
}

const PlanetData: PlanetDictionary = PlanetDataJSON as PlanetDictionary;

export default class Solar {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;

  sun!: Sun;
  planets: Planet[] = [];

  constructor(container: HTMLElement) {
    // Core
    this.scene = new THREE.Scene();

    //this.scene.background = new THREE.Color(0x000000);
    this.scene.background = new THREE.TextureLoader().load(
      "textures/2k_stars_milky_way.jpg",
    );

    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      10000,
    );

    this.camera.position.set(30, 30, 30);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.initLights();
    this.initSolarSystem();
    this.initResize(container);

    this.loop();
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(10, 10, 10);

    this.scene.add(ambient);
    this.scene.add(dir);
  }

  initSolarSystem() {
    // Sun
    this.sun = new Sun(new THREE.TextureLoader().load("textures/2k_sun.jpg"));
    this.scene.add(this.sun.mesh);

    // Helper to create planets and satellites recursively
    const createBody = (
      name: string,
      parent: CelestialBody | null = this.sun,
    ): Planet[] => {
      const data: PlanetType = PlanetData[name];
      if (!data) return [];

      const planet = new Planet(
        name,
        data.radius,
        data.mass,
        data.distance,
        data.orbitSpeed || 0.01, // default if not defined
        new THREE.TextureLoader().load(`textures/2k_${name.toLowerCase()}.jpg`),
        parent,
      );

      const bodies: Planet[] = [planet];

      // Recursively add satellites
      if (data.satellites) {
        for (const satName of Object.keys(data.satellites)) {
          const satData = data.satellites[satName];
          const satellite = new Planet(
            satName,
            satData.radius,
            satData.mass,
            satData.distance,
            satData.orbitSpeed || 0.05,
            new THREE.TextureLoader().load(
              `textures/2k_${satName.toLowerCase()}.jpg`,
            ),
            planet,
          );
          bodies.push(satellite);
        }
      }

      return bodies;
    };

    // Loop through all top-level planets in PlanetData except Sun
    for (const name of Object.keys(PlanetData)) {
      if (name === "Sun") continue;
      const bodies = createBody(name);
      this.planets.push(...bodies);
    }
  }

  loop = () => {
    requestAnimationFrame(this.loop);

    const delta = this.clock.getDelta();

    this.update(delta);
    this.render();
  };

  update(delta: number) {
    this.sun.update(delta);
    for (const p of this.planets) {
      p.update(delta);
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  initResize(container: HTMLElement) {
    window.addEventListener("resize", () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }
}
