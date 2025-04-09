import express from "express";
import handlerDiffuser from "../handlers/handlerDiffuser";
const router = express.Router();

router.post("/createDiffuser", handlerDiffuser.createDiffuser);

router.delete("/removeDiffuser/:id", handlerDiffuser.removeDiffuser);

router.put("/updateDiffuser/:id", handlerDiffuser.updateDiffuser);

router.get("/getDiffusers", handlerDiffuser.getDiffusers);

export default router;
