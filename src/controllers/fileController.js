const { File } = require('../models/fileModel');
const { Folder } = require('../models/folderModel');
const s3 = require('../config/s3');
const mime = require('mime-types');
require('dotenv').config();

const uploadFile = async (req, res) => {
  // console.log(req.user.userId, req.body.folderId, "hello");
  try {
    const { originalname, buffer } = req.file;
    const userId = req.user.userId; // Extracted from the JWT token in the authMiddleware
    const folderId = req.body.folderId; // Folder ID specified in the request body
   
    const contentType = mime.lookup(originalname) || 'application/octet-stream';  // Determine the Content-Type based on the file extension
    
    // Check if a file with the same name already exists for the user and folder
    const existingFile = await File.findOne({ where: { name: originalname, userId, folderId } });
    if (existingFile) {
      return res.status(400).json({ message: 'File with this name already exists in the folder' });
    }


    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: originalname,
      Body: buffer,
      ContentType: contentType,
    };
    const s3Response = await s3.upload(params).promise();

    // Save file metadata in the database
    const newFile = await File.create({
      name: originalname,
      size: buffer.length,
      userId,
      s3Key: s3Response.Key,
      s3Location: s3Response.Location,
      folderId, // Associate the file with a folder
    });

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error3' });
  }
};

const renameFile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const fileId = req.params.fileId;

    const file = await File.findOne({ where: { fileId, userId } });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    file.name = name;
    await file.save();

    res.json({ message: 'File renamed successfully', file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const moveFile = async (req, res) => {
  try {
    const fileId = req.params.fileId; // Extract the file ID from the request parameters
    const destinationFolderId = req.params.folderId; // Extract the destination folder ID from the request parameters

    // Find the file and destination folder records in the database
    const fileToMove = await File.findByPk(fileId);
    const destinationFolder = await Folder.findByPk(destinationFolderId);

    if (!fileToMove || !destinationFolder) {
      return res.status(404).json({ message: 'File or folder not found' });
    }

    // Check if a file with the same name already exists in the destination folder
    const existingFileInDestination = await File.findOne({
      where: { name: fileToMove.name, folderId: destinationFolderId },
    });

    if (existingFileInDestination) {
      return res.status(400).json({ message: 'A file with this name already exists in the destination folder' });
    }

    // Move the file by updating its folderId in the database
    fileToMove.folderId = destinationFolderId;
    await fileToMove.save();

    res.json({ message: 'File moved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId; // Extract the file ID from the request parameters

    // Find the file record in the database
    const fileToDelete = await File.findByPk(fileId);

    if (!fileToDelete) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete the file record from the database
    await fileToDelete.destroy();

    // Delete the file from S3
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileToDelete.s3Key,
    };

    await s3.deleteObject(deleteParams).promise();

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { uploadFile, renameFile, moveFile, deleteFile };

