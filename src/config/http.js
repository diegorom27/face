import app from './express.js'
import {createServer} from 'http'
//Se utiliza httpServer por la facilidad de para el servidor para realizar pruebas
const httpServer = createServer(app)

export default httpServer