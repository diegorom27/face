import { Router } from "express";
import Main from "#models/main.model.js";

const router = Router();

// Ruta para obtener todos los nombres y _id de los Main
router.get('/all', async (req, res) => {
    try {
        const mains = await Main.find({}, '_id name');
        res.json(mains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    const main = new Main(data);
    try {
        const newMain = await main.save();
        res.status(201).json(newMain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para recuperar un Main por su _id
router.get('/:id', async(req, res) => {
    try {
        const main = await Main.findById(req.params.id);
        if (main == null) {
            return res.status(404).json({ message: 'Main no encontrado' });
        }
        res.json(main);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un Main
router.put('/:id', async (req, res) => {
    const main = await Main.findById(req.params.id);
    try {
        if (main == null) {
            return res.status(404).json({ message: 'Main no encontrado' });
        }
        const updatedMain = await res.main.save();
        res.json(updatedMain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;