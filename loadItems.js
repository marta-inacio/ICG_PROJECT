function createLagarto(posx, posy, posz) {
  const group = new THREE.Group();

  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
      // resource URL
      'models/lagarto/scene.gltf',
      // called when the resource is loaded
      function (gltf) {
          gltf.scene.scale.set(10, 10, 10);
          // Adjust position if needed
          gltf.scene.position.set(posx,posy, posz);

          // Traverse through the model to set shadow properties
          gltf.scene.traverse(function (child) {
              if (child instanceof THREE.Mesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
              }
          });

          // Compute the bounding box of the loaded model
      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);

      // Compute the bounding sphere from the bounding box
      const boundingSphere = new THREE.Sphere();
      boundingBox.getBoundingSphere(boundingSphere);

      // Assign the bounding sphere to the group
      group.boundingSphere = boundingSphere;

      group.add(gltf.scene);
    },
    // called while loading is progressing
    function (xhr) {
      console.log('Lagarto ' + (xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.error('An error happened', error);
    }
  );

  return group;
}



function createCoconut(posx, posy, posz) {
  const group = new THREE.Group();

    // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/coconut_tree/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.scale.set(40,40,40)
      gltf.scene.position.set(posx,posy, posz);

      gltf.scene.traverse(function (child) {

        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    });

      group.add( gltf.scene );
    },
    // called while loading is progressing
    function ( xhr ) {
      console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( ' An error happened' +  error );
    }
  );
  return group;
}  

function createFlow(posx,posy, posz) {
  const group = new THREE.Group();

    // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/flow_tree/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.scale.set(40,40,40)
      gltf.scene.position.set(posx,posy, posz);
      gltf.scene.traverse(function (child) {

        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    });

      group.add( gltf.scene );
    },
    // called while loading is progressing
    function ( xhr ) {
      console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( ' An error happened' +  error );
    }
  );
  return group;
}  

function createPine(posx,posy, posz) {
  const group = new THREE.Group();

    // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/pine_tree/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.scale.set(40,40,40)

      gltf.scene.position.set(posx,posy, posz);

      gltf.scene.traverse(function (child) {

        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    });

      group.add( gltf.scene );
    },
    // called while loading is progressing
    function ( xhr ) {
      console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( ' An error happened' +  error );
    }
  );
  return group;
}  

function createStylized(posx,posy, posz) {
  const group = new THREE.Group();

    // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'models/stylized_tree/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      gltf.scene.scale.set(40,40,40)
      gltf.scene.position.set(posx,posy, posz);

      gltf.scene.traverse(function (child) {

        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    });

      group.add( gltf.scene );
    },
    // called while loading is progressing
    function ( xhr ) {
      console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( ' An error happened' +  error );
    }
  );
  return group;
}  
