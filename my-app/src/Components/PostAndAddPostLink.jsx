import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ButtonComp from "./ButtonComp";

function PostAndAddPostLink() {
  return (
    <Box
      // border={{
      //   base: "4px solid teal",
      //   sm: "2px solid orange",
      //   md: "2px solid black",
      //   lg: "2px solid blue",
      //   xl: "2px solid green",
      //   "2xl": "2px solid yellow",
      // }}
      display={{
        base: "none",
        sm: "flex",
        md: "flex",
        lg: "flex",
        xl: "flex",
        "2xl": "flex",
      }}
      gap={{
        sm: "50px",
        md: "50px",
        lg: "50px",
        xl: "50px",
        "2xl": "50px",
      }}
    >
      <Link to="/posts">
        <ButtonComp name="Post" />
      </Link>

      <Link to="/addpost">
        <ButtonComp name="Add Post" />
      </Link>
    </Box>
  );
}

export default PostAndAddPostLink;
