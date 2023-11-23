const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');

router.post('/', authMiddleware, folderController.createFolder);
router.post('/:parentId/subfolders', authMiddleware, permissionMiddleware, folderController.createSubfolder);

module.exports = router;
