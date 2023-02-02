import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItemOption,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ModalComp from "../Components/ModalComp";
import SingleProCard from "../Components/SingleProCard";
import { getPostsDetailsById } from "../HttpSevices/posts";

function SinglePost() {
  const [proData, setProData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(proData);
  const { id } = useParams();
  // console.log(id , "||||||");
  useEffect(() => {
    getPostsDetailsById(id)
      .then((res) => {
        // console.log(res.data ,"in the post-------**------")
        setProData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const opneModelCom = () => {
    setIsModalOpen(true);
  };

  // just for date addition
  const dateFormat = () => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <>
      <Box border="4px solid red" display="flex" justifyItems="start">
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme="blue" minWidth="150px">
            DELETE
          </MenuButton>
          <MenuList minWidth="240px">
            {/* <MenuItemOption   as={Link} to={`/posts/${id}/edit`} >Edit</MenuItemOption> */}
            <MenuItemOption as={Button} onClick={opneModelCom}>
              <ModalComp
                isOpen={isModalOpen}
                setIsOpe={setIsModalOpen}
                title={proData.title}
                id={id}
              />
            </MenuItemOption>
          </MenuList>
        </Menu>
      </Box>

      <SingleProCard
        key={proData.id}
        title={proData.title}
        proImage={proData.imageFileSet}
        body={proData.body}
        id={proData.id}
      />
    </>
  );
}

export default SinglePost;
