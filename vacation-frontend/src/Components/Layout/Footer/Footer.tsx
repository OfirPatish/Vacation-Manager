import { Box, Typography } from "@mui/material";

function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        padding: "1rem",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">All rights reserved 2024</Typography>
    </Box>
  );
}

export default Footer;
