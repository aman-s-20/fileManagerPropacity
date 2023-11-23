const { Folder } = require('../models/folderModel');

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId; // Extracted from the JWT token in the authMiddleware
    // console.log(name, userId);
    
    // Check if the folder with the same name exists for the user
    const existingFolder = await Folder.findOne({ where: { name, userId } });
    if (existingFolder) {
      return res.status(400).json({ message: 'Folder with this name already exists' });
    }

    // Create folder in the database
    const newFolder = await Folder.create({ name, userId });

    res.status(201).json({ message: 'Folder created successfully', folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error3' });
  }
};

const createSubfolder = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId; // Extracted from the JWT token in the authMiddleware
    const parentId = req.params.parentId;

    // Check if the parent folder exists
    const parentFolder = await Folder.findOne({ where: { folderId: parentId, userId } });
    console.log(parentFolder)
    if (!parentFolder) {
      return res.status(404).json({ message: 'Parent folder not found' });
    }

    // Check if the subfolder with the same name exists for the user within the parent folder
    const existingSubfolder = await Folder.findOne({ where: { name, userId, parentId } });
    if (existingSubfolder) {
      return res.status(400).json({ message: 'Subfolder with this name already exists in the parent folder' });
    }

    // Create subfolder in the database
    const newSubfolder = await Folder.create({ name, userId, parentId });

    res.status(201).json({ message: 'Subfolder created successfully', folder: newSubfolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createFolder, createSubfolder };
