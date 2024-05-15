
// //COLORS
// var Colors = {
//   red: 0xff0800,
//   white: 0xd8d0d1,
//   pink: 0xFF007F,
//   brown: 0x59332e,
//   brownDark: 0x23190f,
//   blue: 0x3A9B3B,
// };

// // THREEJS RELATED VARIABLES

// var scene,
//   camera, fieldOfView, aspectRatio,
//   renderer, container;

// //SCREEN VARIABLES

// var HEIGHT, WIDTH;

// // WORLD AND BALLS
// var cylinderRadius = 600;  // Radius of the cylinder
// var cylinderHeight = 800;  // Height of the cylinder
// var cubeSize = 50;         // Size of the cube
// var numBalls = 10;         // Number of balls
// var balls = [];            // Array to store the balls
// var ballRadius = 10;       // Radius of the ball
// var bounceHeight = 60;     // Maximum height of the bounce
// var bounceSpeed = 0.00005; // Speed of the bounce
// var step = 0;

// //INIT THREE JS, SCREEN AND MOUSE EVENTS

// function createScene() {

//   HEIGHT = window.innerHeight;
//   WIDTH = window.innerWidth;

//   scene = new THREE.Scene();
//   aspectRatio = WIDTH / HEIGHT;
//   fieldOfView = 60;
//   camera = new THREE.PerspectiveCamera(
//     fieldOfView,
//     aspectRatio,
//   );

//   const axes = new THREE.AxesHelper(20);

//   scene.add(axes);

//   scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
//   camera.position.x = 0;
//   camera.position.z = 200;
//   camera.position.y = 100;

//   renderer = new THREE.WebGLRenderer({
//     alpha: true,
//     antialias: true
//   });
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
//   shadowLight.position.set(150, 350, 350);
//   shadowLight.castShadow = true;
//   shadowLight.shadow.camera.left = -400;
//   shadowLight.shadow.camera.right = 400;
//   shadowLight.shadow.camera.top = 400;
//   shadowLight.shadow.camera.bottom = -400;
//   shadowLight.shadow.camera.near = 1;
//   shadowLight.shadow.camera.far = 1000;
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

// function createWordl() {
//   world = new World();
//   world.mesh.position.y = -600;
//   scene.add(world.mesh);
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


// // CUBE OR FUTURE MODELS(PLAYER)
// // var cube;

// function createCube() {
//   // var cubeSize = 50;
//   var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//   var material = new THREE.MeshPhongMaterial({ color: Colors.white });
//   cube = new THREE.Mesh(geometry, material);
//   cube.position.set(0, cubeSize / 2, -cubeSize * 2); // Position in the surface of the wordl cilynder

//   // const lagarto = createLagarto((0, cubeSize / 2, -cubeSize * 2));
//   // scene.add(lagarto);

//   scene.add(cube);
// }


// // // BALLS

// // var ball;
// // // Function to create balls
// // function createBalls() {
// //   for (var i = 0; i < numBalls; i++) {
// //     var ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
// //     var ballMaterial = new THREE.MeshPhongMaterial({ color: Colors.red });
// //     ball = new THREE.Mesh(ballGeometry, ballMaterial);

// //     // Initialize the hitAngle property to zero
// //     ball.hitAngle = 0;

// //     // Set the initial position of the ball to match that of the cube
// //     ball.position.x = 0;
// //     ball.position.y = cubeSize / 2;
// //     ball.position.z = -cubeSize * 2;

// //     // Add the ball to the scene and to the balls array
// //     scene.add(ball);
// //     balls.push(ball);
// //   }
// // }


// // let time = 0;

// // const animate = function () {
// //   requestAnimationFrame(animate);

// //   const theta = (time * 0.5);
// //   for (var i = 0; i < numBalls; i++) {
// //     var ball = balls[i];


// //     // DEFINIR RAIO
// //     //                 altura do salto     frequencia de salto(distancia entre saltos)
// //     var r = -Math.abs((cylinderRadius / 3) * Math.cos(3 * theta)) - cylinderRadius; // calcula o raio

// //     //                     vel movimento
// //     const orbit_x = (Math.cos(theta / 3) * r);
// //     const orbit_y = (Math.sin(theta / 3) * r) - cylinderRadius;

// //     ball.position.y = orbit_y;
// //     ball.position.x = orbit_x;
// //   }
// //   time += 0.01;

// //   renderer.render(scene, camera);
// // };

// // // Função para rodar o mundo com as setas ou awsd teclas
// // function handleKeyDown(event) {
// //   var keyCode = event.keyCode;

