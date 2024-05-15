// // COLORS
// var Colors = {
//   red: 0xff0800,
//   white: 0xd8d0d1,
//   pink: 0xFF007F,
//   brown: 0x59332e,
//   brownDark: 0x23190f,
//   blue: 0x3A9B3B,
// };

// // THREEJS RELATED VARIABLES
// var scene, camera, fieldOfView, aspectRatio, renderer, container;
// var group;

// // SCREEN VARIABLES
// var HEIGHT, WIDTH;

// // WORLD AND BALLS
// var cylinderRadius = 600;  // Radius of the cylinder
// var cylinderHeight = 800;  // Height of the cylinder
// var cubeSize = 50;         // Size of the cube
// var numBalls = 1;          // Number of balls
// var balls = [];            // Array to store the balls
// var ballRadius = 10;       // Radius of the ball
// var bounceHeight = 60;     // Maximum height of the bounce
// var bounceSpeed = 0.00005; // Speed of the bounce
// var step = 0;

// // INIT THREE JS, SCREEN AND MOUSE EVENTS
// function createScene() {
//   HEIGHT = window.innerHeight;
//   WIDTH = window.innerWidth;

//   scene = new THREE.Scene();

//   group = new THREE.Group();
//   scene.add(group);

//   aspectRatio = WIDTH / HEIGHT;
//   fieldOfView = 60;
//   camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio);

//   const axes = new THREE.AxesHelper(20);
//   scene.add(axes);



//   scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
//   camera.position.x = 0;
//   camera.position.z = 250;
//   camera.position.y = 700;

//   renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//   renderer.setSize(WIDTH, HEIGHT);
//   renderer.shadowMap.enabled = true;
//   container = document.getElementById('world');
//   container.appendChild(renderer.domElement);


//   window.addEventListener('resize', handleWindowResize, false);
// }

// // HANDLE SCREEN EVENTS
// function handleWindowResize() {
//   HEIGHT = window.innerHeight;
//   WIDTH = window.innerWidth;
//   renderer.setSize(WIDTH, HEIGHT);
//   camera.aspect = WIDTH / HEIGHT;
//   camera.updateProjectionMatrix();
// }

// // LIGHTS
// var ambientLight, hemisphereLight, shadowLight;

// function createLights() {
//   hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
//   ambientLight = new THREE.AmbientLight(0xdc8874, .5);
//   shadowLight = new THREE.DirectionalLight(0xffffff, .9);
//   shadowLight.position.set(150, 950, 350);
//   shadowLight.castShadow = true;
//   shadowLight.shadow.camera.left = -400;
//   shadowLight.shadow.camera.right = 400;
//   shadowLight.shadow.camera.top = 1000;
//   shadowLight.shadow.camera.bottom = 200;
//   shadowLight.shadow.camera.near = 1;
//   shadowLight.shadow.camera.far = 1500;
//   shadowLight.shadow.mapSize.width = 2048;
//   shadowLight.shadow.mapSize.height = 2048;

//   scene.add(hemisphereLight);
//   scene.add(shadowLight);
//   scene.add(ambientLight);
// }

// // WORLD
// World = function () {
//   var geom = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 40, 10);
//   geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
//   geom.mergeVertices();
//   var l = geom.vertices.length;

//   var mat = new THREE.MeshPhongMaterial({
//     color: Colors.brownDark,
//     transparent: true,
//     opacity: 6,
//     flatShading: THREE.FlatShading,
//   });

//   this.mesh = new THREE.Mesh(geom, mat);
//   this.mesh.receiveShadow = true;
// }

// // 3D Models
// var world;

// function createWorld() {
//   world = new World();
//   // world.mesh.position.y = -600;
//   // scene.add(world.mesh);
//   group.add(world.mesh);
// }

// // loop for rotating the world
// function loop() {
//   updateCameraFov();
//   renderer.render(scene, camera);
//   requestAnimationFrame(loop);
// }

