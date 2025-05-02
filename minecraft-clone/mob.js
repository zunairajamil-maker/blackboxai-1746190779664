import * as THREE from 'three';

export class Mob {
  constructor(scene, blockSize) {
    this.scene = scene;
    this.blockSize = blockSize;
    this.mesh = this.createMesh();
    this.scene.add(this.mesh);
    this.speed = 1 + Math.random();
    this.direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(this.blockSize, this.blockSize * 1.5, this.blockSize);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() * 20 - 10) * this.blockSize,
      this.blockSize * 0.75,
      (Math.random() * 20 - 10) * this.blockSize
    );
    return mesh;
  }

  update(delta) {
    this.mesh.position.addScaledVector(this.direction, this.speed * delta);

    // Simple boundary check and direction change
    if (this.mesh.position.x > 10 * this.blockSize || this.mesh.position.x < -10 * this.blockSize) {
      this.direction.x = -this.direction.x;
    }
    if (this.mesh.position.z > 10 * this.blockSize || this.mesh.position.z < -10 * this.blockSize) {
      this.direction.z = -this.direction.z;
    }
  }
}
