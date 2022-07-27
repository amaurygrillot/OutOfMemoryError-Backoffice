import {CExecuterController} from "./c-executer.controller";
import {verifySameIdPost, verifyToken} from "../middleware/verify_token";
import {getFile, executeFileWithSave, saveFile} from "../libs/code-executer";

const express = require('express')
export const cRouter = express.Router();

cRouter.post("/", verifyToken, verifySameIdPost, async function(req, res) {
    await executeFileWithSave(req, res, 'c', process.env.DEFAULT_C_FILE, new CExecuterController(), true);
});

cRouter.post("/executeNoSave", verifyToken, async function(req, res) {
    await executeFileWithSave(req, res, 'c', process.env.DEFAULT_C_FILE, new CExecuterController(), false);
});

cRouter.post("/saveFile", verifyToken, async(req: any, res: any) => {
    try {
        const file = req.files.fileKey;
        const fullPath = `${process.env.FILES_REPO}/c/${req.body.commentId}/${req.body.idPerson}`;
        saveFile(fullPath, process.env.DEFAULT_C_FILE, file.data);
        res.status(200).end();
    }
    catch (err)
    {
        res.write(err);
        res.status(500).end()
    }
});

cRouter.get("/:post_uid/:user_uid", async function(req, res) {
    getFile(req, res, "c", "main.c")
});
