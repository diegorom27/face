
export const saveFile = async (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
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