// function updateCameraFov() {
//   camera.updateProjectionMatrix();
// }


// //guns
// const metalMaterial = new THREE.MeshStandardMaterial({
//   color: 0x222222,
//   flatShading: true,
//   roughness: 0.5,
//   metalness: 1.0
// })

// // GUNS
// class SimpleGun {
//   constructor() {
//     this.mesh = SimpleGun.createMesh()
//     this.mesh.position.z = 28
//     this.mesh.position.x = 25
//     this.mesh.position.y = -8
//   }

//   static createMesh() {
//     const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, flatShading: true, roughness: 0.5, metalness: 1.0 })
//     const BODY_RADIUS = 3
//     const BODY_LENGTH = 20
//     const full = new THREE.Group()
//     const body = new THREE.Mesh(
//       new THREE.CylinderGeometry(BODY_RADIUS, BODY_RADIUS, BODY_LENGTH),
//       metalMaterial,
//     )
//     body.rotation.z = Math.PI / 2
//     full.add(body)

//     const barrel = new THREE.Mesh(
//       new THREE.CylinderGeometry(BODY_RADIUS / 2, BODY_RADIUS / 2, BODY_LENGTH),
//       metalMaterial,
//     )
//     barrel.rotation.z = Math.PI / 2
//     barrel.position.x = BODY_LENGTH
//     full.add(barrel)
//     return full
//   }

//   downtime() {
//     return 0.1
//   }

//   damage() {
//     return 1
//   }

//   shoot(direction) {
//     const BULLET_SPEED = 0.5
//     const RECOIL_DISTANCE = 4
//     const RECOIL_DURATION = this.downtime() / 1.5

//     const position = new THREE.Vector3()
//     this.mesh.getWorldPosition(position)
//     position.add(new THREE.Vector3(5, 0, 0))
//     spawnProjectile(this.damage(), position, direction, BULLET_SPEED, 0.3, 3)

//     // Little explosion at exhaust
//     spawnParticles(position.clone().add(new THREE.Vector3(2, 0, 0)), 1, Colors.orange, 0.2)

//     // audio
//     audioManager.play('shot-soft')

//     // Recoil of gun
//     const initialX = this.mesh.position.x
//     TweenMax.to(this.mesh.position, {
//       duration: RECOIL_DURATION / 2,
//       x: initialX - RECOIL_DISTANCE,
//       onComplete: () => {
//         TweenMax.to(this.mesh.position, {
//           duration: RECOIL_DURATION / 2,
//           x: initialX,
//         })
//       },
//     })
//   }
// }


// class Lagarto {

//   constructor() {

//     const lagarto = createLagarto(0, 0, 0);
//     this.lastShot = 0;
//     this.weapon = new SimpleGun(); // Assuming lagarto uses SimpleGun
//   }

//   shoot() {
//     if (!this.weapon) {
//       return;
//     }

//     // rate-limit shooting
//     const nowTime = new Date().getTime() / 1000;
//     if (nowTime - this.lastShot < this.weapon.downtime()) {
//       return;
//     }
//     this.lastShot = nowTime;

//     // fire the shot above the lagarto's head
//     let direction = new THREE.Vector3(0, 1, 0); // Change the direction vector
//     direction.applyEuler(lagarto.rotation); // Use lagarto's rotation
//     this.weapon.shoot(direction);

//     // recoil lagarto
//     const recoilForce = this.weapon.damage();
//     TweenMax.to(lagarto.position, {
//       duration: 0.05,
//       y: lagarto.position.y - recoilForce, // Move lagarto upwards
//     });
//   }

//   rotation(direction){
//     if(direction == 'left'){
//       lagarto.rotation.y = -1.5
//     }
//     else{
//       lagarto.rotation.y = 1.5

//     }
//   }

