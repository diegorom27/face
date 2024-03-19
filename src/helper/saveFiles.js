import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        let filePath = path.resolve('./src/public/img/');
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        cb(null,uuidv4()+file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadFile = upload.single('file');

export default uploadFile;