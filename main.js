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
var group, personagem;
var lagartoHitBox;
var lagarto, lagartoLastShot = 0;
var bullets = [];
var balls = [];
var numBalls = 4;
var coconut, pine, flow, stylized;

// BULLET LIMIT VARIABLES
var bulletLimit = 50; 
var bulletTimestamps = [];

// SCREEN VARIABLES
var HEIGHT, WIDTH;

// WORLD AND BALLS
var cylinderRadius = 600;  // Radius of the cylinder
var cylinderHeight = 800;  // Height of the cylinder
var cubeSize = 50;         // Size of the cube
var ballRadius = 20;       // Radius of the ball
var bulletRadius = 5;       // Radius of the ball
var bounceHeight = 60;     // Maximum height of the bounce
var bounceSpeed = 0.00005; // Speed of the bounce
var step = 0;

// INIT THREE JS, SCREEN AND MOUSE EVENTS
function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  group = new THREE.Group();
  personagem = new THREE.Group();
  scene.add(group);
  scene.add(personagem);

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

  var mat = new THREE.MeshStandardMaterial({
    color: Colors.brownDark,
    transparent: true,
    opacity: 6,
    flatShading: THREE.FlatShading,
  });

  mat.receiveShadow = true;

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
  addTrees();
}

// 3D Models
var world;

function createWorld() {
  world = new World();
  group.add(world.mesh);
}

function addTrees() {
  const angleIncrement = Math.PI / 2;

  
  for (let i = 0; i < 4; i++) { 
    const angle = i * angleIncrement;
    const x = Math.cos(angle) * 600;
    const y = Math.sin(angle) * 600;
    const z = -250; 

    console.log("tres");
    console.log(x);
    console.log(y);
    console.log(z);


    // if (i == 0) {
    coconut = createCoconut(x, y, z);
    coconut.rotation.z = 3.5;
    group.add(coconut);
    // } else if (i == 1) {
    //   pine = createPine(x, y, z);
    //   group.add(pine);
    // } else if (i == 2) {
    //   flow = createFlow(x, y, z);
    //   group.add(flow);
    // } else if (i == 3) {
    //   stylized = createStylized(x, y, z);
    //   group.add(stylized);
    // }
  }

}

// Function to shoot from the lagarto
function shoot() {
  const nowTime = new Date().getTime();

  bulletTimestamps = bulletTimestamps.filter(timestamp => nowTime - timestamp < 5000);

  if (bulletTimestamps.length >= bulletLimit) {
    console.log("Bullet limit reached. Please wait before shooting again.");
    return;
  }
  bulletTimestamps.push(nowTime);

  if (nowTime / 1000 - lagartoLastShot < 0.1) {
    return;
  }
  lagartoLastShot = nowTime / 1000;

  let direction = new THREE.Vector3(
    lagarto.position.x,
    lagarto.position.y,
    lagarto.position.z
  ).normalize();

  // create the bullet
  var bulletGeometry = new THREE.SphereGeometry(bulletRadius, 8, 8);
  var bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

  bullet.radius = 15;
  bullet.castShadow = true;
  bullet.position.set(
    lagarto.position.x,
    lagarto.position.y + 130,
    lagarto.position.z
  );

  bullet.velocity = direction.multiplyScalar(5);

  bullet.alive = true;
  setTimeout(function () {
    bullet.alive = false;
    scene.remove(bullet);
  }, 2000);

  bullets.push(bullet);
  scene.add(bullet);
}

// Function to update the bullets
function updateBullets() {
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i] === undefined) continue;
    if (bullets[i].alive == false) {
      bullets.splice(i, 1);
      i--;
      continue;
    }

    bullets[i].position.add(bullets[i].velocity);
  }
}


const hitboxSize = new THREE.Vector3(40, 130, 50);

function updateLagartoHitBox() {
  lagartoHitBox.min.set(
    lagarto.position.x - hitboxSize.x / 2,
    lagarto.position.y - hitboxSize.y / 2,
    lagarto.position.z - hitboxSize.z / 2
  );
  lagartoHitBox.max.set(
    lagarto.position.x + hitboxSize.x / 2,
    lagarto.position.y + hitboxSize.y / 2,
    lagarto.position.z + hitboxSize.z / 2
  );
}


function checkLagartoCollisionWithBalls() {
  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];

    var ballHitBox = new THREE.Box3().setFromObject(ball);

    if (lagartoHitBox.intersectsBox(ballHitBox)) {
      scene.remove(lagarto);
      console.log('Collision detected between lagarto and a ball!');

      showGameLoseScreen();

      break;
    }
  }
}

// PLAYER
function createPersonagem() {
  lagarto = createLagarto(0, 0, 0);
  lagarto.rotation.y = 1.5;

  lagarto.position.y = 600;
  lagarto.position.z = -100;

  scene.add(lagarto);
  lagartoHitBox = new THREE.Box3().setFromObject(lagarto); 
}

var keyMap = [];
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

function moveBulletsWithGroup() {
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i] !== undefined && bullets[i].alive) {
      bullets[i].position.add(group.rotation.z); 
    }
  }
}

