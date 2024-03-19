export const img2binary= async(src)=>{
    if(!src)return ''
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = error => reject(error);
        reader.readAsArrayBuffer(blob);
      });
}