// //   switch (keyCode) {
// //     case 37: // Left arrow key
// //     case 65: // 'A' key
// //       // Move the cylinder to the left
// //       world.mesh.rotation.z -= .02;
// //       // animate(-.001);
// //       break;
// //     case 39: // Right arrow key
// //     case 68: // 'D' key
// //       // Move the cylinder to the right
// //       world.mesh.rotation.z += .02;
// //       // animate(0.001);
// //        break;
// //   }
// // }

// // function init(event) {
// //   document.addEventListener('keydown', handleKeyDown, false);
// //   createScene();
// //   createLights();
// //   createWordl();
// //   createCube();
// //   createBalls();

// //   renderer.render(scene, camera);

// //   animate(1);
// //   loop();
// // }


// // HANDLE MOUSE EVENTS

// var mousePos = {
//   x: 0,
//   y: 0
// };

// function handleMouseMove(event) {
//   var tx = -1 + (event.clientX / WIDTH) * 2;
//   var ty = 1 - (event.clientY / HEIGHT) * 2;
//   mousePos = {
//     x: tx,
//     y: ty
//   };
// }


// var loader = new THREE.Loader();

// // init loading
// loader.load('path_to_model', function (geometry) {

//   // create a mesh with models geometry and material
//   var mesh = new THREE.Mesh(
//     geometry,
//     material
//   );

//   // mesh.rotation.y = -Math.PI / 5;

