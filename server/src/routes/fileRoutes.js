import express from "express";
import Auth from "../middlewares/auth.js";
import { createFolder, createSubfolder, deleteFolder, renameFolder } from "../controllers/folderController.js";
import { deleteFile, renameFile, uploadFile } from "../controllers/fileController.js";
import upload from "../middlewares/multerMiddelware.js";

const router = express.Router();

router.post("/createFolder", Auth, createFolder);
router.post("./createSubFolder", Auth, createSubfolder);
router.put("/renameFolder", Auth, renameFolder)
router.delete("/deleteFolder", Auth, deleteFolder);
router.post("/upload-file", Auth, upload.single("file"), uploadFile);
router.put("/update-file",Auth, renameFile);
router.delete("/delete-file", Auth, deleteFile);

export default router;