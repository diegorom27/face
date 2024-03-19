import { EventEmitter } from 'node:events';
import httpServer from '../src/index.js'

const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

export default httpServer