"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtension = exports.isValidFileType = exports.isValidUsername = exports.isValidPassword = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    // At least 6 characters, one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
};
exports.isValidPassword = isValidPassword;
const isValidUsername = (username) => {
    // Alphanumeric and underscore, 3-20 characters
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};
exports.isValidUsername = isValidUsername;
const isValidFileType = (mimetype) => {
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    return allowedTypes.includes(mimetype);
};
exports.isValidFileType = isValidFileType;
const getFileExtension = (filename) => {
    return filename.split('.').pop()?.toLowerCase() || '';
};
exports.getFileExtension = getFileExtension;
