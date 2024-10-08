import cloudinaryApiService from "../services/cloudinary-api-service";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function PhotoUploadButton({onPhotoUploaded}: {onPhotoUploaded: Function})
{
    const [file, setFile] = useState<File>();
    const [message, setMessage] = useState("");

    async function submitHandler(event: any) {
        event.preventDefault();
    
        try
        {
            if (file) 
            {
                const formData = new FormData();
    
                formData.append(
                    "upload_preset",
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                );
    
                formData.append("file", file);
    
                const response = await cloudinaryApiService.uploadPhoto(formData);
                setMessage("Successfully uploaded photo!");
                console.log(response)
                onPhotoUploaded(response.public_id);
            }
        }
        catch (e)
        {
            console.error(e);
            setMessage("There was an error in uploading your photo.");
        }
    }
    
    return (
        <>
        <form className="d-flex" onSubmit={submitHandler}>
            <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
                setFile(e.target.files![0]);
            }}
            ></input>
            <Button variant="secondary" type="submit">Upload</Button>
        </form>
        <p className="my-4 text-center">{message}</p>
        </>
    )
}