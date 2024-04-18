
//COLORS
var Colors = {
  red: 0xff0800,
  white: 0xd8d0d1,
  pink: 0xFF007F,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x3A9B3B,
};

// THREEJS RELATED VARIABLES

var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane,
  renderer, container;

//SCREEN VARIABLES

var HEIGHT, WIDTH;

// WORLD AND BALLS
var cylinderRadius = 600; // Radius of the cylinder
var cylinderHeight = 800; // Height of the cylinder
var cubeSize = 50; // Size of the cube
var numBalls = 10; // Number of balls
var balls = []; // Array to store the balls
var ballRadius = 10; // Radius of the ball
var bounceHeight = 60; // Maximum height of the bounce
var bounceSpeed = 0.00005; // Speed of the bounce
var step = 0;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
  );

  // const axes = new THREE.AxesHelper(20);

  // scene.add(axes);

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
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
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
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
    opacity: 1,
    flatShading: THREE.FlatShading,

  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;

}

// 3D Models
var world;

function createWordl() {
  world = new World();
  world.mesh.position.y = -600;
  scene.add(world.mesh);
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


// CUBE OR FUTURE MODELS(PLAYER)
var cube;

function createCube() {
  // var cubeSize = 50;
  var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  var material = new THREE.MeshPhongMaterial({ color: Colors.white });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, cubeSize / 2, -cubeSize * 2); // Position in the surface of the wordl cilynder
  scene.add(cube);
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
    ball.position.x = cube.position.x;
    ball.position.y = cube.position.y;
    ball.position.z = cube.position.z;

    // Add the ball to the scene and to the balls array
    scene.add(ball);
    balls.push(ball);
  }
}


let time = 0;

const animate = function () {
  requestAnimationFrame(animate);

  const theta = time * 0.5;
  for (var i = 0; i < numBalls; i++) {
    var ball = balls[i];


    // DEFINIR RAIO
    //                 altura do salto     frequencia de salto(distancia entre saltos)
    var r = -Math.abs((cylinderRadius / 3) * Math.cos(3 * theta)) - cylinderRadius; // calcula o raio

    //                     vel movimento
    const orbit_x = (Math.cos(theta / 3) * r);
    const orbit_y = (Math.sin(theta / 3) * r) - cylinderRadius;

    ball.position.y = orbit_y;
    ball.position.x = orbit_x;
  }
  time += 0.03;

  renderer.render(scene, camera);
};

// Função para rodar o mundo com as setas ou awsd teclas
function handleKeyDown(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 37: // Left arrow key
    case 65: // 'A' key
      // Move the cylinder to the left
      world.mesh.rotation.z -= .02;
      break;
    case 39: // Right arrow key
    case 68: // 'D' key
      // Move the cylinder to the right
      world.mesh.rotation.z += .02;
      break;
  }
}


function init(event) {
  document.addEventListener('keydown', handleKeyDown, false);
  createScene();
  createLights();
  createWordl();
  createCube();
  createBalls();

  renderer.render(scene, camera);

  animate();
  loop();
}


// HANDLE MOUSE EVENTS

var mousePos = {
  x: 0,
  y: 0
};

function handleMouseMove(event) {
  var tx = -1 + (event.clientX / WIDTH) * 2;
  var ty = 1 - (event.clientY / HEIGHT) * 2;
  mousePos = {
    x: tx,
    y: ty
  };
}


var loader = new THREE.Loader();

// init loading
loader.load('path_to_model', function (geometry) {

  // create a mesh with models geometry and material
  var mesh = new THREE.Mesh(
    geometry,
    material
  );

  mesh.rotation.y = -Math.PI / 5;

  scene.add(mesh);
});

window.addEventListener('load', init, false);
