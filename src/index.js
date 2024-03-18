import httpServer from "#config/http.js";
import "#config/env.js";
import connectDB from "#config/db.js";

const bootstrap = async () =>{
    await connectDB(process.env.ATLAS_URI)
    httpServer.listen(process.env.PORT,()=>{
        console.log('running on http://localhost:'+process.env.PORT)
    })
}

bootstrap()