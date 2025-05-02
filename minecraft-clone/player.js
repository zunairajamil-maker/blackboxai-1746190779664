export class Player {
  constructor(camera, controls, game) {
    this.camera = camera;
    this.controls = controls;
    this.game = game;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;

    this.prevTime = performance.now();

    this.initControls();
  }

  initControls() {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = true;
          break;
        case 'Space':
          if (this.canJump === true) this.velocity.y += 10;
          this.canJump = false;
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.moveForward = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.moveLeft = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.moveBackward = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.moveRight = false;
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  update(delta) {
    const time = performance.now();
    const deltaTime = (time - this.prevTime) / 1000;

    this.velocity.x -= this.velocity.x * 10.0 * deltaTime;
    this.velocity.z -= this.velocity.z * 10.0 * deltaTime;

    this.velocity.y -= 9.8 * 10.0 * deltaTime; // gravity

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * deltaTime;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * deltaTime;

    this.controls.moveRight(-this.velocity.x * deltaTime);
    this.controls.moveForward(-this.velocity.z * deltaTime);

    this.controls.getObject().position.y += this.velocity.y * deltaTime;

    if (this.controls.getObject().position.y < 1.5) {
      this.velocity.y = 0;
      this.controls.getObject().position.y = 1.5;
      this.canJump = true;
    }

    this.prevTime = time;
  }
}
