import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";
import Swal from "sweetalert2";
import "./EditProf.css";

class EditProf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      togglePic: false,
      cover_pic: "",
      prof_pic: "",
      oldPic: "",
      oldCover: "",
      bio: "bio is empty",
      first_name: "",
      last_name: "",
      user_id: 0,
      toggleCover: false,
      toggleProf: false,
      whichOne: ""
    };
  }

  componentDidMount() {
    const { id, coverPic, firstName, lastName, bio, profPic } = this.props;
    this.setState({
      oldPic: profPic,
      oldCover: coverPic,
      bio: bio,
      first_name: firstName,
      last_name: lastName,
      user_id: +id
    });
  }

  putName(user_id, first_name, last_name) {
    let name = "bio";
    if (this.state.bio && this.state.first_name && this.state.last_name) {
      axios
        .put(`/api/name/${user_id}`, { first_name, last_name })
        .then(console.log("hit 1"))
        .catch(err => {
          this.failure(err, name);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Must fill out all fields",
        confirmButtonText: "Try again"
      });
    }
    console.log("hit 1");
  }

  putBio(bio, user_id) {
    let name = "bio";
    if (this.state.bio && this.state.first_name && this.state.last_name) {
      axios
        .put(`/api/bio/${user_id}`, this.state.bio)
        .then(console.log("hit 2"))
        .catch(err => {
          this.failure(err, name);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Must fill out all fields",
        confirmButtonText: "Try again"
      });
    }
  }

  putCover(cover_pic, user_id) {
    let name = "cover pic";
    if (this.state.cover_pic !== "") {
      axios
        .put(`api/cover/${user_id}`, cover_pic)
        .then(console.log("hit 3"))
        .catch(err => {
          this.failure(err, name);
        });
    }
  }

  putProf(prof_pic, user_id) {
    let name = "profPic";
    if (this.state.prof_pic !== "") {
      axios
        .put(`/api/profilePic/${user_id}`, prof_pic)
        .then(console.log("hit 4"))
        .catch(err => {
          this.failure(err, name);
        });
    }
  }

  finalize() {
    const {
      cover_pic,
      prof_pic,
      bio,
      first_name,
      last_name,
      user_id
    } = this.state;

    this.putName(user_id, first_name, last_name);
    this.putBio(bio, user_id);
    this.putCover(cover_pic, user_id);
    this.putProf(prof_pic, user_id);

    Swal.fire({
      icon: "success",
      title: "Changes Saved!",
      text: this.state.coverPic,
      confirmButtonText: "Continue"
    }).then(result => {
      if (result.value) {
        window.location.reload();
      }
    });
  }

  failure(err, name) {
    Swal.fire({
      icon: "error",
      title: name,
      text: err.response.data.message,
      confirmButtonText: "Try again"
    });
  }

  handleChange = (key, value) => {
    console.log(key, value);
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
        this.handleChange(this.state.whichOne, url);
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

  togglePic() {
    this.setState({
      togglePic: !this.state.togglePic
    });
    // console.log(this.state.togglePic);
  }

  toggleCover() {
    this.setState({
      toggleCover: !this.state.toggleCover,
      whichOne: "cover_pic"
    });
  }

  toggleProf() {
    this.setState({
      toggleProf: !this.state.toggleProf,
      whichOne: "prof_pic"
    });
  }

  render() {
    const {
      user_id,
      oldPic,
      oldCover,
      bio,
      first_name,
      last_name,
      cover_pic,
      prof_pic,
      togglePic,
      toggleProf,
      toggleCover
    } = this.state;
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1> editing user: {user_id}</h1>
          {togglePic ? (
            <div className="userForm">
              <div className="picEditStuff">
                {toggleCover ? (
                  <div className="leftBox2">
                    <button
                      className="editProf"
                      onClick={() => this.toggleCover()}
                    >
                      NeverMind
                    </button>
                    {cover_pic ? (
                      <>
                        <br />
                        <br />
                        <img
                          src={cover_pic}
                          alt="Hmm this one did'nt work"
                          className="editCoverPic"
                        />
                      </>
                    ) : (
                      <div className="dropContainer">
                        <Dropzone
                          onDropAccepted={this.getSignedRequest}
                          style={{
                            position: "relative",
                            maxHeight: "35vh",
                            maxWidth: "50%",
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
                        <br />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="leftBox2">
                    <button onClick={() => this.toggleCover()}>
                      Change Cover Photo?
                    </button>
                    <br />
                    <br />
                    <img src={oldCover} alt="oops" className="editCoverPic" />
                    <br />
                  </div>
                )}
                {toggleProf ? (
                  <div className="rightBox2">
                    <button
                      className="editProf"
                      onClick={() => this.toggleProf()}
                    >
                      NeverMind
                    </button>
                    {prof_pic ? (
                      <>
                        <br />
                        <br />
                        <img
                          src={prof_pic}
                          alt="Hmm this one did'nt work"
                          className="editCoverPic"
                        />
                      </>
                    ) : (
                      <div className="dropContainer">
                        <Dropzone
                          onDropAccepted={this.getSignedRequest}
                          style={{
                            position: "relative",
                            maxHeight: "35vh",
                            maxWidth: "50%",
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
                    )}
                  </div>
                ) : (
                  <div className="rightBox2">
                    <button onClick={() => this.toggleProf()}>
                      Change Profile picture?
                    </button>
                    <br />
                    <br />
                    <img src={oldPic} alt="oops" className="editProfPic" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="userForm">
              <div className="leftBox">
                <span>
                  First Name:{" "}
                  <input
                    value={first_name}
                    onChange={e =>
                      this.handleChange("first_name", e.target.value)
                    }
                    placeholder="First name"
                    type="text"
                  />
                </span>
                <br />
                <br />
                <span>
                  Last Name:{" "}
                  <input
                    value={last_name}
                    onChange={e =>
                      this.handleChange("last_name", e.target.value)
                    }
                    placeholder="Last name"
                    type="text"
                  />
                </span>
              </div>

              <div className="rightBox">
                <div className="bioEdit">
                  <span> Bio: {""}</span>
                  <textarea
                    value={bio}
                    cols="30"
                    rows="10"
                    onChange={e => this.handleChange("bio", e.target.value)}
                  ></textarea>
                </div>
              </div>

              <h1>{this.props.text}</h1>
            </div>
          )}
          <br />
          <br />
          <div className="editButtons">
            {!togglePic ? (
              <button
                className="register-button"
                onClick={() => this.togglePic()}
              >
                Change Pictures
              </button>
            ) : (
              <button
                className="register-button"
                onClick={() => this.togglePic()}
              >
                Change Info
              </button>
            )}
            <br />
            <button
              className="register-button"
              onClick={() => {
                this.finalize();
                this.props.closePopup();
              }}
            >
              Confirm Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProf;
