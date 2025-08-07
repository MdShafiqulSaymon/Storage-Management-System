"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadError = exports.validateFile = void 0;
const validators_1 = require("../utils/validators");
const validateFile = (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }
    if (!(0, validators_1.isValidFileType)(req.file.mimetype)) {
        res.status(400).json({ error: 'Invalid file type' });
        return;
    }
    // Check file size (10MB limit)
    if (req.file.size > 10 * 1024 * 1024) {
        res.status(400).json({ error: 'File size exceeds 10MB limit' });
        return;
    }
    next();
};
exports.validateFile = validateFile;
const handleUploadError = (error, req, res, next) => {
    if (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ error: 'File size too large' });
            return;
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            res.status(400).json({ error: 'Too many files' });
            return;
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            res.status(400).json({ error: 'Unexpected field' });
            return;
        }
        res.status(500).json({ error: 'Upload failed' });
        return;
    }
    next();
};
exports.handleUploadError = handleUploadError;
