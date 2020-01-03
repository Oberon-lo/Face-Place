// import React, { Component } from "react";
// import axios from "axios";
// import Dropzone from "react-dropzone";
// import { GridLoader } from "react-spinners";
// import { v4 as randomString } from "uuid";
// import Swal from "sweetalert2";
// import "./EditProf.css";
// import { withRouter } from "react-router-dom";

// class  extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isUploading: false,
//       togglePic: false,
//       cover_pic: "",
//       prof_pic: "",
//       oldPic: "",
//       oldCover: "",
//       bio: "bio is empty",
//       first_name: "",
//       last_name: "",
//       user_id: 0,
//       toggleCover: false,
//       toggleProf: false,
//       whichOne: ""
//     };
//   }

//   componentDidMount() {
//     const { id, coverPic, firstName, lastName, bio, profPic } = this.props;
//     this.setState({
//       oldPic: profPic,
//       oldCover: coverPic,
//       bio: bio,
//       first_name: firstName,
//       last_name: lastName,
//       user_id: +id
//     });
//   }

//   checkIt() {
//     const { cover_pic, prof_pic } = this.state;
//     if (cover_pic === "") {
//       this.setState({
//         cover_pic: this.props.coverPic
//       });
//     }
//     if (prof_pic === "") {
//       this.setState({
//         prof_pic: this.props.profPic
//       });
//     }
//   }

//   async finalize() {
//     const {
//       prof_pic,
//       first_name,
//       bio,
//       last_name,
//       cover_pic,
//       user_id
//     } = this.state;

//     await this.checkIt();

//     if (first_name && last_name && bio && cover_pic && prof_pic) {
//       axios
//         .put(`/api/user/${user_id}`, {
//           first_name,
//           last_name,
//           bio,
//           cover_pic,
//           prof_pic
//         })
//         .then(this.success())
//         .catch(err => {
//           this.failure(err);
//         });
//     } else {
//       Swal.fire({
//         icon: "error",
//         text: "please fill out all fields",
//         confirmButtonText: "Try again"
//       });
//     }
//   }

//   success() {
//     Swal.fire({
//       icon: "success",
//       title: "Changes Saved!",
//       text: "You will have to Login Again",
//       confirmButtonText: "Continue"
//     }).then(result => {
//       if (result.value) {
//         axios
//           .delete("/api/logout")
//           .then(this.props.history.push("/"), window.location.reload());
//       }
//     });
//   }

//   failure(err, name) {
//     Swal.fire({
//       icon: "error",
//       title: name,
//       text: err.response.data.message,
//       confirmButtonText: "Try again"
//     });
//   }
// }



// finalize() {
//   const {
//     prof_pic,
//     first_name,
//     bio,
//     last_name,
//     cover_pic,
//     user_id,
//     oldPic,
//     oldCover
//   } = this.state;

  
//   if (first_name && last_name && bio && cover_pic && prof_pic) {
//     axios
//       .put(`/api/user/${user_id}`, {
//         first_name,
//         last_name,
//         bio,
//         cover_pic,
//         prof_pic
//       })
//       .then(this.success())
//       .catch(err => {
//         this.failure(err);
//       });
//   } else if (first_name && last_name && bio && cover_pic) {
//     axios
//       .put(`/api/user/${user_id}`, {
//         first_name,
//         last_name,
//         bio,
//         cover_pic,
//         oldPic
//       })
//       .then(this.success())
//       .catch(err => {
//         this.failure(err);
//       });
//   } else if (first_name && last_name && bio && prof_pic) {
//     axios
//       .put(`/api/user/${user_id}`, {
//         first_name,
//         last_name,
//         bio,
//         oldCover,
//         prof_pic
//       })
//       .then(this.success())
//       .catch(err => {
//         this.failure(err);
//       });
//   } else if (first_name && last_name && bio) {
//     axios
//       .put(`/api/user/${user_id}`, {
//         first_name,
//         last_name,
//         bio,
//         oldCover,
//         oldPic
//       })
//       .then(this.success())
//       .catch(err => {
//         this.failure(err);
//       });
//   } else {
//     Swal.fire({
//       icon: "error",
//       text: "please fill out all fields",
//       confirmButtonText: "Try again"
//     });
//   }
// }