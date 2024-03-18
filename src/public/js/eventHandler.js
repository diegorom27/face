export function handleMouseDown(canvas1, canvas2, canvas3, e) {
    try {
        canvas1.mousedown(e);
        canvas2.mousedown(e);
        canvas3.mousedown(e);
        canvas1.startDragging(e);
        canvas2.startDragging(e);
        canvas3.startDragging(e);
    } catch (error) {
        console.error('Error en el evento mousedown:', error);
    }
}
export function handleMouseMove(canvas1, canvas2, canvas3, e) {
    try {
        canvas1.movemouse(e);
        canvas2.movemouse(e);
        canvas3.movemouse(e);
        canvas1.drag(e);
        canvas2.drag(e);
        canvas3.drag(e);
    } catch (error) {
        console.error('Error en el evento mousemove:', error);
    }
}

export function handleMouseUp(canvas1, canvas2, canvas3, e) {
    try {
        canvas1.mouseup(e);
        canvas2.mouseup(e);
        canvas3.mouseup(e);
        canvas1.stopDragging(e);
        canvas2.stopDragging(e);
        canvas3.stopDragging(e);
    } catch (error) {
        console.error('Error en el evento mouseup:', error);
    }
}
export function handlerZoom(canvas1, canvas2, canvas3,front,lateral, e) {
    try {
        if (e.target.matches(`#frontalImageControls .zoom-in`))
            canvas1.zoomIn(e);
        if (e.target.matches(`#lateralImageControl .zoom-in`))
            canvas2.zoomIn(e);
        if (e.target.matches(`#objetiveImageControls .zoom-in`))
            canvas3.zoomIn(e);
        if (e.target.matches(`#frontalImageControls .zoom-out`))
            canvas1.zoomOut(e);
        if (e.target.matches(`#lateralImageControl .zoom-out`))
            canvas2.zoomOut(e);
        if (e.target.matches(`#objetiveImageControls .zoom-out`))
            canvas3.zoomOut(e);
        if (e.target.matches(`#selectFrontal`))
            canvas3.setModel = front;
        if (e.target.matches(`#selectLateral`))
            canvas3.setModel = lateral;
    } catch (error) {
        console.error('Error en el evento click:', error);
    }
}