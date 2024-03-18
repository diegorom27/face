import { Canvas } from './canvas.js';
import { loadImage } from './saveImage.js';

export async function createCanvas(coors, canvasElement, imgPath = null,imgX=0,imgY=0, scale=null) {
    try {
        let img = null;
        if (imgPath) {
            img = await loadImage(imgPath);
        }
        const canvas = new Canvas(coors, canvasElement, img);
        if(scale)canvas.setScale = scale
        canvas.setImgX= imgX || 0 
        canvas.setImgY= imgY || 0
        return canvas
    } catch (error) {
        console.error('Error al crear el objeto Canvas:', error);
        return null;
    }
}
