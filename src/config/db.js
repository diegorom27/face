import mongoose from "mongoose";
const connectDB=async(ATLAS_URI)=>mongoose.connect(ATLAS_URI).then(()=>console.log('Database connected'))
export default connectDB