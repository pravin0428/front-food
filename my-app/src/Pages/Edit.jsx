import {
  Center,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  FormLabel,
  Grid,
  Input,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllPostsDetailsById,
  getPostsDetailsById,
} from "../HttpSevices/posts";
import FileBase64 from "react-file-base64";
import { useEffect } from "react";
import joi from "joi-browser";
import axios from "axios";

const initState = {
  title: "",
  imageFileSet: "",
  body: "",
};

function Edit() {
  const [prevData, setPrevData] = useState([]);
  const [formData, setFormData] = useState(initState);
  // console.log(formData);

  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const handleChange = (e) => {
    //validation
    const { error } = joi.validate([e.target.name], schema[e.target.name], {
      abortEarly: true,
    });
    // console.log("re----re", error);
    // // !error?error[target.name] = "" : error[target.name] = error.details[0].message
    // console.log(e.target.name, "|||||||||");
    // console.log(e.target.value, "||||||||||");

    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData, "%%%%%%%%%");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/posts/${id}`,
        formData
      );
      console.log(response, ":---------:");
      toast({
        position: "bottom-right",
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Product Edited successfully
          </Box>
        ),
      });
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  //  useEffect(()=>{
  //   handleSubmit()
  //  },[])

  //now will goin to validate our form inputs using joi-browser

  const schema = {
    title: joi.string().required().label("Title").min(5),
    imageFileSet: joi.string().required().label("imageFileSet"),
    body: joi.string().required().label("body"),
  };

  // request for path the data
  useEffect(() => {
    getPostsDetailsById(id)
      .then(({ data: res }) => {
        // console.log(res.data , "KKKKKKKKKK")
        console.log(formData, "check me before------");
         setFormData(res);
        console.log(formData, "check me after------");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        // w={{ sm: '100%', md: '540px' }}
        width="80%"
        // height={{ sm: '476px', md: '20rem' }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={formData.imageFileSet}
            alt="productImage"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Grid Container>
            {/* for image updating */}
            <Grid item xs={12} sm={4}></Grid>

            {/* form container */}
            <Grid item xs={12} sm={8}>
              <Box padding={2} border="2px solid green" mt={50}>
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
                  <Box border="1px solid red" mt={2} mb={1}>
                    <FileBase64
                      onDone={(e) => {
                        formData.imageFileSet = e.base64;
                      }}
                    />
                  </Box>

                  <FormLabel>body</FormLabel>
                  {/* <Input type='text' border="2px solid black" placeholder='enter product body'  /> */}
                  <Editable
                    defaultValue="enter product body"
                    border="2px solid black"
                  >
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
                    bg={"green.400"}
                    _hover={{
                      bg: "green.500",
                    }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    ADD
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Center>
  );
}
export default Edit;
