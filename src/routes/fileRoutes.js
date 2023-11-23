const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer(); // Configure multer as needed

router.post('/', authMiddleware, upload.single('file'), fileController.uploadFile);
router.put('/:fileId/rename', authMiddleware, fileController.renameFile);
router.put('/:fileId/move/:folderId', authMiddleware, fileController.moveFile);
router.delete('/:fileId', authMiddleware, fileController.deleteFile);
module.exports = router;
