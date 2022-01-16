// window.onload = () => {
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );
  //texture
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg"
  );
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/cubehouse.png"
  );

  //options parameter to set different images on each side
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face 0.5 
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face 0 한면당 0.25임.
  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side 0.25
  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side 0.75
  // top 4 and bottom 5 not seen so not set

  /**** World Objects *****/
  //box
  const box = BABYLON.MeshBuilder.CreateBox("box", {
    faceUV: faceUV,
    wrap: true,
  });
  box.position.y = 0.5;
  box.material = boxMat;

  //roof
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  roof.material = roofMat;

  //color ground
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(6, 1, 1);
  ground.material = groundMat;

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
// }
