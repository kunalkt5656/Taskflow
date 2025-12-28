import axiosInstance from './axiosinstance';
import { API_PATHS } from './apiPath';

/**
 * Upload a single image file
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string|null>} - The uploaded image URL or null on failure
 */
export const uploadImage = async (imageFile) => {
    if (!imageFile) {
        console.error('No image file provided');
        return null;
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
        console.error('Invalid file type. Only images are allowed.');
        return null;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (imageFile.size > maxSize) {
        console.error('File size exceeds 5MB limit');
        return null;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data?.imageUrl || response.data?.url || null;
    } catch (error) {
        console.error('Image upload failed:', error.response?.data?.message || error.message);
        return null;
    }
};

/**
 * Upload multiple images
 * @param {File[]} imageFiles - Array of image files to upload
 * @returns {Promise<string[]>} - Array of uploaded image URLs
 */
export const uploadMultipleImages = async (imageFiles) => {
    if (!imageFiles || imageFiles.length === 0) {
        return [];
    }

    const uploadPromises = imageFiles.map(file => uploadImage(file));
    const results = await Promise.all(uploadPromises);

    // Filter out failed uploads (null values)
    return results.filter(url => url !== null);
};

/**
 * Convert a File to base64 string (for previews)
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string of the file
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Validate an image file
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Max file size in bytes (default 5MB)
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateImageFile = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024,
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    } = options;

    if (!file) {
        return { isValid: false, error: 'No file provided' };
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: `Invalid file type. Allowed types: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`
        };
    }

    if (file.size > maxSize) {
        const sizeMB = (maxSize / (1024 * 1024)).toFixed(0);
        return { isValid: false, error: `File size exceeds ${sizeMB}MB limit` };
    }

    return { isValid: true, error: null };
};

/**
 * Compress an image before upload
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxWidth - Max width (default 1920)
 * @param {number} options.maxHeight - Max height (default 1080)
 * @param {number} options.quality - JPEG quality 0-1 (default 0.8)
 * @returns {Promise<Blob>} - Compressed image as Blob
 */
export const compressImage = (file, options = {}) => {
    const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 0.8,
    } = options;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let { width, height } = img;

                // Calculate new dimensions
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }

                // Create canvas and draw resized image
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to blob
                canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    file.type,
                    quality
                );
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

export default uploadImage;
