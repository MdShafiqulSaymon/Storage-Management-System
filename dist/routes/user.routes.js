"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// All routes require authentication
router.use(auth_middleware_1.authenticate);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/change-password', validation_middleware_1.changePasswordValidation, validation_middleware_1.validateRequest, userController.changePassword);
exports.default = router;
