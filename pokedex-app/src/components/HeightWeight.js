import React from 'react';
import { Box, Typography } from '@mui/material';

const HeightWeight = ({ height, weight }) => (
  <Box marginY={1}>
    <Typography variant="body1">Height: {height / 10} m</Typography>
    <Typography variant="body1">Weight: {weight / 10} kg</Typography>
  </Box>
);

export default HeightWeight;
