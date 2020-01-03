import React, {useState} from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';
import axios from 'axios';
import {comImgHandler} from './../../ducks/reducer';
import './AddImage.css'


const AddComImage = (props) => {

  const [isUploading, setIsUploading] = useState(false);

  function imageRemover(imgIndex) {
    const imageArr = props.post_img;
    imageArr.splice(imgIndex, 1);
    props.comImgHandler(imageArr);
  };

  // AMAZON S3 STUFF \\

  function getSignedRequest([file]) {
    setIsUploading(true);
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. 
    //This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. 
    //We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type
        }
      })
      .then(response => {
        const {signedRequest, url} = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err)
      });
  };

  function uploadFile(file, signedRequest, url) {
    const options = {
      headers: {
        'Content-Type': file.type
      }
    };
    axios
      .put(signedRequest, file, options)
      .then(response => {
        setIsUploading(false);
        props.comImgHandler([...props.com_img, url])
      })
      .catch(err => {
        setIsUploading(false);
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. you may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      });
  };
  // END AMAZON S3 STUFF \\

  return (
    <div className="AddImage">
      {props.com_img.map((img, i) => (
        <div key={i} className="image-container">
          <img src={img} alt="comment" height="100px" />
          <button onClick={() => imageRemover(i)} >X</button>
        </div>
      ))}
      <Dropzone
        onDropAccepted={getSignedRequest}
        style={{
          position: 'relative',
          width: 90,
          height: 90,
          borderStyle: 'dashed',
          borderWidth: 7,
          borderColor: 'rgb(102, 102, 102)',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30
        }}
        accept='image/*'
        multiple={true}
      >
        {isUploading ? <GridLoader /> : <p>+</p>}
      </Dropzone>
    </div>
  );
};

function mapStateToProps(reduxState) {
  const {com_img} = reduxState;
  return {
    com_img
  };
};

export default connect(mapStateToProps, {comImgHandler})(AddComImage);