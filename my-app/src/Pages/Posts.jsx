import {
  Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Heading,
    Img,
    SimpleGrid,
   
  } from "@chakra-ui/react";
  import React from "react";
  import { useState ,useEffect } from "react";
  import { Link } from "react-router-dom";
  import ButtonComp from "../Components/ButtonComp";
  import { getAllPosts } from "../HttpSevices/posts";
  
  function Posts() {
    const [data, setData] = useState([]);
   
    useEffect(() => {
      getAllPosts()
        .then((res) => {
        //    console.log(res.data,"in the post-------**------")
          setData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
  
    return (
      <SimpleGrid
        spacing={4}
        // border="3px solid"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        p={1}
      >
        {data?.map((elem) => (
            <div key={elem.id}>
              <Card 
          //  border="3px solid" 
          height="100%"
           
                >
                <CardHeader>
                  <Heading size="md" overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    maxWidth="250px">{elem.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Img src={elem.imageFileSet} mb={4} />
                </CardBody>
                <CardFooter  
                // border="2px solid red"
                 margin="auto" 
                 justifyItems="center" 
                 marginTop="-35px" >
                  <Link to={`/posts/${elem.id}`}  >
                    <ButtonComp name="Details"    />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
      </SimpleGrid>
    )
  }
  
  export default Posts;