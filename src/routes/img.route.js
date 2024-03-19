import { Router } from "express";
import ImgModel from "#models/img.model.js";

const router = Router();


router.post('/', async (req, res) => {
    const data = req.body;
    data.img = Uint8Array.from(Object.values(data.img))
    data.img = Buffer.from(data.img)
    const newImg = new ImgModel(data);
    try {
        const result = await newImg.save();
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Ruta para recuperar un Main por su _id
router.get('/:id', async(req, res) => {
    try {
        const img = await ImgModel.findById(req.params.id);
        if (img == null) {
            return res.status(404).json({ message: 'Main no encontrado' });
        }
        img.img = Uint8Array.from(img.img)
        res.json(img);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;