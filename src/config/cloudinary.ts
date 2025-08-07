import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'storage-management';
    let resource_type: 'auto' | 'raw' = 'auto';
    
    if (file.mimetype.startsWith('image/')) {
      folder = 'storage-management/images';
    } else if (file.mimetype === 'application/pdf') {
      folder = 'storage-management/pdfs';
      resource_type = 'raw';
    } else {
      folder = 'storage-management/others';
      resource_type = 'raw';
    }

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

export default cloudinary;