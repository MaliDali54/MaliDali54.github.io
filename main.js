import './styles.css'
import * as THREE from 'three'; 
import { Wireframe } from 'three/examples/jsm/Addons.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
const scene =new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    });

    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.position.setZ(30);   //pozicija kamere
    renderer.render(scene,camera);

    //  TORUS
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial({color: 0x880808, });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    //////////////////////////////////////////////
    
    const pointLight = new THREE.PointLight(0xffffff, 100, 100, 1.5);
    pointLight.position.set(5,5,5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff,1, 10,1);  //SVJETLO
    scene.add(ambientLight);
   
/*
    const lightHelper =new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200,50);
    scene.add(lightHelper,gridHelper);
*/
    const controls=new OrbitControls(camera, renderer.domElement); //micanje pomocu misa
    //ZVJEZDE
    function addStar(){

        const geometry= new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshStandardMaterial({color:0xffffff});
        const star = new THREE.Mesh(geometry,material);

        const [x,y,z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //random
        star.position.set(x,y,z);
        scene.add(star);
    }

    Array(300).fill().forEach(addStar); // Tu je broj zvijezdi
    ////////////////////////////////////////
    //SLIKA
    const spaceTexture = new THREE.TextureLoader().load('Space_Background4.png');   // Credits: Digital MOON
    scene.background = spaceTexture;
    spaceTexture.encoding = THREE.sRGBEncoding; 
    THREE.ColorManagement.legacyMode = false
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
/////////////////////////////////////////////////////
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const normalTexture = new THREE.TextureLoader().load('normal.jpg');

//MJESEC
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);
    
moon.position.z=-25;

moon.position.setX(0);
//////////////////////////
function moveCamera(){
    const t=document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.001;
    moon.rotation.y += 0.001;
    moon.rotation.z += 0.001;
/*
    camera.position.z = t* -0.01;
    camera.position.x = t* -0.0002;
    camera.position.y = t* -0.0002;*/
}

document.body.onscroll=moveCamera;

    function animate(){
        requestAnimationFrame(animate);
        
        torus.rotation.z += 0.01;
        torus.rotation.x+= 0.005;
        torus.rotation.y+= 0.01;

        controls.update();  //za orbitu

        renderer.render(scene,camera);
    }
    animate()