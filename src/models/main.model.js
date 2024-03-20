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
    imgLateral:{
        type: Schema.Types.ObjectId,
        ref: 'imgModel'
    },
    imgFront:{
        type: Schema.Types.ObjectId,
        'ref': 'imgModel'
    },
    imgObjective:{
        type: Schema.Types.ObjectId,
        "ref": 'imgModel'
    }
});

export default model('MainModel', mainSchema);
