import { Router } from "express";
import Main from "#models/main.model.js";
import uploadFile from "#helper/saveFiles.js";

const router = Router();

router.get("/",async (req, res) => {
    try {
        const mains = await Main.find({}, '_id name');
        res.render("canvas/all-canvas",{hola:mains});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/upload',(req,res)=>{
    console.log('entro a upload')
    uploadFile(req, res, (err) => {
        if (err) {
            console.error('Error al subir el archivo:', err);
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
})

export default router;