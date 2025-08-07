"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSort = exports.isFilePDF = exports.isFileImage = exports.createResponse = exports.paginate = exports.sanitizeFilename = exports.formatFileSize = exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateRandomString = generateRandomString;
const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
exports.formatFileSize = formatFileSize;
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};
exports.sanitizeFilename = sanitizeFilename;
const paginate = (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};
exports.paginate = paginate;
const createResponse = (success, message, data = null, error = null) => {
    return {
        success,
        message,
        ...(data && { data }),
        ...(error && { error }),
        timestamp: new Date().toISOString(),
    };
};
exports.createResponse = createResponse;
const isFileImage = (mimetype) => {
    return mimetype.startsWith('image/');
};
exports.isFileImage = isFileImage;
const isFilePDF = (mimetype) => {
    return mimetype === 'application/pdf';
};
exports.isFilePDF = isFilePDF;
const parseSort = (sortString = '-createdAt') => {
    const sortObj = {};
    if (sortString.startsWith('-')) {
        sortObj[sortString.substring(1)] = -1;
    }
    else {
        sortObj[sortString] = 1;
    }
    return sortObj;
};
exports.parseSort = parseSort;
