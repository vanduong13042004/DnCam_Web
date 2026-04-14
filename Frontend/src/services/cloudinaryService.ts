import axios from "axios";

const CLOUD_NAME = 'dv11569cs';
const UPLOAD_PRESET = 'upload-c4cl3ubv';

const cloudinaryService = {
    uploadImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET); 

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData
            );

            return response.data.secure_url; 
            
        } catch (error) {
            console.error("Lỗi upload :", error);
            throw error;
        }
    }
}

export default cloudinaryService;