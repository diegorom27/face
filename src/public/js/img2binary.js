export const img2binary = async (src) => {
    if (!src) return '';

    try {
        // Obtener la imagen como blob
        const response = await fetch(src);
        const blob = await response.blob();

        // Convertir la imagen a Base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                // Devolver la imagen como Base64
                const base64data = reader.result;
                resolve(base64data);
            };
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('Error al convertir la imagen a Base64:', error);
        return ''; // Devolver una cadena vacía en caso de error
    }
};