import crypto from 'crypto';

export const generateRandomString = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};

export const paginate = (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const createResponse = (
  success: boolean,
  message: string,
  data: any = null,
  error: any = null
) => {
  return {
    success,
    message,
    ...(data && { data }),
    ...(error && { error }),
    timestamp: new Date().toISOString(),
  };
};

export const isFileImage = (mimetype: string): boolean => {
  return mimetype.startsWith('image/');
};

export const isFilePDF = (mimetype: string): boolean => {
  return mimetype === 'application/pdf';
};

export const parseSort = (sortString: string = '-createdAt') => {
  const sortObj: any = {};
  if (sortString.startsWith('-')) {
    sortObj[sortString.substring(1)] = -1;
  } else {
    sortObj[sortString] = 1;
  }
  return sortObj;
};