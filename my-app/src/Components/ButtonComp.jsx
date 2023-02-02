import {  Button , Box } from "@chakra-ui/react";
import React from "react";

import styles from "./ButtonComp.module.css";
function ButtonComp({ name }) {
  return (
    <Box className={styles.ancker}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {name}
    </Box>
  );
}

export default ButtonComp;
