import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SelectLabels from "../Dropdown/SelectLabels";

const ResponsiveAppBar = (props) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <ArrowBackIosNewIcon />
              |
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <IconButton
              href="https://github.com/luckych8080/Online_IDE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github"
            >
              <GitHubIcon sx={{ fontSize: 35 }} />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/luckych8080/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
            >
              <LinkedInIcon sx={{ fontSize: 35 }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0, m: 1 }}>
            <SelectLabels setMode={props.setMode} setLang={props.setLang} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
