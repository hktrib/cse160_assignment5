import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';


// Scene setup
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera position
camera.position.set(0, 5, 10);

// Orbit controls
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);

// Textures
const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
const texture: THREE.Texture = textureLoader.load('/images/gradienttexture.jpg');

// Materials
const materialBasic: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materialPhong: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff00f00 });
const materialTextured: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: texture });

// Shapes
const shapes: THREE.Mesh[] = [];


const loader = new STLLoader();

let seraphis: THREE.Mesh;

loader.load('/models/serapis.stl', function (geometry) {
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0, 0); // Adjust position as needed
    scene.add(mesh);
    seraphis = mesh;
}, undefined, function (error) { console.error(error) });


// Cubes
for (let i: number = 0; i < 8; i++) {
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cube: THREE.Mesh = new THREE.Mesh(geometry, materialTextured);
    cube.position.set(Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5);
    scene.add(cube);
    shapes.push(cube);
}

// Spheres
for (let i: number = 0; i < 6; i++) {
    const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphere: THREE.Mesh = new THREE.Mesh(geometry, materialPhong);
    sphere.position.set(Math.random() * 50 - 5, Math.random() * 50, Math.random() * 50 - 5);
    scene.add(sphere);
    shapes.push(sphere);
}

// Cylinders
for (let i: number = 0; i < 6; i++) {
    const geometry: THREE.CylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinder: THREE.Mesh = new THREE.Mesh(geometry, materialBasic);
    cylinder.position.set(Math.random() * 30 - 5, Math.random() * 30, Math.random() * 30 - 5);
    scene.add(cylinder);
    shapes.push(cylinder);
}

// Animated shape
const geometryAnimated: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeAnimated: THREE.Mesh = new THREE.Mesh(geometryAnimated, materialBasic);
scene.add(cubeAnimated);

// Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const pointLight: THREE.PointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-5, 5, -5);
scene.add(pointLight);

// Textured skybox
const skyGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(100, 100, 100);
const skyMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/images/environment.jpg'),
    side: THREE.BackSide
});
const skybox: THREE.Mesh = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skybox);

// Animation function
function animate(): void {
    requestAnimationFrame(animate);
    
    // Animate the cube

    seraphis.rotation.z += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
