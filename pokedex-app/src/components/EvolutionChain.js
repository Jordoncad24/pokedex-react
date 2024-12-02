import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const EvolutionChain = ({ chain }) => {
  const renderEvolutionStep = (evolution) => {
    return (
      <Box key={evolution.species.name} display="flex" alignItems="center" marginY={1}>
        <Link to={`/pokemon/${evolution.species.name}`} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split('/')[6]}.png`}
              alt={evolution.species.name}
              style={{ width: '60px', height: '60px' }}
            />
          </Box>
        </Link>
        <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
          {evolution.species.name}
        </Typography>
        {evolution.evolves_to && evolution.evolves_to.length > 0 && (
          <Typography variant="body1" style={{ marginLeft: '10px' }}>
            ➜
          </Typography>
        )}
        {evolution.evolves_to &&
          evolution.evolves_to.map((evolutionStep) => renderEvolutionStep(evolutionStep))}
      </Box>
    );
  };

  return <>{renderEvolutionStep(chain)}</>;
};

export default EvolutionChain;
