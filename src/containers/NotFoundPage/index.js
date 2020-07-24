import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import history from "../../history";

export default function NotFound() {
  const error = useSelector((state) => state.forecast.error);

  const gotToHome = () => {
    history.push("/");
  };

  return (
    <Box
      width={1 / 2}
      display="flex"
      flexDirection="column"
      p={2}
      mx="auto"
      textAlign="center"
    >
      <Typography variant="h4" component="h2">
        {error ? error : "Page not found."}
      </Typography>
      <Box p={2}>
        <Button variant="contained" color="primary" onClick={gotToHome} m={2}>
          Home
        </Button>
      </Box>
    </Box>
  );
}
