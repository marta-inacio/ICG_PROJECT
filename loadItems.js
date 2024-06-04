function createLagarto(posx, posy, posz) {
  const group = new THREE.Group();

  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
      // resource URL
      'models/lagarto/scene.gltf',
      function (gltf) {
          gltf.scene.scale.set(10, 10, 10);
          gltf.scene.position.set(posx,posy, posz);

          gltf.scene.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
              }
          });

      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);

      const boundingSphere = new THREE.Sphere();
      boundingBox.getBoundingSphere(boundingSphere);

      group.boundingSphere = boundingSphere;

      group.add(gltf.scene);
    },
    function (xhr) {
      console.log('Lagarto ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('An error happened', error);
    }
  );

  return group;
}



function createCoconut(posx, posy, posz, angle) {
  const group = new THREE.Group();

  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/coconut_tree/scene.gltf',
    function (gltf) {
      gltf.scene.scale.set(40, 40, 40);
      gltf.scene.position.set(posx, posy, posz);
      
      gltf.scene.rotation.z = angle;

      gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      group.add(gltf.scene);
    },
    function (xhr) {
      console.log('Tree ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log('An error happened: ' + error);
    }
  );
  return group;
}

function createPine(posx, posy, posz, angle) {
  const group = new THREE.Group();

  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    'models/stylized_tree/scene.gltf',
    function (gltf) {
      gltf.scene.position.set(posx, posy, posz);
      
      gltf.scene.rotation.z = -angle;

      gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      group.add(gltf.scene);
    },
    function (xhr) {
      console.log('Tree ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log('An error happened: ' + error);
    }
  );
  return group;
}

