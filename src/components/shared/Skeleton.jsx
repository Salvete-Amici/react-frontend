import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SK = () => {
  return (
    <Box
      sx={{
        width: 300,
        mt: 4,               
        mx: 'auto',          
        display: 'flex',
        flexDirection: 'column',
        gap: 1,              
      }}
    >
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ alignSelf: 'center' }}
      />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}

export default SK;
