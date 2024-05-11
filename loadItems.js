//lagarto
function createLagarto(posx) {
    const group = new THREE.Group();
  
      // Instantiate a loader
    const loader = new THREE.GLTFLoader();
  
    // Load a glTF resource
    loader.load(
      // resource URL
      'models/lagarto/scene.gltf',
      // called when the resource is loaded
      function ( gltf ) {
        gltf.scene.scale.set(80,80,80)
        gltf.scene.position.set(posx, 0, -1000+getRandomNumberBetween(-50,50))

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
  