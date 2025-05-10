import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="400px"        
              >
              <CircularProgress size={48} thickness={4} color="primary" />
            </Box>
  );
}

export default Loader; 