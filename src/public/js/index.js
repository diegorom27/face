import { loadImage } from './loadImage.js'
import {identifyObject} from './calcularIdent.js'
import {handleMouseDown,handleMouseUp,handleMouseMove,handlerZoom} from "./eventHandler.js"
import {createCanvas} from './canvasFactory.js'
import {saveModel,getModel,saveImg} from "./request.js"
import { img2binary } from './img2binary.js'

console.log('Hola desde index.js 1')

let d = document,
    lienzo  = d.getElementById('frontalCanvas'),
    lienzo1 = d.getElementById('lateralCanvas'),
    lienzo2 = d.getElementById('objetiveCanvas')

d.addEventListener('scroll', (e) => {
    e.preventDefault();
});
const first = d.getElementById('first');
first.focus();
first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

const res = await fetch('../json/models.json'),
      defaultModels = await res.json(),
      {front,lateral,equivalentPoint}=defaultModels
const urlParams = new URLSearchParams(window.location.search);
let id = await urlParams.get("id") || "65f4cc299c7a166c86ce09aa";
let model = await getModel(id)
/*
const frontCanvas = await createCanvas(model.front, lienzo, model.frontalImageSrc,model?.frontImageX,model?.frontImageY,model?.scale1),
      lateralCanvas = await createCanvas(model.lateral, lienzo1, model.lateralImageSrc,model?.lateralImageX,model?.lateralImageY,model?.scale2),
      objetiveCanvas = await createCanvas(model.objective, lienzo2,model.objectiveImageSrc,model?.objectiveImageX,model?.objectiveImageY,model?.scale3);
*/
const frontCanvas = await createCanvas(model.front, lienzo, null ,0 , 0 ,0),
      lateralCanvas = await createCanvas(model.lateral, lienzo1, null , 0 , 0 , 0),
      objetiveCanvas = await createCanvas(model.objective, lienzo2, null ,0 ,0 , 0);

// Events
d.addEventListener('mousedown', (e) => handleMouseDown(frontCanvas, lateralCanvas, objetiveCanvas, e));
d.addEventListener('mousemove', (e) => handleMouseMove(frontCanvas, lateralCanvas, objetiveCanvas, e));
d.addEventListener('mouseup', (e) => handleMouseUp(frontCanvas, lateralCanvas, objetiveCanvas, e));

d.addEventListener('change', async (e) => {
    try {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const img = await loadImage(event.target.result);
            if (e.target.matches(`#frontalImageLoader`))
                frontCanvas.setImg = img;
            if (e.target.matches(`#lateralImageLoader`))
                lateralCanvas.setImg = img;
            if (e.target.matches(`#objetiveImageLoader`)) {
                objetiveCanvas.setImg = img;
            }
            const uintImg = await img2binary(frontCanvas.img?.src)
            let res = await saveImg('front',uintImg,0,0,0);
            console.log(res)
            reader.onload = null;
        }
        reader.readAsDataURL(file); 
    } catch (error) {
        console.error('Error en el evento change:', error);
    }
});

d.addEventListener('click', async (e) => {
    try {
        handlerZoom(frontCanvas, lateralCanvas, objetiveCanvas,front,lateral, e);  
        if (e.target.matches(`#calc`))
            identifyObject(frontCanvas, lateralCanvas, objetiveCanvas, equivalentPoint);
        if (e.target.matches(`#saveModel`)){
            let name = prompt('Ingrese el nombre del modelo');
            const uintFrontal = await img2binary(frontCanvas.img?.src)
            console.log(uintFrontal)
            await saveModel({
                name: name,
                front: frontCanvas.coors,
                lateral: lateralCanvas.coors,
                objective: objetiveCanvas.coors,
                frontalImageSrc: uintFrontal || '',
                lateralImageSrc: uintFrontal,
                objectiveImageSrc: uintFrontal,
                frontImageX: frontCanvas.imgX,
                frontImageY: frontCanvas.imgY,
                lateralImageX: lateralCanvas.imgX,
                lateralImageY: lateralCanvas.imgY,
                objectiveImageX: objetiveCanvas.imgX,
                objectiveImageY: objetiveCanvas.imgY,
                scale1: frontCanvas.scale,
                scale2: lateralCanvas.scale,
                scale3: objetiveCanvas.scale
            });
            //window.location.reload()
        }
    } catch (error) {
        console.error('Error en el evento click:', error);
    }
});

const binary2img=(frontImg)=>{
    const blob = new Blob([frontImg], { type: 'image/png' }); 
    const imageUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.src = imageUrl;
}
