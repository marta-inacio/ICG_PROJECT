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
  
  // BULLET LIMIT VARIABLES
  var bulletLimit = 50; // Maximum number of bullets per 20 seconds
  var bulletTimestamps = []; // Array to store the timestamps of the bullets
  
  // SCREEN VARIABLES
  var HEIGHT, WIDTH;
  
  // WORLD AND BALLS
  var cylinderRadius = 600;  // Radius of the cylinder
  var cylinderHeight = 800;  // Height of the cylinder
  var cubeSize = 50;         // Size of the cube
  var numBalls = 1;          // Number of balls
  var balls = [];            // Array to store the balls
  var ballRadius = 20;       // Radius of the ball
  var bulletRadius = 5;       // Radius of the ball
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
  
    mat.receiveShadow = true; // Enable shadow receiving for the world material
  
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true; // Ensure the world mesh itself can receive shadows
  }
  
  // bullets array
  var bullets = [];
  
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
    // Get the current time
    const nowTime = new Date().getTime();
  
    // Remove timestamps older than 20 seconds
    bulletTimestamps = bulletTimestamps.filter(timestamp => nowTime - timestamp < 5000);
  
    // Check if the bullet limit has been reached
    if (bulletTimestamps.length >= bulletLimit) {
      console.log("Bullet limit reached. Please wait before shooting again.");
      return;
    }
  
    // Add the current timestamp to the array
    bulletTimestamps.push(nowTime);
  
    // rate-limit shooting
    if (nowTime / 1000 - lagartoLastShot < 0.1) {
      return;
    }
    lagartoLastShot = nowTime / 1000;
  
    // calculate the direction vector from the center of the planet to the lagarto
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
  
    bullet.velocity = direction.multiplyScalar(5); // adjust the speed if needed
  
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
        i--; // Decrement the index to account for the removed bullet
        continue;
      }
  
      bullets[i].position.add(bullets[i].velocity);
    }
  }
  
  
  
  
  // Define the size of the hitbox
  const hitboxSize = new THREE.Vector3(40, 130, 50); // Adjust the size as needed
  
  // // Initialize the hitbox
  // lagartoHitBox = new THREE.Box3(
  //   new THREE.Vector3(
  //     lagarto.position.x - hitboxSize.x / 2,
  //     lagarto.position.y - hitboxSize.y / 2,
  //     lagarto.position.z - hitboxSize.z / 2
  //   ),
  //   new THREE.Vector3(
  //     lagarto.position.x + hitboxSize.x / 2,
  //     lagarto.position.y + hitboxSize.y / 2,
  //     lagarto.position.z + hitboxSize.z / 2
  //   )
  // );
  
  // Function to update the hitbox's position based on the lagarto's position
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
  
  
  // // Function to update the hitbox's position and size based on the lagarto model
  // function updateLagartoHitBox() {
  //   // Update the hitbox to match the lagarto's position and size
  //   lagartoHitBox.setFromObject(lagarto);
  // }
  
  // Function to check for collisions between the lagarto hitbox and balls
  function checkLagartoCollisionWithBalls() {
    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];
  
      // Create a Box3 for the current ball
      var ballHitBox = new THREE.Box3().setFromObject(ball);
      // console.log('hitboxlagarto');
      // console.log(lagartoHitBox);
  
  
      // Check if the lagarto hitbox intersects with the ball hitbox
      if (lagartoHitBox.intersectsBox(ballHitBox)) {
        // Collision detected, remove the lagarto from the scene
        scene.remove(lagarto);
  
        // Optionally, you can also remove the ball if needed
        // group.remove(ball);
        // balls.splice(i, 1);
        // i--; // Decrement index to account for the removed ball
  
        // You can also handle what happens when a collision is detected here
        console.log('Collision detected between lagarto and a ball!');
        
        // Stop further checks as lagarto is removed
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
    lagartoHitBox = new THREE.Box3().setFromObject(lagarto); // Initialize the hitbox
  }
  
  var keyMap = [];
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
  
  function moveBulletsWithGroup() {
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i] !== undefined && bullets[i].alive) {
        bullets[i].position.add(group.rotation.z); // Adjust based on group rotation
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
    
    if (keyMap[40] == true) {
      lagarto.position.z += 15;
      camera.position.z += 15;
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
      var angle = i*i* angleIncrement;
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
  
    // Create a raycaster
    const raycaster = new THREE.Raycaster();
  
    // Loop through all bullets
    for (let i = 0; i < object1.length; i++) {
      const obj1 = object1[i];
  
      // Set the raycaster's position to the bullet's position
      raycaster.set(obj1.position, new THREE.Vector3(0, 1, 0));
  
      // Check for intersections between the ray and balls
      const intersects = raycaster.intersectObjects(object2);
  
      if (intersects.length > 0) {
        // Remove bullet from scene
        scene.remove(obj1);
        // Remove bullet from bullets array
        object1.splice(i, 1);
        i--; // Decrement index to account for removed bullet
  
        // Remove the hit ball from scene and balls array
        const hitObject = intersects[0].object;
        group.remove(hitObject);
        object2.splice(object2.indexOf(hitObject), 1);
      }
    }
  }
  
  const animate = function () {
    requestAnimationFrame(animate);
  
    updateBullets();
  
    checkColision(bullets, balls);
  
    // Update the lagarto hitbox position and size
    updateLagartoHitBox();
    checkLagartoCollisionWithBalls();
  
    // Update the positions of the balls
    const theta = time * 0.5;
  
    for (let i = 0; i < numBalls; i++) {
      const ball = balls[i]; // Retrieve the ball object at index i
      if (ball) { // Check if the ball object exists
        // Calculate the radius
        const r = -Math.abs((cylinderRadius / 2.5) * Math.cos(7* theta)) - cylinderRadius;
        // const r = -Math.abs((cylinderRadius / 2.5) * Math.cos(7 * theta * (i+ 1))) - cylinderRadius;
  
        // Calculate the new position of the ball based on its index
        let orbit_x, orbit_y;
  
        // if (i % 2 === 0) {
        //   orbit_x = Math.cos(theta) * r;
        //   orbit_y = Math.sin(theta) * r;
        // } else {
          orbit_x = Math.cos(theta) * r ;
          orbit_y = Math.sin(theta) * r ;
        // }
  
        ball.position.x = orbit_x;
        ball.position.y = orbit_y;
        ball.position.z = -100; // Ensure z position is always 100 as per the requirement
      }
    }
    
    time += 0.01;
  
    renderer.render(scene, camera);
  };
  
  function init(event) {
    document.addEventListener('keydown', handleKeyDown, false);
    createScene();
    createLights();
    createWorld();
    createPersonagem();
    createBalls();
    document.addEventListener("keyup", handleKeyUp, true);
  
    renderer.render(scene, camera);
  
    animate(); 
    loop();
  }
  
  window.addEventListener('load', init, false);

  