//   scene.add(mesh);
// });

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
  
  var scene,
    camera, fieldOfView, aspectRatio,
    renderer, container;
  
  // SCREEN VARIABLES
  
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
  
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);
  
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
      opacity: 6,
      flatShading: THREE.FlatShading,
  
    });
  
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  
  }
  
  // 3D Models
  var world;
  
  function createWordl() {
    world = new World();
    world.mesh.position.x = 0;
    world.mesh.position.y = -600;
    world.mesh.position.z = 0;
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
    var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var material = new THREE.MeshPhongMaterial({ color: Colors.white });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, cubeSize / 2, -cubeSize * 2); // Position in the surface of the world cylinder
    scene.add(cube);
  }
  // BALLS
  
  // Array to store the balls
  var balls = [];
  var time = 0; // Initialize time variable
  
  // Function to create balls
  function createBalls() {
    for (var i = 0; i < numBalls; i++) {
      var ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
      var ballMaterial = new THREE.MeshPhongMaterial({ color: Colors.red });
      var ball = new THREE.Mesh(ballGeometry, ballMaterial);
  
      // Initialize properties for each ball
      var ballProps = {
        initialX: Math.random() * cylinderRadius * 2 - cylinderRadius, // Random initial x position within the cylinder
        initialY: cubeSize / 2, // Initial y position
        amplitude: 5 + Math.random() * 15, // Random amplitude
        speed: 1, // Random speed
        phase: Math.random() * Math.PI * 2 // Random phase
      };
  
      ball.position.set(ballProps.initialX, ballProps.initialY, -cubeSize * 2);
  
      // Store ball properties
      ball.userData = ballProps;
  
      // Add the ball to the scene and to the balls array
      scene.add(ball);
      balls.push(ball);
    }
  }
  
  
  
  // Animate the balls
  function animateBalls() {
    requestAnimationFrame(animateBalls);
  
    // Update time
    time += 0.03;
  
    // Get the current rotation of the world
    var worldRotation = world.mesh.rotation.z;
  
    for (var i = 0; i < numBalls; i++) {
      var ball = balls[i];
      updateBallPosition(ball, worldRotation); // Pass the world rotation to the update function
    }
  
    renderer.render(scene, camera);
  }
  
  // Update ball position
  function updateBallPosition(ball, worldRotation) {
    var ballProps = ball.userData;
    var theta = time * ballProps.speed + ballProps.phase + worldRotation;
  
    var r = -Math.abs((cylinderRadius / 3) * Math.cos(3 * theta)) - cylinderRadius; // calculate the radius
  
    // Calculate new position based on sine wave
    const x = ballProps.initialX + (Math.cos(theta) * r);
    const y = ballProps.initialY + (Math.sin(theta) * r) - cylinderRadius;
    // var x = ballProps.initialX + Math.cos(theta) * ballProps.amplitude;
    // var y = ballProps.initialY + Math.sin(theta) * ballProps.amplitude ;
  
    // Adjust position based on world rotation
    // var rotatedX = x * Math.cos(worldRotation) - y * Math.sin(worldRotation);
    // var rotatedY = x * Math.sin(worldRotation) + y * Math.cos(worldRotation);
  
    ball.position.set(x, y, ball.position.z);
  }
  
  
  // Function to get the position of balls at a certain time
  function getBallPositionAtDateTime(ball, dateTime) {
    var ballProps = ball.userData;
    var elapsedTime = dateTime.getTime() / 1000; // Convert datetime to seconds
    var theta = elapsedTime * ballProps.speed + ballProps.phase;
  
    var r = -Math.abs((cylinderRadius / 3) * Math.cos(3 * theta)) - cylinderRadius; // calculate the radius
  
    // Calculate position based on sine wave
    const x = ballProps.initialX + (Math.cos(theta) * r);
    const y = ballProps.initialY + (Math.sin(theta) * r) - cylinderRadius;
    const z = ball.position.z;
  
    return { x: x, y: y, z: z };
  }
  
  
  //atualizar posição das bolas a movimentarem-se
  
  
  
  
  
  
  //teste
  
  // // Função para rotacionar um objeto em torno de um eixo no espaço
  // function rotateAroundWorldAxis(object, axis, radians) {
  //   var rotationMatrix = new THREE.Matrix4();
  //   rotationMatrix.makeRotationAxis(axis.normalize(), radians);
  //   rotationMatrix.multiply(object.matrix); // pre-multiply
  //   object.matrix = rotationMatrix;
  //   object.rotation.setFromRotationMatrix(object.matrix);
  // }
  
  // // Função para fazer um objeto orbitar em torno de outro
  // function orbitAroundObject(objectToOrbit, centerObject, distance, speed) {
  //   var orbitAxis = new THREE.Vector3(0, 1, 0); // Eixo de órbita, aqui usamos o eixo y
  //   objectToOrbit.position.x = centerObject.position.x + Math.cos(speed) * distance;
  //   objectToOrbit.position.z = centerObject.position.z + Math.sin(speed) * distance;
  
  //   // O objeto orbitante olha para o centro do objeto em torno do qual está orbitando
  //   objectToOrbit.lookAt(centerObject.position);
  
  //   // Rotacionar o objeto orbitante em torno do eixo de órbita
  //   rotateAroundWorldAxis(objectToOrbit, orbitAxis, speed);
  // }
  
  // Função para fazer um objeto orbitar em torno de outro com uma distância e ângulo definidos
  function orbitAroundObjectAtAngle(objectToOrbit, centerObject, distance, angle) {
    var orbitX = centerObject.position.x + Math.cos(angle) * distance;
    var orbitY = centerObject.position.y + Math.sin(angle) * distance;
  
    // Define a posição do objeto orbitante
    objectToOrbit.position.set(orbitX, orbitY, objectToOrbit.position.z);
  
    // O objeto orbitante olha para o centro do objeto em torno do qual está orbitando
    objectToOrbit.lookAt(centerObject.position);
    console.log(objectToOrbit.position)
    console.log(centerObject.position)
  }
  
  // var teste;
  
  // function test() {
  //   var testeGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
  //   var testeMaterial = new THREE.MeshPhongMaterial({ color: Colors.blue });
  //   teste = new THREE.Mesh(testeGeometry, testeMaterial);
  
  //   teste.position.set(0, cubeSize * 2, -cubeSize * 2);
  
  //   scene.add(teste);
  //   balls.push(teste);
  // }
  
  // Função para rodar o mundo com as setas ou awsd teclas
  function handleKeyDown(event) {
    var keyCode = event.keyCode;
  
    switch (keyCode) {
      case 37: // Left arrow key
      case 65: // 'A' key
        // Move the cylinder to the left
        world.mesh.rotation.z -= .02;
        orbitAroundObjectAtAngle(teste, world.mesh, 700, world.mesh.rotation.z);
  
        // Example usage
        var currentDateTime = new Date(); // Get current datetime
        var nextSecondDateTime = new Date(currentDateTime.getTime() + 1000); // Add one second
        for (var i = 0; i < numBalls; i++) {
          var ball = balls[i];
          var position = getBallPositionAtDateTime(ball, currentDateTime);
          var position = getBallPositionAtDateTime(ball, nextSecondDateTime);
          console.log("Ball", i, "position:", position);
          // Use the position to move the ball or perform any other action
        }
  
        break;
      case 39: // Right arrow key
      case 68: // 'D' key
        // Move the cylinder to the right
        world.mesh.rotation.z += .02;
        orbitAroundObjectAtAngle(teste, world.mesh, 700, world.mesh.rotation.z);
  
        // Example usage
        var currentDateTime = new Date(); // Get current datetime
        var nextSecondDateTime = new Date(currentDateTime.getTime() + 1000); // Add one second
        for (var i = 0; i < numBalls; i++) {
          var ball = balls[i];
          var position = getBallPositionAtDateTime(ball, currentDateTime);
          console.log("Ball", i, "position:", position);
          // Use the position to move the ball or perform any other action
        }
  
        // }
        break;
        
    }
  }
  
  
  // Initialize function
  function init() {
    document.addEventListener('keydown', handleKeyDown, false);
    createScene();
    createLights();
    createWordl();
    createCube();
    createBalls();
    // test();
  
    renderer.render(scene, camera);
  
    animateBalls();
    loop();
  
  }
  
  init();
  