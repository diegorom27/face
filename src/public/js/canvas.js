import { findValue } from "./findObjects.js"
export class Canvas{
    constructor(coors,canvas,img){
        this.coors = coors,
        this.canvas = canvas,
        this.ctx = this.canvas.getContext('2d')
        this.img = img || null
        this.fig2move =null
        this.isDragging = false
        this.scale= (this.img)?Math.max(this.canvas.width / this.img.width, this.canvas.height / this.img.height):null
        this.isDraggingImage= false
        this.imgX = 0
        this.imgY = 0
        this.startX=0
        this.startY=0
        this.imgStartX=0
        this.imgStartY=0
        this.updateCanvas()
    }
    set setImg(img){
        this.img = img
        this.scale= (this.img)?Math.max(this.canvas.width / this.img.width, this.canvas.height / this.img.height):null
        this.updateCanvas()
    }
    set setModel(coors){
        this.coors = coors
        this.updateCanvas()
    }
    set setImgX(x){
        this.imgX = x
        this.updateCanvas()
    }
    set setImgY(y){
        this.imgY = y
        this.updateCanvas()
    }
    set setScale(scale){
        this.scale = scale
        this.updateCanvas()
    }
    drawCircle=(x, y, id)=>{
            this.ctx.font = "12px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00FF00';
            this.ctx.fill();
            this.ctx.fillText(id, x - 5, y - 10); 
            this.ctx.closePath();
    }
    drawLine=(line)=>{
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.beginPath();
        let init = this.coors.points[line.start],
            end = this.coors.points[line.end]
        this.ctx.moveTo(init.x, init.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    drawModel=()=>{
        for(let p in this.coors.points ){
            let {x,y} = this.coors.points[p]
            this.drawCircle(x,y,p)
        }
        this.coors.lines.forEach(line => {
            this.drawLine(line)
        });
    }
    updateCanvas=()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(this.img)this.drawImage()
        this.drawModel()
    }
    drawImage=()=>{
        let width = this.img.width * this.scale,
            height = this.img.height * this.scale;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, this.imgX, this.imgY, width, height);
    }
    movemouse =(e)=>{
        if(!this.fig2move || !this.isDragging)return
        let bounds = this.canvas.getBoundingClientRect()
        if((e.offsetX>-10 && e.offsetX<bounds.width+150)
           && (e.offsetY>-10 && e.offsetY<bounds.height+210)){
            this.fig2move.x=e.offsetX
            this.fig2move.y=e.offsetY
        }
        this.updateCanvas()
    }
    mousedown =(e)=>{
        if(!e.target.matches("#"+this.canvas.id))return
        let x = e.offsetX,
            y = e.offsetY
        this.fig2move = findValue(this.coors.points,x,y)
        this.isDragging= true
    }
    mouseup =(e)=>{
        if(!e.target.matches("#"+this.canvas.id))return
        this.isDragging=false
        this.fig2move=null
    }
    zoomIn(e) {
        console.log('Hola')
        this.scale = this.scale + 0.005
        this.img.style.transform= `scale(${this.scale})`;
        this.updateCanvas()
    }
    zoomOut(e) {
        this.scale = this.scale - 0.005
        this.img.style.transform= `scale(${this.scale})`;
        this.updateCanvas()
    }
    startDragging(e) {
        if(!e.target.matches("#"+this.canvas.id))return
        if(this.fig2move)return
        if (!this.img) return;
        this.isDraggingImage=true
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.imgStartX = this.imgX;
        this.imgStartY = this.imgY;
    }
    drag(e){
        if(!e.target.matches("#"+this.canvas.id))return
        if(!this.isDraggingImage)return
        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        const newImgX = this.imgStartX + deltaX;
        const newImgY = this.imgStartY + deltaY;
        this.imgX = newImgX;
        this.imgY = newImgY;
    
        this.updateCanvas();
    }
    stopDragging(e){
        if(!e.target.matches("#"+this.canvas.id))return
        this.isDraggingImage = false;
    }
    writeModel(e){
        if(!e.target.matches("#"+this.canvas.id))return
        console.log(JSON.stringify(this.coors))
    }
}