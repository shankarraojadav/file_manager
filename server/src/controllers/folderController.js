import Folder from "../models/folderModel.js";
import User from "../models/userModel.js";
import awsS3 from "../services/aswS3.js";
import dotenv from "dotenv";

dotenv.config();

export const createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    const userId = req.user.id;

    const folder = await Folder.create({
      name,
      ownerId: userId,
    });

    await awsS3.createFolder(userId, folder.id, name);

    res.json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubfolder = async (req, res) => {
  try {
    const { name, parentFolderId } = req.body;

    const parentFolder = await Folder.findByPk(parentFolderId);

    if (!parentFolder || parentFolder.ownerId !== req.user.id) {
      throw new Error("Permission denied");
    }

    const subfolder = await Folder.create({
      name,
      parentFolderId,
      ownerId: req.user.id,
    });

    await awsS3.createFolder(req.user.id, subfolder.id, name, parentFolderId);

    res.json(subfolder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const renameFolder = async (req, res) => {
  try {
    const { folderId, newName } = req.body;

    
    const folder = await Folder.findByPk(folderId);

    if (!folder || folder.ownerId !== req.user.id) {
      throw new Error("Permission denied");
    }

    folder.name = newName;
    await folder.save();

    res.json({ message: "Folder renamed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    const folder = await Folder.findByPk(folderId);

    if (!folder || folder.ownerId !== req.user.id) {
      throw new Error("Permission denied");
    }

    await awsS3.deleteFolder(req.user.id, folderId);

    await folder.destroy();

    res.json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};