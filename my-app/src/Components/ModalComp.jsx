import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { deletePost } from "../HttpSevices/posts";
import { Link, useNavigate } from "react-router-dom";


function ModalComp({ isOpen, setIsOpe, title, id }) {
  const navigate = useNavigate();
  const toast = useToast();
  const isClose = () => {
    setIsOpe(false);
  };

  return (
    <>
      <Button onClick={isOpen}>DELETE</Button>

      <Modal isOpen={isOpen} onClose={isClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Are you sure want to Delete ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">{title}</Box>
          </ModalBody>

          <ModalFooter
            border="2px solid red"
            display="flex"
            justifyContent="space-evenly"
          >
            <Button
              colorScheme="blue"
              mr={3}
              onClick={isClose}
              variant="ghost"
              border="2px solid blue"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={3}
              border="2px solid red"
              onClick={() =>
                deletePost(id)
                  .then(() => {
                    toast({
                      position: "bottom-right",
                      render: () => (
                        <Box color="white" p={3} bg="blue.500">
                          DELETED SUCESS
                        </Box>
                      ),
                    });
                    navigate("/posts");
                  })
                  .catch((err) => {
                    alert("failed to delete try again");
                  })
              }
            >
              DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalComp;
