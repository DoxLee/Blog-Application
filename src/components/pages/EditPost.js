// import React, { useState, useRef, useEffect, useContext } from "react";
// import Editor from "./Editor";
// import UserContext from "../../context/UserContext";
// import Axios from "axios";
// import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

// const EditPost = ({ match }) => {
//   let history = useHistory();

//   const editor = useRef(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");

//   const { user, setUser } = useContext(UserContext);

//   const config = {
//     readonly: false, // all options from https://xdsoft.net/jodit/doc/
//     height: "70vh",
//   };

//   useEffect(() => {
//     const fetchPost = async () => {
//       const payload = {
//         id: match.params.id,
//       };
//       try {
//         const fetchPost = await Axios.post(
//           "http://localhost:3000/blog/get-post",
//           payload
//         );
//         const post = fetchPost.data;
//         setTitle(() => post.title);
//         setDescription(() => post.description);
//         setContent(() => post.content);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchPost();
//   }, []);

//   const submit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       id: match.params.id,
//       title,
//       description,
//       content: content,
//     };
//     try {
//       const updatedPost = await Axios.post(
//         "http://localhost:3000/blog/update-blog-post",
//         payload,
//         {
//           headers: {
//             "access-token": user.accesToken,
//           },
//         }
//       );
//       if (updatedPost.data.succes) {
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//   //   <Container className="mt-4">
//   //     <InputGroup className="mb-2">
//   //       <InputGroup.Text>Title</InputGroup.Text>
//   //       <FormControl
//   //         placeholder="Enter Title"
//   //         aria-label="Title"
//   //         value={title}
//   //         onChange={(e) => setTitle(() => e.target.value)}
//   //       />
//   //     </InputGroup>

//   //     <InputGroup className="mb-3">
//   //       <InputGroup.Text>Description</InputGroup.Text>
//   //       <FormControl
//   //         placeholder="Enter description"
//   //         aria-label="About description"
//   //         value={description}
//   //         onChange={(e) => setDescription(e.target.value)}
//   //       />
//   //     </InputGroup>

//   //     <Editor setContent={setContent} />

//   //     <Button
//   //       onClick={submit}
//   //       variant="secondary"
//   //       className="mt-2 mb-2 p-3 fs-4"
//   //     >
//   //       Save
//   //     </Button>
//   //   </Container>
//   );
// };

// export default EditPost;
