import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export default function Header(props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={props.toggle}
          sx={{ mr: 2, display: { sm: "none" }, color: "#3f50b5" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="black">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}