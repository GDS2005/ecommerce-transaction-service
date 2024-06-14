const express = require('express');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const fs = require('fs');

const createImage = catchAsync(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
  
    return res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
});

const getImages = catchAsync(async (req, res) => {
    const filename = req.params.filename || '';
    // Construct the path to the image file
    const imagePath = path.join(__dirname, '../../uploads', filename);

    res.sendFile(imagePath);
});

module.exports = {
    createImage,
    getImages,
};