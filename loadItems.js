// //lagarto
// function createLagarto(posx) {
//     const group = new THREE.Group();
  
//       // Instantiate a loader
//     const loader = new THREE.GLTFLoader();
  
//     // Load a glTF resource
//     loader.load(
//       // resource URL
//       'models/lagarto/scene.gltf',
//       // called when the resource is loaded
//       function ( gltf ) {
//         gltf.scene.scale.set(80,80,80)
//         // gltf.scene.position.set(posx, 0, -1000+getRandomNumberBetween(-50,50))

//         gltf.scene.traverse(function (child) {
  
//           if (child instanceof THREE.Mesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;
//           }
//       });
  
//         group.add( gltf.scene );
//       },
//       // called while loading is progressing
//       function ( xhr ) {
//         console.log( 'Tree ' + ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//       },
//       // called when loading has errors
//       function ( error ) {
//         console.log( ' An error happened' +  error );
//       }
//     );
//     return group;
// }  
  

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

          group.add(gltf.scene);
      },
      // called while loading is progressing
      function (xhr) {
          console.log('Tree ' + (xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      function (error) {
          console.error('An error happened', error);
      }
  );

  return group;
}



// function createLagarto() {
//   const group = new THREE.Group();

//   // Instantiate a loader
//   const loader = new THREE.GLTFLoader();

//   // Load a glTF resource
//   loader.load(
//       // resource URL
//       'models/lagarto/scene.gltf',
//       // called when the resource is loaded
//       function (gltf) {
//           gltf.scene.scale.set(10, 10, 10);
//           // Adjust position if needed
//           gltf.scene.position.set(0,600, -100);

//           // Traverse through the model to set shadow properties
//           gltf.scene.traverse(function (child) {
//               if (child instanceof THREE.Mesh) {
//                   child.castShadow = true;
//                   child.receiveShadow = true;
//               }
//           });

//           group.add(gltf.scene);
//       },
//       // called while loading is progressing
//       function (xhr) {
//           console.log('Tree ' + (xhr.loaded / xhr.total * 100) + '% loaded');
//       },
//       // called when loading has errors
//       function (error) {
//           console.error('An error happened', error);
//       }
//   );

//   return group;
// }
