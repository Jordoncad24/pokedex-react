// src/pages/PokemonDetail.jsx
import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/api';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip, Grid } from '@mui/material';
import typeColors from '../components/typecolors'; // Import the color mapping

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Pokémon details
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Box display="flex" justifyContent="center" marginTop={5}>
        <Typography variant="h5">Pokémon not found.</Typography>
      </Box>
    );
  }

  return (
    <Box padding={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
            #{pokemon.id} {pokemon.name}
          </Typography>
          <Box marginY={2}>
            {pokemon.types.map((typeInfo) => {
              const typeName = typeInfo.type.name;
              const backgroundColor = typeColors[typeName] || '#777'; // Default color if type not found
              return (
                <Chip
                  key={typeName}
                  label={typeName}
                  style={{
                    marginRight: '5px',
                    textTransform: 'capitalize',
                    backgroundColor: backgroundColor,
                    color: 'white', // Ensure text is readable
                  }}
                />
              );
            })}
          </Box>
          <Typography variant="h6">Abilities</Typography>
          <Box marginY={1}>
            {pokemon.abilities.map((abilityInfo) => (
              <Chip
                key={abilityInfo.ability.name}
                label={abilityInfo.ability.name}
                style={{ marginRight: '5px', textTransform: 'capitalize' }}
              />
            ))}
          </Box>
          <Typography variant="h6">Stats</Typography>
          <Box marginY={1}>
            {pokemon.stats.map((statInfo) => (
              <Typography key={statInfo.stat.name} variant="body1" style={{ textTransform: 'capitalize' }}>
                {statInfo.stat.name}: {statInfo.base_stat}
              </Typography>
            ))}
          </Box>
          <Typography variant="h6">Height & Weight</Typography>
          <Box marginY={1}>
            <Typography variant="body1">Height: {pokemon.height / 10} m</Typography>
            <Typography variant="body1">Weight: {pokemon.weight / 10} kg</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonDetail;
