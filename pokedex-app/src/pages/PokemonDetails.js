// src/pages/PokemonDetail.jsx
import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip, Grid2 } from '@mui/material';
import typeColors from '../components/typecolors'; // Import the color mapping

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  // Function to render Pokémon types
  const renderTypes = () => {
    return (
      <Box marginY={2}>
        {pokemon.types.map((typeInfo) => {
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
  };

 // Function to render Pokémon abilities
const renderAbilities = () => {
  return (
    <Box marginY={1}>
      {pokemon.abilities.map((abilityInfo) => {
        const isHidden = abilityInfo.is_hidden; // Check if the ability is hidden
        return (
          <Chip
            key={abilityInfo.ability.name}
            label={abilityInfo.ability.name}
            style={{
              marginRight: '5px',
              textTransform: 'capitalize',
              backgroundColor: isHidden ? '#ffcc00' : '#007bff', // Highlight hidden abilities with a different color
              color: 'white',
            }}
          />
        );
      })}
    </Box>
  );
};


  // Function to render Pokémon stats
  const renderStats = () => {
    return (
      <Box marginY={1}>
        {pokemon.stats.map((statInfo) => (
          <Typography key={statInfo.stat.name} variant="body1" style={{ textTransform: 'capitalize' }}>
            {statInfo.stat.name}: {statInfo.base_stat}
          </Typography>
        ))}
      </Box>
    );
  };

  // Function to render Pokémon forms
  const renderForms = () => {
    return (
      <Grid2 container spacing={2}>
        {pokemon.forms && pokemon.forms.length > 0 ? (
          pokemon.forms.map((form) => (
            <Grid2 item key={form.name} xs={4}>
              <Link to={`/pokemon/${form.name}`}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.url.split('/')[6]}.png`}
                  alt={form.name}
                  style={{ width: '100px' }}
                />
                <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                  {form.name}
                </Typography>
              </Link>
            </Grid2>
          ))
        ) : (
          <Typography variant="body1">N/A</Typography>
        )}
      </Grid2>
    );
  };

  // Function to render evolutions
  const renderEvolutions = (evolutionChain) => {
    return (
      <Box display="flex" alignItems="center" marginY={1}>
        <Link to={`/pokemon/${evolutionChain.species.name}`} style={{ textDecoration: 'none' }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.species.url.split('/')[6]}.png`}
            alt={evolutionChain.species.name}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
        </Link>
        <Link to={`/pokemon/${evolutionChain.species.name}`} style={{ textDecoration: 'none', marginRight: '10px', color: 'inherit' }}>
          <Typography variant="body1" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
            {evolutionChain.species.name} (Level: {evolutionChain.evolution_details[0]?.min_level || 'N/A'})
          </Typography>
        </Link>
        {evolutionChain.evolves_to.map((evolution) => (
          <Box key={evolution.species.name} display="flex" alignItems="center" marginLeft={2}>
            {renderEvolutions(evolution)}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box padding={4}>
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={4}>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            style={{ width: '100%' }}
          />
        </Grid2>
        <Grid2 item xs={12} md={8}>
          <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
            #{pokemon.id} {pokemon.name}
          </Typography>
          {renderTypes()}
          <Typography variant="h6">Abilities</Typography>
          {renderAbilities()}
          <Typography variant="h6">Stats</Typography>
          {renderStats()}
          <Typography variant="h6">Height & Weight</Typography>
          <Box marginY={1}>
            <Typography variant="body1">Height: {pokemon.height / 10} m</Typography>
            <Typography variant="body1">Weight: {pokemon.weight / 10} kg</Typography>
          </Box>
          <Typography variant="h5" marginTop={2}>
            Forms:
          </Typography>
          {renderForms()}
          <Box marginY={1}>
            <Typography variant="h6">Evolutions:</Typography>
            {renderEvolutions(pokemon.evolution.chain)}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PokemonDetail;
