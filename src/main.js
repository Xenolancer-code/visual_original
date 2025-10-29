// Importa Three.js y el control de órbita
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Crea la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Crea la cámara
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 1, 3);

// Crea el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Luz ambiental (ilumina todo por igual)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Añade una luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);


// Carga un modelo GLB/GLTF
const loader = new GLTFLoader();
loader.load('/sonic.glb', (gltf) => {
  scene.add(gltf.scene);
});

// Añade un modelo simple (ejemplo: un cubo)
/*
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff99 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/

// Controles de cámara con el ratón
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // movimiento suave

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Ajustar al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

loader.load(
  '/sonic.glb',
  (gltf) => {
    scene.add(gltf.scene);
    console.log('✅ Modelo cargado');
  },
  (xhr) => {
    console.log(`Cargando modelo: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('❌ Error al cargar el modelo:', error);
  }
);
