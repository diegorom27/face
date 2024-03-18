
export const saveFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const json = await response.json()
        if (response.ok) {
            console.log('Archivo subido exitosamente');
        } else {
            console.error('Error al subir el archivo:', response.status, response.statusText);
        }
        return json?.filename
    } catch (error) {
        console.error('Error de red:', error);
    }
}