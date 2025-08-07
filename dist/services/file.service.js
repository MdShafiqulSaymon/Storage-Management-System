"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const file_model_1 = __importDefault(require("../models/file.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
class FileService {
    determineFileType(mimeType) {
        if (mimeType.startsWith('image/'))
            return 'image';
        if (mimeType === 'application/pdf')
            return 'pdf';
        if (mimeType.startsWith('text/'))
            return 'note';
        return 'other';
    }
    async uploadFile(userId, file) {
        const fileType = this.determineFileType(file.mimetype);
        const newFile = await file_model_1.default.create({
            userId,
            filename: file.filename,
            originalName: file.originalname,
            fileType,
            mimeType: file.mimetype,
            size: file.size,
            url: file.path,
            cloudinaryId: file.filename,
        });
        return newFile;
    }
    async createNote(userId, title, content) {
        const note = await file_model_1.default.create({
            userId,
            filename: title,
            originalName: title,
            fileType: 'note',
            mimeType: 'text/plain',
            size: content.length,
            url: 'note',
            cloudinaryId: `note_${Date.now()}`,
            content,
        });
        return note;
    }
    async getAllFiles(userId) {
        return file_model_1.default.find({ userId }).sort({ createdAt: -1 });
    }
    async getFilesByType(userId, fileType) {
        return file_model_1.default.find({ userId, fileType }).sort({ createdAt: -1 });
    }
    async getFileById(userId, fileId) {
        return file_model_1.default.findOne({ _id: fileId, userId });
    }
    async deleteFile(userId, fileId) {
        const file = await file_model_1.default.findOne({ _id: fileId, userId });
        if (!file) {
            throw new Error('File not found');
        }
        if (file.fileType !== 'note' && file.cloudinaryId && !file.cloudinaryId.startsWith('note_')) {
            try {
                await cloudinary_1.default.uploader.destroy(file.cloudinaryId);
            }
            catch (error) {
                console.error('Error deleting from Cloudinary:', error);
            }
        }
        await file_model_1.default.deleteOne({ _id: fileId });
    }
}
exports.FileService = FileService;
