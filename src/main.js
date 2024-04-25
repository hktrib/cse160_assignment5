"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("three"));
const OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
const STLLoader_js_1 = require("three/examples/jsm/loaders/STLLoader.js");
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Camera position
camera.position.set(0, 5, 10);
// Orbit controls
const controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
// Textures
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/images/gradienttexture.jpg');
// Materials
const materialBasic = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materialPhong = new THREE.MeshPhongMaterial({ color: 0xff00f00 });
const materialTextured = new THREE.MeshBasicMaterial({ map: texture });
// Shapes
const shapes = [];
const loader = new STLLoader_js_1.STLLoader();
let seraphis;
loader.load('/models/serapis.stl', function (geometry) {
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0, 0); // Adjust position as needed
    scene.add(mesh);
    seraphis = mesh;
}, undefined, function (error) { console.error(error); });
// Cubes
for (let i = 0; i < 8; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materialTextured);
    cube.position.set(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5);
    scene.add(cube);
    shapes.push(cube);
}
// Spheres
for (let i = 0; i < 6; i++) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphere = new THREE.Mesh(geometry, materialPhong);
    sphere.position.set(Math.random() * 50 - 5, Math.random() * 50, Math.random() * 50 - 5);
    scene.add(sphere);
    shapes.push(sphere);
}
// Cylinders
for (let i = 0; i < 6; i++) {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinder = new THREE.Mesh(geometry, materialBasic);
    cylinder.position.set(Math.random() * 100 - 5, Math.random() * 100, Math.random() * 100 - 5);
    scene.add(cylinder);
    shapes.push(cylinder);
}
// Animated shape
const geometryAnimated = new THREE.BoxGeometry(1, 1, 1);
const cubeAnimated = new THREE.Mesh(geometryAnimated, materialBasic);
scene.add(cubeAnimated);
// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-5, 5, -5);
scene.add(pointLight);
// Textured skybox
const skyGeometry = new THREE.BoxGeometry(100, 100, 100);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/images/environment.jpg'),
    side: THREE.BackSide
});
const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);
// Animation function
function animate() {
    requestAnimationFrame(animate);
    // Animate the cube
    seraphis.rotation.z += 0.01;
    // Render the scene
    renderer.render(scene, camera);
}
animate();
