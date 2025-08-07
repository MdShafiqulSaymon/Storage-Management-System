"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const static_routes_1 = __importDefault(require("./routes/static.routes"));
// Create Express app
const app = (0, express_1.default)();
// CORS Configuration - Allow ALL origins
const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Per-Page'],
    maxAge: 86400 // 24 hours
};
// Apply CORS middleware
app.use((0, cors_1.default)(corsOptions));
// Handle preflight requests
app.options('*', (0, cors_1.default)(corsOptions));
// Security middleware
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// Trust proxy for Vercel
app.set('trust proxy', 1);
// Rate limiting with proxy trust
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        return req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    }
});
app.use('/api/', limiter);
// Body parser middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/files', file_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/static', static_routes_1.default);
// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Storage Management System API',
        version: '1.0.0',
        status: 'Running',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            files: '/api/files',
            users: '/api/users',
            static: '/api/static'
        }
    });
});
// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Storage Management System API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    res.status(err.status || 500).json({
        success: false,
        error: isDevelopment ? err.message : 'Internal server error',
        ...(isDevelopment && { stack: err.stack })
    });
});
exports.default = app;