//   position(x,y,z){
//     lagarto.position.x = x;
//     lagarto.position.y = y;
//     lagarto.position.z = z;
//   }
// }




// // CUBE OR FUTURE MODELS(PLAYER)
// var lagarto;
// function createCube() {
//   // var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//   // var material = new THREE.MeshPhongMaterial({ color: Colors.white });
//   // cube = new THREE.Mesh(geometry, material);
//   // cube.position.set(0, cylinderRadius + cubeSize / 2, -cubeSize * 2); // Position on the surface of the world cylinder
//   // scene.add(cube);

//   lagarto = new Lagarto()

//   // createLagarto(0, cylinderRadius + cubeSize / 2, -cubeSize * 2);

//   // lagarto = createLagarto(0, 0, 0);
//   lagarto.rotation.y = 1.5
//   lagarto.position(0,600,-100)

//   // console.log("posição x");
//   // console.log(lagarto.position);

//   // console.log("posição z");
//   // console.log(lagarto.position);


//   // lagarto.position.y = 600;
//   // lagarto.position.z = -100;

//   scene.add(lagarto);
// }

// // BALLS
// var ball;
// // Function to create balls
// function createBalls() {
//   for (var i = 0; i < numBalls; i++) {
//     var ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
//     var ballMaterial = new THREE.MeshPhongMaterial({ color: Colors.red });
//     ball = new THREE.Mesh(ballGeometry, ballMaterial);

//     // Initialize the hitAngle property to zero
//     ball.hitAngle = 0;

//     // Set the initial position of the ball to match that of the cube
//     ball.position.x = 0;
//     ball.position.y = (cylinderRadius + cubeSize / 2);
//     ball.position.z = -cubeSize * 2;

//     // Add the ball to the scene and to the balls array
//     // scene.add(ball);
//     group.add(ball)
//     balls.push(ball);
//   }
// }

// let time = 0;

// const animate = function () {
//   requestAnimationFrame(animate);

//   const theta = (time * 0.5);
//   for (var i = 0; i < numBalls; i++) {
//     var ball = balls[i];

//     // Calculate the radius
//     var r = -Math.abs((cylinderRadius / 2.5) * Math.cos(7 * theta)) - cylinderRadius;

//     // Calculate the orbit position
//     const orbit_x = (Math.cos(theta) * r);
//     const orbit_y = (Math.sin(theta) * r);

//     ball.position.y = orbit_y;
//     ball.position.x = orbit_x;

//     // Update the rotation of the balls based on the rotation of the group
//     // ball.rotation.z = -group.rotation.z;
//   }
//   time += 0.01;

//   renderer.render(scene, camera);
// };

// // Function to rotate the world with arrow or WASD keys
// function handleKeyDown(event) {
//   var keyCode = event.keyCode;

//   switch (keyCode) {
//     case 37: // Left arrow key
//     case 65: // 'A' key
//       // Rotate the world to the left
//       // world.mesh.rotation.z -= .02;
//       group.rotation.z -= .05;

//       lagarto.position.x = 0;
//       lagarto.position.y = 0;
//       lagarto.position.z = 0;

//       lagarto.rotation.y = -1.5

//       lagarto.position.y = 600;
//       lagarto.position.z = -100;

//       break;
//     case 39: // Right arrow key
//     case 68: // 'D' key
//       // Rotate the world to the right
//       // world.mesh.rotation.z += .02;
//       group.rotation.z += .05;

//       // if (lagarto.rotation.z != 1.5) {
//       lagarto.position.x = 0;
//       lagarto.position.y = 0;
//       lagarto.position.z = 0;

//       lagarto.rotation.y = 1.5

//       lagarto.position.y = 600;
//       lagarto.position.z = -100;
//       // }
//       break;
//     case 40:
//       // Move the cube and camera down
//       lagarto.position.z += 2;
//       camera.position.z += 2;
//       break;
//     case 38:
//       // Move the cube and camera down
//       lagarto.position.z -= 2;
//       camera.position.z -= 2;
//       break;

