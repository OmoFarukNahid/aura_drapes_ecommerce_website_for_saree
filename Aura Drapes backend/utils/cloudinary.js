import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Cloudinary Config Check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING'
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file, resourceType = 'image') => {
  try {
    console.log('Starting Cloudinary upload with config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key ? 'SET' : 'MISSING'
    });

    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
      upload_preset: 'aura_drapes_admin',
      quality: 100,
      fetch_format: 'auto',
      transformation: [
        { width: 800, height: 1067, crop: 'fill' },
        { quality: 100 },
        { format: 'webp' }
      ]
    });
    
    console.log('Cloudinary upload successful!');
    return result;
  } catch (error) {
    console.error('Cloudinary upload detailed error:', error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

export default cloudinary;