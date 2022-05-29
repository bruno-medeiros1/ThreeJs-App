import * as THREE from './three.js-master/build/three.module.js'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js'


const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

//  Load 3d Model
const loader = new GLTFLoader()
loader.load('assets/Building.glb', function(glb){

    //  sucess
    console.log(glb)
    const model = glb.scene

    model.scale.set(0.05, 0.05, 0.05);
    model.position.z = -1.2;
    model.position.x = -1;
    scene.add(model)

},  function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% carregado")

},  function(error){
    console.log("Ocorreu um erro!")
})

//  Cubo Verde
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// scene.add(boxMesh)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

//  Boiler Plate Code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
//renderer.render(scene, camera)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()