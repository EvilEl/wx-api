import express from "express";
import handlersSachet from "../handlers/handlerSachet";

const router = express.Router();

router.post("/createSachet", handlersSachet.createSachet);

router.delete("/removeSachet/:id", handlersSachet.removeSachet);

router.put("/updateSachet/:id", handlersSachet.updateSachet);

router.get("/getSachet", handlersSachet.getSachet);

export default router;
