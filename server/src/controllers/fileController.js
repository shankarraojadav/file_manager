import File from "../models/fileModel.js";
import awsS3 from "../services/awsS3.js";


export const uploadFile = async (req, res) => {
  try {
    const { originalname, size } = req.file;

    const userId = req.user.id;
    const { folderId } = req.body;

    const fileFolder = await Folder.findByPk(folderId);

    if (!fileFolder || fileFolder.ownerId !== userId) {
      throw new Error("Permission denied");
    }

    const fileRecord = await File.create({
      name: originalname,
      size,
      uploadDate: new Date(),
      userId,
      folderId,
    });

    await awsS3.uploadFile(req.file.path, userId, fileRecord.id);

    res.json(fileRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const renameFile = async (req, res) => {
  try {
    const { fileId, newName } = req.body;

    const fileRecord = await File.findByPk(fileId);

    if (!fileRecord || fileRecord.userId !== req.user.id) {
      throw new Error("Permission denied");
    }

    fileRecord.name = newName;
    await fileRecord.save();

    res.json({ message: "File renamed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const fileRecord = await File.findByPk(fileId);

    if (!fileRecord || fileRecord.userId !== req.user.id) {
      throw new Error("Permission denied");
    }

    await awsS3.deleteFile(req.user.id, fileId);

    await fileRecord.destroy();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
