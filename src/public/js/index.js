import { loadImage } from './loadImage.js'
import {identifyObject} from './calcularIdent.js'
import {handleMouseDown,handleMouseUp,handleMouseMove,handlerZoom} from "./eventHandler.js"
import {createCanvas} from './canvasFactory.js'
import {saveModel,getModel,saveImg,getImg} from "./request.js"
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
let id = await urlParams.get("id") || "65f9edd908793dc911a8d811";
let model = await getModel(id)
let imgF = await getImg(model.imgFront) 
console.log(imgF)
let imgL = await getImg(model.imgLateral)
let imgO = await getImg(model.imgObjective)
/*
const frontCanvas = await createCanvas(model.front, lienzo, model.frontalImageSrc,model?.frontImageX,model?.frontImageY,model?.scale1),
      lateralCanvas = await createCanvas(model.lateral, lienzo1, model.lateralImageSrc,model?.lateralImageX,model?.lateralImageY,model?.scale2),
      objetiveCanvas = await createCanvas(model.objective, lienzo2,model.objectiveImageSrc,model?.objectiveImageX,model?.objectiveImageY,model?.scale3);
*/
const frontCanvas = await createCanvas(model.front, lienzo, imgF.img , imgF.imageX , imgF.imageY ,imgF.scale),
      lateralCanvas = await createCanvas(model.lateral, lienzo1, imgL.img , imgL.imageX , imgL.imageY ,imgL.scale),
      objetiveCanvas = await createCanvas(model.objective, lienzo2, imgO.img , imgO.imageX , imgO.imageY ,imgO.scale);

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
            if (!name) return;
            const uintImgF = await img2binary(frontCanvas?.img?.src)
            let fId = await saveImg('front',uintImgF,frontCanvas?.imgStartX,frontCanvas?.imgStartY,frontCanvas?.scale);
            const uintImgL = await img2binary(lateralCanvas?.img?.src)
            let lId = await saveImg('lateral',uintImgL,lateralCanvas?.imgStartX,lateralCanvas?.imgStartY,lateralCanvas?.scale);
            const uintImgO = await img2binary(objetiveCanvas?.img?.src)
            let oId = await saveImg('objetive',uintImgO,objetiveCanvas?.imgStartX,objetiveCanvas?.imgStartY,objetiveCanvas?.scale);
            await saveModel({
                name: name,
                front: frontCanvas.coors,
                lateral: lateralCanvas.coors,
                objective: objetiveCanvas.coors,
                imgFront: fId || '',
                imgLateral: lId || '',
                imgObjective: oId || '',
            });
            //window.location.reload()
        }
    } catch (error) {
        console.error('Error en el evento click:', error);
    }
});
