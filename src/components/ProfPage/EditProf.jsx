import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";
import './EditProf.css';

class EditProf extends Component {
  constructor(props) {
    super(props);
    
  }
  
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  // S3 STUFF \\
  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get("/sign-s3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
        this.handleImg(url);
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };
  // End of S3 stuff. \\

  render() {
    return (
        <div className='popup'>
        <div className='popup_inner'>
      <div className="dropContainer">
        <Dropzone
          onDropAccepted={this.getSignedRequest}
          style={{
            position: "relative",
            maxHeight: "35vh",
            minWidth: "90%",
            borderWidth: 7,
            marginTop: 100,
            borderColor: "rgb(102, 102, 102)",
            borderStyle: "dashed",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 28
          }}
          accept="image/*"
          multiple={false}
        >
          {this.state.isUploading ? (
            <GridLoader />
          ) : (
            <p>Drop File or Click Here</p>
          )}
        </Dropzone>
      </div>

        <h1>{this.props.text}</h1>
      <button onClick={this.props.closePopup}>confirm changes</button>
      </div>
    </div>
    );
  }
}

export default EditProf;

