export const loadImage=(src)=>{
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function() {
            resolve(img); // Resuelve la promesa con el objeto de imagen una vez que la imagen se haya cargado completamente
        };
        img.onerror = function() {
            reject(new Error('Error al cargar la imagen')); // Rechaza la promesa si hay un error al cargar la imagen
        };
        img.src = src; // Establece la fuente de la imagen
        img.onload = null;
        img.onerror = null;
    });
}