//     case 32:
//       if (keyCode == 32) {
//         lagarto.shoot()
//       };
//       break;

//   }
// }

// function init(event) {
//   document.addEventListener('keydown', handleKeyDown, false);
//   createScene();
//   createLights();
//   createWorld();
//   createCube();

//   createBalls();

//   renderer.render(scene, camera);

//   animate(1);
//   loop();
// }

// window.addEventListener('load', init, false);

// COLORS
var Colors = {
  red: 0xff0800,
  white: 0xd8d0d1,
  pink: 0xFF007F,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x3A9B3B,
};

// THREEJS RELATED VARIABLES
var scene, camera, fieldOfView, aspectRatio, renderer, container;
var group;

// SCREEN VARIABLES
var HEIGHT, WIDTH;

// WORLD AND BALLS
var cylinderRadius = 600;  // Radius of the cylinder
var cylinderHeight = 800;  // Height of the cylinder
var cubeSize = 50;         // Size of the cube
var numBalls = 1;          // Number of balls
var balls = [];            // Array to store the balls
var ballRadius = 10;       // Radius of the ball
var bounceHeight = 60;     // Maximum height of the bounce
var bounceSpeed = 0.00005; // Speed of the bounce
var step = 0;

// GUNS
var lagarto;
var lagartoLastShot = 0;

// INIT THREE JS, SCREEN AND MOUSE EVENTS
function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  group = new THREE.Group();
  scene.add(group);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio);

  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  camera.position.x = 0;
  camera.position.z = 250;
  camera.position.y = 700;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

// HANDLE SCREEN EVENTS
function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

// LIGHTS
var ambientLight, hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
  ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 950, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 1000;
  shadowLight.shadow.camera.bottom = 200;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1500;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}

// WORLD
World = function () {
  var geom = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 40, 10);
  geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  geom.mergeVertices();
  var l = geom.vertices.length;

  var mat = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
    transparent: true,
    opacity: 6,
    flatShading: THREE.FlatShading,
  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
}

// GUNS
class SimpleGun {
  constructor() {
    this.mesh = SimpleGun.createMesh()
    this.mesh.position.z = -100
    this.mesh.position.x = 0
    this.mesh.position.y = 620
  }

  static createMesh() {
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, flatShading: true, roughness: 0.5, metalness: 1.0 })
    const BODY_RADIUS = 3
    const BODY_LENGTH = 20
    const full = new THREE.Group()
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(BODY_RADIUS, BODY_RADIUS, BODY_LENGTH),
      metalMaterial,
    )
    body.rotation.z = Math.PI / 2
    full.add(body)

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(BODY_RADIUS / 2, BODY_RADIUS / 2, BODY_LENGTH),
      metalMaterial,
    )
    barrel.rotation.z = Math.PI / 2
    barrel.position.x = BODY_LENGTH
    full.add(barrel)
    return full
  }

  downtime() {
    return 0.1
  }

  damage() {
    return 1
  }

  shoot(direction) {
    const BULLET_SPEED = 0.5
    const RECOIL_DISTANCE = 4
    const RECOIL_DURATION = this.downtime() / 1.5

    const position = new THREE.Vector3()
    this.mesh.getWorldPosition(position)
    position.add(new THREE.Vector3(5, 0, 0))
    spawnProjectile(this.damage(), position, direction, BULLET_SPEED, 0.3, 3)


    // Recoil of gun
    const initialX = this.mesh.position.x
    TweenMax.to(this.mesh.position, {
      duration: RECOIL_DURATION / 2,
      x: initialX - RECOIL_DISTANCE,
      onComplete: () => {
        TweenMax.to(this.mesh.position, {
          duration: RECOIL_DURATION / 2,
          x: initialX,
        })
      },
    })
  }
}


// SHOOTING
let allProjectiles = []


