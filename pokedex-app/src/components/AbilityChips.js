import React from 'react';
import { Box, Chip } from '@mui/material';

const AbilityChips = ({ abilities }) => (
  <Box marginY={1}>
    {abilities.map((abilityInfo) => {
      const isHidden = abilityInfo.is_hidden;
      return (
        <Chip
          key={abilityInfo.ability.name}
          label={abilityInfo.ability.name}
          style={{
            marginRight: '5px',
            textTransform: 'capitalize',
            backgroundColor: isHidden ? '#ffcc00' : '#007bff',
            color: 'white',
          }}
        />
      );
    })}
  </Box>
);

export default AbilityChips;
