const { Folder } = require('../models/folderModel');

const permissionMiddleware = async (req, res, next) => {

  const userId = req.user.userId; // Extracted from the authMiddleware
  const folderId = req.params.parentId;

  if (!folderId) {
    return res.status(400).json({ message: 'Parent folder ID missing' });
  }

  try {
    const folder = await Folder.findByPk(folderId);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    // console.log(folder.userId, userId)
    if (folder.userId != userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error2' });
  }
};

module.exports = permissionMiddleware;
