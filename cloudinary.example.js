
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true
});

export async function uploadImage (imagePath) {
    
        const options = {
            folder : "userImages",
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            transformation : [
            { width: 250, height: 250, crop:"auto" },
            { quality: 'auto' },
            { fetch_format: "auto" }
          ]
        };
    
        try {
            const result = await cloudinary.uploader.upload(imagePath, options);
            return result.url;
        } catch (error) {
            console.error(error);
        }
    };
    
    const imgUrl = await uploadImage(`${import.meta.dirname}/public/images/utilisateur.jpg`)
    
    console.log(imgUrl)



