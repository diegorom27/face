import {Schema,model} from "mongoose";
const pointSchema = new Schema({
    x: Number,
    y: Number
});

const lineSchema = new Schema({
    start: { type: Number, ref: 'Point' },
    end: { type: Number, ref: 'Point' }
});

const mainSchema = new Schema({
    objective: {
        points: {
            type: Map,
            of: pointSchema
        },
        lines: [lineSchema]
    },
    front: {
        points: {
            type: Map,
            of: pointSchema
        },
        lines: [lineSchema]
    },
    lateral: {
        points: {
            type: Map,
            of: pointSchema
        },
        lines: [lineSchema]
    },
    name: String,
    frontalImageSrc: String,
    lateralImageSrc: String,
    objectiveImageSrc: String,
    frontImageX: Number,
    frontImageY: Number,
    lateralImageX: Number,
    lateralImageY: Number,
    objectiveImageX: Number,
    objectiveImageY: Number,
    scale1: Number,
    scale2: Number,
    scale3: Number
});

export default model('MainModel', mainSchema);
