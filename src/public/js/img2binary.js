export const img2binary= async(src)=>{
    if(!src)return ''
    const response = await fetch(src);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    return buffer
}