class Projectile {
  constructor(damage, initialPosition, direction, speed, radius, length) {
    const PROJECTILE_COLOR = Colors.brownDark  // 0x333333

    this.damage = damage
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length),
      new THREE.LineBasicMaterial({ color: PROJECTILE_COLOR })
    )
    this.mesh.position.copy(initialPosition)
    this.mesh.rotation.z = Math.PI / 2
    this.direction = direction.clone()
    this.direction.setLength(1)
    this.speed = speed
    sceneManager.add(this)

    // game.statistics.shotsFired += 1
  }

  tick(deltaTime) {
    this.mesh.position.add(this.direction.clone().multiplyScalar(this.speed * deltaTime))
    this.mesh.position.z *= 0.9
    // out of screen? => remove
    if (this.mesh.position.x > MAX_WORLD_X) {
      this.remove()
    }
  }

  remove() {
    sceneManager.remove(this)
    allProjectiles.splice(allProjectiles.indexOf(this), 1)
  }
}


function spawnProjectile(damage, initialPosition, direction, speed, radius, length) {
  allProjectiles.push(new Projectile(damage, initialPosition, direction, speed, radius, length))
}



class SceneManager {
  constructor() {
    this.list = new Set()
  }

  add(obj) {
    scene.add(obj.mesh)
    this.list.add(obj)
  }

  remove(obj) {
    scene.remove(obj.mesh)
    this.list.delete(obj)
  }

  clear() {
    for (const entry of this.list) {
      this.remove(entry)
    }
  }

  tick(deltaTime) {
    for (const entry of this.list) {
      if (entry.tick) {
        entry.tick(deltaTime)
      }
    }
  }
}

const sceneManager = new SceneManager()


// 3D Models
var world;

function createWorld() {
  world = new World();
  group.add(world.mesh);
}

