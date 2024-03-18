import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "node:path"
import exphbs from "express-handlebars"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import Handlebars from "handlebars"
import uploadFile from "#helper/saveFiles.js"
import indexRouter from "#routes/index.route.js"
import mainRouter from "#routes/data.route.js"

const app = express()

//middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))
app.set("views",path.resolve('./src/views'))
app.use(express.static(path.resolve('./src/public')))
app.use(express.json())

app.use(cors({
    origin:function(origin,callback){
        const ACCEPTED_ORIGIN=[
            "http://localhost:3000"
        ]
        if(ACCEPTED_ORIGIN.includes(origin) || !origin)
            return callback(null,true)
        return callback(new Error('Not allowed by CORS'))
            
    }
}))
app.use(express.json())
app.use(express.urlencoded({"extended":true}))
//configuration
app.engine('.hbs', exphbs.engine({      
    layoutDir: path.join(app.get('views'),"layouts"),      
    partialsDir:path.join(app.get('views'),"partials"),
    extname:".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine','.hbs')
app.set(express.static(path.resolve("./src/static")))

//routes
app.use("/",indexRouter)
app.use("/model",mainRouter)

export default app