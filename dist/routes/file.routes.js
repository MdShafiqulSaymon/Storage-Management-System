"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = require("../controllers/file.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const cloudinary_1 = require("../config/cloudinary");
const router = (0, express_1.Router)();
const fileController = new file_controller_1.FileController();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
router.post('/upload', cloudinary_1.upload.single('file'), fileController.uploadFile);
router.post('/notes', fileController.createNote);
router.get('/all', fileController.getAllFiles);
router.get('/images', fileController.getImages);
router.get('/pdfs', fileController.getPdfs);
router.get('/notes', fileController.getNotes);
router.get('/:id', fileController.getFileById);
router.delete('/:id', fileController.deleteFile);
exports.default = router;