function action() {
  if (keyMap[37] == true || keyMap[65] == true) {
    group.rotation.z -= .05;
    lagarto.rotation.y = -1.5;
  }

  if (keyMap[39] == true || keyMap[68] == true) {
    group.rotation.z += .05;
    lagarto.rotation.y = 1.5;
  }

  if (keyMap[32] == true) {
    shoot();
    console.log(balls)
  }
}

// BALLS
var angleIncrement = Math.random() * Math.PI; // Incremento do ângulo para distribuir as bolas uniformemente
var initialAngle = 0; // Ângulo inicial

// Function to create balls
function createBalls() {
  for (var i = 0; i < numBalls; i++) {
    var ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
    var ballMaterial = new THREE.MeshPhongMaterial({ color: Colors.red });
    var ball = new THREE.Mesh(ballGeometry, ballMaterial);

    // Habilitar sombras para a bola
    ball.castShadow = true;

    // Inicializar a propriedade hitAngle para zero
    ball.hitAngle = 0;

    // Calcular o ângulo atual com base no índice
    var angle = i * i * angleIncrement;
    console.log('angulo');
    console.log(angle);

    // Calcular a nova posição da bola com base no ângulo e no raio do cilindro
    var newX = Math.cos(angle) * cylinderRadius;
    var newY = Math.sin(angle) * cylinderRadius;
    var newZ = -100; // Mantém o Z fixo conforme a necessidade

    // Definir a posição inicial da bola
    ball.position.set(newX, newY, newZ);
    console.log('posição inicial');
    console.log(ball.position);

    // Adicionar a bola à cena e ao array de bolas
    group.add(ball);
    balls.push(ball);
  }
}

let time = 0;

function checkColision(object1, object2) {
  const raycaster = new THREE.Raycaster();

  for (let i = 0; i < object1.length; i++) {
    const obj1 = object1[i];

    raycaster.set(obj1.position, new THREE.Vector3(0, 1, 0));

    const intersects = raycaster.intersectObjects(object2);

    if (intersects.length > 0) {
      scene.remove(obj1);
      object1.splice(i, 1);
      i--; 

      const hitObject = intersects[0].object;
      group.remove(hitObject);
      object2.splice(object2.indexOf(hitObject), 1);

      if (object2.length === 0) {
        showGameWinScreen();
      }
    }
  }
}

const animate = function () {
  requestAnimationFrame(animate);

  updateBullets();
  checkColision(bullets, balls);

  updateLagartoHitBox();
  checkLagartoCollisionWithBalls();

  const theta = time * 0.5;

  for (let i = 0; i < numBalls; i++) {
    const ball = balls[i]; 
    if (ball) { 
      const r = -Math.abs((cylinderRadius / 2.5) * Math.cos(7 * theta)) - cylinderRadius;

      let orbit_x, orbit_y;
      orbit_x = Math.cos(theta) * r;
      orbit_y = Math.sin(theta) * r;

      ball.position.x = orbit_x;
      ball.position.y = orbit_y;
      ball.position.z = -100;
    }
  }

  time += 0.01;

  renderer.render(scene, camera);
};

function showGameLoseScreen() {
  document.getElementById('world').style.display = 'none';
  document.getElementById('gameOverLose').style.display = 'flex';
}

function hideGameLoseScreen() {
  document.getElementById('world').style.display = 'block';
  document.getElementById('gameOverLose').style.display = 'none';
}

function showGameWinScreen() {
  document.getElementById('world').style.display = 'none';
  document.getElementById('gameOverWin').style.display = 'flex';
}

function hideGameWinScreen() {
  document.getElementById('world').style.display = 'block';
  document.getElementById('gameOverWin').style.display = 'none';
}

function showInitialScreen() {
  document.getElementById('world').style.display = 'none';
  document.getElementById('initialScreen').style.display = 'flex';
}

function hideInitialScreen() {
  document.getElementById('world').style.display = 'block';
  document.getElementById('initialScreen').style.display = 'none';
}

function startGame() {
  hideInitialScreen();
  createScene();
  createLights();
  createWorld();
  createPersonagem();
  createBalls();
  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, true);

  renderer.render(scene, camera);
  animate();
}


function restartWinGame() {
  bullets = [];
  balls = [];
  lagartoLastShot = 0;

  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }
  while (personagem.children.length > 0) {
    personagem.remove(personagem.children[0]);
  }

  if (lagarto) {
    scene.remove(lagarto);
    lagarto = null;
  }

  camera.position.set(0, 700, 250);

  createWorld();
  createPersonagem();
  createBalls();

  if (lagarto) {
    lagarto.rotation.y = 1.5;
  }

  hideGameWinScreen();
  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, true);
}

function restartLoseGame() {
  bullets = [];
  balls = [];
  lagartoLastShot = 0;

  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }
  while (personagem.children.length > 0) {
    personagem.remove(personagem.children[0]);
  }

  if (lagarto) {
    scene.remove(lagarto);
    lagarto = null;
  }
  camera.position.set(0, 700, 250);

  createWorld();
  createPersonagem();
  createBalls();

  if (lagarto) {
    lagarto.rotation.y = 1.5;
  }

  hideGameLoseScreen();
  document.addEventListener('keydown', handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp, true);
}


document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartWinButton').addEventListener('click', restartWinGame);
document.getElementById('restartLoseButton').addEventListener('click', restartLoseGame);

window.addEventListener('load', showInitialScreen, false);
