import React from 'react';
import { Box, Chip } from '@mui/material';
import typeColors from './typecolors';

const TypeChips = ({ types }) => (
  <Box marginY={2}>
    {types.map((typeInfo) => {
      const typeName = typeInfo.type.name;
      const backgroundColor = typeColors[typeName] || '#777';
      return (
        <Chip
          key={typeName}
          label={typeName}
          style={{
            marginRight: '5px',
            textTransform: 'capitalize',
            backgroundColor: backgroundColor,
            color: 'white',
          }}
        />
      );
    })}
  </Box>
);

export default TypeChips;
