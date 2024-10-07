import { Card } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import photoPostService from "../../services/photo-post-service";

interface PhotoPostProps {
    userId: number;
    publicId: string;
    title: string;
    captions: string;
    reactions: number;
    postId: number;
}

export default function PhotoPostCard({userId, publicId, title, captions, reactions, postId}: PhotoPostProps)
{
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });
    const { user, isAuthenticated } = useSelector((state: RootState) => state.authentication);

    const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    async function likeHandler() {

     if(isAuthenticated){
            photoPostService.interact(postId, user?.id)
        }
    }
    
 
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>{userId}</Card.Header>
            <AdvancedImage onClick={likeHandler} cldImg={img} />
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{captions}</Card.Text>
            <Card.Text>{reactions}<FontAwesomeIcon icon={faHeart} /></Card.Text>
            </Card.Body>
        </Card>
    )
}