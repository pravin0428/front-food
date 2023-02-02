import {
    Box,
    Button,
    Container,
    Editable,
    EditablePreview,
    EditableTextarea,
    Input,
    useToast,
    FormLabel,
  } from "@chakra-ui/react";
  
  import React from "react";
  import { useState } from "react";
  import joi from "joi-browser";
  import { postData } from "../HttpSevices/posts";
  import { useNavigate } from "react-router-dom";
  import FileBase64 from "react-file-base64";
  
  const initState = {
    title: "",
    imageFileSet: "",
    body: "",
  };
  
  function AddPost() {
    const [formData, setFormData] = useState(initState);
    // console.log(formData);
    const navigate = useNavigate();
    const toast = useToast();
  
    const handleChange = (e) => {
      //validation
      const { error } = joi.validate([e.target.name], schema[e.target.name], {
        abortEarly: true,
      });
      console.log("re----re", error);
      // !error?error[target.name] = "" : error[target.name] = error.details[0].message
      // console.log(e.target.name);
      // console.log(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //  AddPost()
      postData(formData)
        .then((res) => {
           console.log(res , ":::::-------::::::");
  
          toast({
            position: "bottom-right",
            render: () => (
              <Box color="white" p={3} bg="blue.500">
                Product added successfully
              </Box>
            ),
          });
          navigate("/posts");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    //now will goin to validate our form inputs using joi-browser
  
    const schema = {
      title: joi.string().required().label("Title").min(5),
      imageFileSet: joi.string().required().label("imageFileSet"),
      body: joi.string().required().label("body"),
    };
  
    return (
      <Box
      backgroundImage={"https://th.bing.com/th/id/R.39bd85ccce948909803868621a2cc050?rik=Sm0Vu8hXHf5mJw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f06%2fHD-Nature-Backgrounds-Images-Download.jpg&ehk=BUfEe8Tl1kYxxNDDlFxMCRKKjwKA64sKN7i%2biRuJ6r4%3d&risl=1&pid=ImgRaw&r=0"}
      bgSize="100%"
      height="550px"
      >
      <Container 
      p={10}
      // border="4px solid teal"
      //     border={{
      //   base: "4px solid teal",
      //   sm: "2px solid orange",
      //   md: "2px solid black",
      //   lg: "2px solid blue",
      //   xl: "2px solid green",
      //   "2xl": "2px solid yellow",
      // }}
      
    
      >
        <Box 
        padding={4} 
        // border="2px solid green"
      
        
         borderRadius="0px 20px 0px 20px"
           backgroundColor="#667677"
        >
          <form onSubmit={handleSubmit}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              border="2px solid black"
              placeholder="enter product name"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />
  
            <FormLabel>Image</FormLabel>
            <Box 
            border="2px solid black"
             mt={2} mb={1}
             p={4}
             textAlign="start"
             >
              <FileBase64
                onDone={(e) => {
                  formData.imageFileSet = e.base64;
                }}
              />
            </Box>
  
            <FormLabel>body</FormLabel>
            {/* <Input type='text' border="2px solid black" placeholder='enter product body'  /> */}
            <Editable defaultValue="enter product body" border="2px solid black" p={2}  textAlign="start" >
              <EditablePreview />
              <EditableTextarea
              
                name="body"
                value={formData.body}
                onChange={(e) => handleChange(e)}
              />
            </Editable>
            <br />
            <br />
            <Button
              color={"white"}
              bg={"#41ff30"}
              _hover={{
                bg: "green.500",
              }}
              onClick={(e) => handleSubmit(e)}
            >
              ADD
            </Button>
          </form>
        </Box>
      </Container>
      </Box>
    );
  }
  
  export default AddPost;
  