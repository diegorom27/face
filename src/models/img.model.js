import { Schema,model } from "mongoose";

const imgSchema = new Schema({
    perfil: String,	
    imageX: Number,
    imageY: Number,
    scale: Number,
    imagesrc:Buffer
})

export default model('ImgModel', imgSchema);