// loop for rotating the world
function loop() {
  updateCameraFov();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function updateCameraFov() {
  camera.updateProjectionMatrix();
}

// Function to shoot from the lagarto
function shoot() {
  if (!lagarto || !lagarto.weapon) {
    return;
  }

  // rate-limit shooting
  const nowTime = new Date().getTime() / 1000;
  if (nowTime - lagartoLastShot < lagarto.weapon.downtime()) {
    return;
  }
  lagartoLastShot = nowTime;

  // fire the shot above the lagarto's head
  let direction = new THREE.Vector3(0, 1, 0); // Change the direction vector
  direction.applyEuler(lagarto.rotation); // Use lagarto's rotation
  lagarto.weapon.shoot(direction);

  // recoil lagarto
  const recoilForce = lagarto.weapon.damage();
  TweenMax.to(lagarto.position, {
    duration: 0.02,
    y: lagarto.position.y - recoilForce, // Move lagarto upwards
    onComplete: () => {
      // Reset the Lagarto's position to its original height
      TweenMax.to(lagarto.position, {
        duration: 0.05,
        y: 600,
      });
    }
  });
}

// Function to create lagarto (player)
// function createLagarto(x, y, z) {
//   const lagarto = new THREE.Group();
//   lagarto.position.set(x, y, z);

//   // Add lagarto to the scene
//   scene.add(lagarto);

// // Add lagarto's gun
// lagarto.weapon = new SimpleGun();
// lagarto.add(lagarto.weapon.mesh);

// return lagarto;
// }

var lagarto;
// CUBE OR FUTURE MODELS(PLAYER)
function createCube() {

  lagarto = createLagarto(0, 0, 0);
  lagarto.rotation.y = 1.5
  // lagarto.position(0,600,-100)

  console.log("posição x");
  console.log(lagarto.position);

  console.log("posição z");
  console.log(lagarto.position);


  lagarto.position.y = 600;
  lagarto.position.z = -100;

  scene.add(lagarto);
  // Add lagarto's gun
  lagarto.weapon = new SimpleGun();
  lagarto.add(lagarto.weapon.mesh);

  // return lagarto;
}

var keyMap = []
// Function to rotate the world with arrow or WASD keys
function handleKeyDown(event) {
  var keyCode = event.keyCode;
  keyMap[keyCode] = true;
  action();
}

function handleKeyUp(event) {
  var keyCode = event.keyCode;
  keyMap[keyCode] = false;
  action();
}

function action() {

  if (keyMap[37] == true) {
    group.rotation.z -= .05;
    lagarto.rotation.y = -1.5;
  }

  if (keyMap[65] == true) {
    group.rotation.z -= .05;
    lagarto.rotation.y = -1.5;
  }

  if (keyMap[39] == true) {
    group.rotation.z -= .05;
    lagarto.rotation.y = 1.5;
  }

  if (keyMap[68] == true) {
    group.rotation.z -= .05;
    lagarto.rotation.y = 1.5;
  }

  if (keyMap[32] == true) {
    shoot();
  }                 

  // if( keyCode == 37 || keyCode == 65){
  //   //left
  // group.rotation.z -= .05;
  // lagarto.rotation.y = -1.5;

  // }
  // if( keyCode == 39 || keyCode == 68){
  //   //rigth
  //   group.rotation.z -= .05;
  //     lagarto.rotation.y = 1.5;
  // }
  // else if( keyCode == 40){
  //   lagarto.position.z += 2;
  //     camera.position.z += 2;
  // }
  // else if( keyCode == 38){
  //   lagarto.position.z += 2;
  //     camera.position.z += 2;
  // }




  switch (keyCode) {
    case 37: // Left arrow key
    case 65: // 'A' key
      // Rotate the world to the left
      group.rotation.z -= .05;
      lagarto.rotation.y = -1.5;
      break;
    case 39: // Right arrow key
    case 68: // 'D' key
      // Rotate the world to the right
      group.rotation.z += .05;
      lagarto.rotation.y = 1.5;
      break;
    case 40:
      // Move the lagarto and camera down
      lagarto.position.z += 2;
      camera.position.z += 2;
      break;
    case 38:
      // Move the lagarto and camera up
      lagarto.position.z -= 2;
      camera.position.z -= 2;
      break;
    case 32:
      // Shoot when spacebar is pressed
      shoot();
      break;
  }
}


// BALLS
var ball;
// Function to create balls
function createBalls() {
  for (var i = 0; i < numBalls; i++) {
    var ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
    var ballMaterial = new THREE.MeshPhongMaterial({ color: Colors.red });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);

    // Initialize the hitAngle property to zero
    ball.hitAngle = 0;

    // Set the initial position of the ball to match that of the cube
    ball.position.x = 0;
    ball.position.y = (cylinderRadius + cubeSize / 2);
    ball.position.z = -cubeSize * 2;

    // Add the ball to the scene and to the balls array
    group.add(ball);
    balls.push(ball);
  }
}

let time = 0;

const animate = function () {
  requestAnimationFrame(animate);

  const theta = (time * 0.5);
  for (var i = 0; i < numBalls; i++) {
    var ball = balls[i];

    // Calculate the radius
    var r = -Math.abs((cylinderRadius / 2.5) * Math.cos(7 * theta)) - cylinderRadius;

    // Calculate the orbit position
    const orbit_x = (Math.cos(theta) * r);
    const orbit_y = (Math.sin(theta) * r);

    ball.position.y = orbit_y;
    ball.position.x = orbit_x;

    // Update the rotation of the balls based on the rotation of the group
    // ball.rotation.z = -group.rotation.z;
  }
  time += 0.01;

  renderer.render(scene, camera);
};

function init(event) {
  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, true);
  createScene();
  createLights();
  createWorld();
  createCube();
  createBalls();

  renderer.render(scene, camera);

  animate(1);
  loop();
}

window.addEventListener('load', init, false);
