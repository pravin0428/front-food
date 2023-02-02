import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import ButtonComp from "./ButtonComp";

function MenuSmallScreen() {
  return (
    <Menu>
      <MenuButton
        as={Button}
       
        display={{
          base: "block",
          sm: "none",
          md: "none",
          lg: "hide",
          xl: "none",
          "2xl": "none",
        }}
      >
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link to="/posts">
            <ButtonComp name="Post" />
          </Link>
        </MenuItem>

        <MenuItem>
          {" "}
          <Link to="/addpost">
            <ButtonComp name="Add Post" />
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MenuSmallScreen;
