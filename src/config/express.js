import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "node:path"
import exphbs from "express-handlebars"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import Handlebars from "handlebars"
import indexRouter from "#routes/index.route.js"
import mainRouter from "#routes/data.route.js"
import imgRouter from "#routes/img.route.js"

const app = express()

//middlewares
app.use(morgan("dev"))
app.set("views",path.resolve('./src/views'))
app.use(express.static(path.resolve('./src/public')))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors({
    origin:function(origin,callback){
        const ACCEPTED_ORIGIN=[
            "http://localhost:3000",
            "https://face-test3.vercel.app"
        ]
        if(/face-(.*)-diego-fernando-roman-lopezs-projects.vercel.app/.test(origin))
            return callback(null,true)
        if(ACCEPTED_ORIGIN.includes(origin) || !origin)
            return callback(null,true)
        console.log('Not allowed by CORS')
        return callback(new Error('Not allowed by CORS'))
            
    }
}))
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
app.use("/img",imgRouter)

export default app