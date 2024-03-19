import httpServer from "#config/http.js";
import "#config/env.js";
import connectDB from "#config/db.js";
import { EventEmitter } from "node:events";

const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 40);
await connectDB(process.env.ATLAS_URI)

httpServer.listen(process.env.PORT,()=>{
    console.log('running on http://localhost:'+process.env.PORT)
})
export default httpServer