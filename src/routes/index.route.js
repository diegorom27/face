import { Router } from "express";
import Main from "#models/main.model.js";
const router = Router();

router.get("/",async (req, res) => {
    try {
        const mains = await Main.find({}, '_id name');
        res.render("canvas/all-canvas",{hola:mains});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;