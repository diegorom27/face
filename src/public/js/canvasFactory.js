import { Canvas } from './canvas.js';
export async function createCanvas(coors, canvasElement, imgPath = null,imgX=0,imgY=0, scale=null) {
    try {
        let img = null;
        if (imgPath) {
            img = new Image();
            const blob = new Blob([imgPath], { type: 'image/png' }); 
            const imageUrl = URL.createObjectURL(Uint8Array.from(blob).buffer);
            img.src = imageUrl;
        }
        console.log('img',img)
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
