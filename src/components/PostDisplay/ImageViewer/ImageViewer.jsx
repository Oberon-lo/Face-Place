import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ImageViewer = (props) => {

  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    getImages();
  }, [props.post_id]);

  function getImages() {
    axios
        .get(`/post/images/${props.post_id}`)
        .then(response => {
            setImgArr(response.data);
        });
};

  return (
    <div className="ImageViewer">
      {
      imgArr.map((image, i) => (       
        <div key={i} className="image-container">
          <img src={image.img} alt={image.post_img_id} height="200px"/>
        </div>
      ))
      }
    </div>
  );
};

export default ImageViewer;