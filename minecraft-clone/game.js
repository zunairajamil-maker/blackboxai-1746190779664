import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { Player } from './player.js';
import { Mob } from './mob.js';
import { UI } from './ui.js';

export class Game {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = null;
    this.player = null;
    this.ui = null;
    this.mobs = [];
    this.clock = new THREE.Clock();
    this.blockSize = 1;
    this.world = new Map();
    this.dayNightCycle = 0;
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new PointerLockControls(this.camera, document.body);
    this.container.addEventListener('click', () => {
      this.controls.lock();
    });

    this.player = new Player(this.camera, this.controls, this);
    this.ui = new UI(this);

    this.setupLights();
    this.generateWorld();
    this.spawnMobs();

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  setupLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directionalLight.position.set(5, 10, 7.5);
    this.scene.add(this.directionalLight);
  }

  generateWorld() {
    // Simple flat world with grass blocks
    const geometry = new THREE.BoxGeometry(this.blockSize, this.blockSize, this.blockSize);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * this.blockSize, 0, z * this.blockSize);
        this.scene.add(cube);
        this.world.set(`${x},0,${z}`, cube);
      }
    }
  }

  spawnMobs() {
    // Spawn a few mobs randomly
    for (let i = 0; i < 5; i++) {
      const mob = new Mob(this.scene, this.blockSize);
      this.mobs.push(mob);
    }
  }

  start() {
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    this.player.update(delta);
    this.mobs.forEach(mob => mob.update(delta));
    this.updateDayNightCycle(delta);

    this.renderer.render(this.scene, this.camera);
  }

  updateDayNightCycle(delta) {
    this.dayNightCycle += delta * 0.1;
    const intensity = (Math.sin(this.dayNightCycle) + 1) / 2 * 0.8 + 0.2;
    this.ambientLight.intensity = intensity;
    this.directionalLight.intensity = intensity;
    this.directionalLight.position.y = 10 * Math.sin(this.dayNightCycle);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
