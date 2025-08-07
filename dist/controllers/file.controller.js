"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const file_service_1 = require("../services/file.service");
const fileService = new file_service_1.FileService();
class FileController {
    async uploadFile(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No file uploaded' });
                return;
            }
            const file = await fileService.uploadFile(req.user.id, req.file);
            res.status(201).json({
                success: true,
                message: 'File uploaded successfully',
                file,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async createNote(req, res) {
        try {
            const { title, content } = req.body;
            const note = await fileService.createNote(req.user.id, title, content);
            res.status(201).json({
                success: true,
                message: 'Note created successfully',
                note,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async getAllFiles(req, res) {
        try {
            const files = await fileService.getAllFiles(req.user.id);
            res.json({
                success: true,
                count: files.length,
                files,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async getImages(req, res) {
        try {
            const images = await fileService.getFilesByType(req.user.id, 'image');
            res.json({
                success: true,
                count: images.length,
                images,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async getPdfs(req, res) {
        try {
            const pdfs = await fileService.getFilesByType(req.user.id, 'pdf');
            res.json({
                success: true,
                count: pdfs.length,
                pdfs,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async getNotes(req, res) {
        try {
            const notes = await fileService.getFilesByType(req.user.id, 'note');
            res.json({
                success: true,
                count: notes.length,
                notes,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async getFileById(req, res) {
        try {
            const file = await fileService.getFileById(req.user.id, req.params.id);
            if (!file) {
                res.status(404).json({ error: 'File not found' });
                return;
            }
            res.json({
                success: true,
                file,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async deleteFile(req, res) {
        try {
            await fileService.deleteFile(req.user.id, req.params.id);
            res.json({
                success: true,
                message: 'File deleted successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
}
exports.FileController = FileController;
