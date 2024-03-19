import { Schema,model } from "mongoose";

const imgSchema = new Schema({
    perfil: String,	
    imageX: Number,
    imageY: Number,
    scale: Number,
    img:String
})

export default model('ImgModel', imgSchema);