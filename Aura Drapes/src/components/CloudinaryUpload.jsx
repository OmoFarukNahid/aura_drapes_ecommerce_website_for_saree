// src/components/CloudinaryUpload.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, Loader } from 'lucide-react';
import { uploadAPI } from '../services/api.js';

const CloudinaryUpload = ({
  onUpload,
  existingImage,
  resourceType = 'image',
  buttonText = 'Upload Image',
  multiple = false,
  uploadId = 'default' // ← Critical: makes each input unique
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filesToUpload = multiple ? Array.from(files) : [files[0]];
    setUploading(true);
    setProgress(0);

    let uploaded = 0;
    const total = filesToUpload.length;

    for (const file of filesToUpload) {
      await uploadSingleFile(file, () => {
        uploaded++;
        setProgress(Math.round((uploaded / total) * 100));
      });
    }

    setUploading(false);
    setTimeout(() => setProgress(0), 800);
  };

  const uploadSingleFile = async (file, onProgress) => {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    const maxSize = resourceType === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;

    if (resourceType === 'image' && !validImageTypes.includes(file.type)) {
      alert('Invalid image format. Only JPEG, PNG, WebP, GIF allowed.');
      return;
    }
    if (resourceType === 'video' && !validVideoTypes.includes(file.type)) {
      alert('Invalid video format. Only MP4, WebM, OGG allowed.');
      return;
    }
    if (file.size > maxSize) {
      alert(`File too large. Max size: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;

      const interval = setInterval(() => {
        setProgress(prev => (prev >= 85 ? 85 : prev + 12));
      }, 120);

      try {
        const response = await uploadAPI.uploadImage({
          image: base64,
          resourceType
        });

        clearInterval(interval);
        setProgress(100);

        if (response.data.success) {
          onUpload(response.data.data.url);
          if (onProgress) onProgress();
        } else {
          alert('Upload failed: ' + (response.data.message || 'Try again'));
        }
      } catch (err) {
        clearInterval(interval);
        console.error('Upload error:', err);
        alert('Upload failed. Please try again.');
      }
    };

    reader.onerror = () => alert('Error reading file');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          id={`upload-${resourceType}-${uploadId}`}
          accept={resourceType === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileUpload}
          className="hidden"
          disabled={uploading}
          multiple={multiple}
        />
        <motion.label
          htmlFor={`upload-${resourceType}-${uploadId}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold cursor-pointer transition-colors ${
            uploading
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {uploading ? (
            <Loader size={20} className="animate-spin" />
          ) : resourceType === 'image' ? (
            <ImageIcon size={20} />
          ) : (
            <Video size={20} />
          )}
          <span>{uploading ? `Uploading... ${progress}%` : buttonText}</span>
        </motion.label>

        {existingImage && !uploading && (
          <div className="text-sm text-gray-600 dark:text-gray-400">Image uploaded</div>
        )}
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-purple-600 h-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p><strong>Recommended:</strong> {resourceType === 'image' ? 'WebP format' : 'MP4 format'}</p>
        <p><strong>Max size:</strong> {resourceType === 'image' ? '5MB' : '50MB'}</p>
        <p><strong>Aspect ratio:</strong> 3:4 (portrait) for best results</p>
        {resourceType === 'image' && <p><strong>Dimensions:</strong> 800×1067px or higher</p>}
        {multiple && <p className="text-purple-600 font-medium">Multiple files allowed</p>}
      </div>
    </div>
  );
};

export default CloudinaryUpload;