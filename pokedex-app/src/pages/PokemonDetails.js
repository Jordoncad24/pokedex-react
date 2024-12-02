import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import PokemonStats from '../components/PokemonStats';
import TypeChips from '../components/TypeChips';
import AbilityChips from '../components/AbilityChips';
import HeightWeight from '../components/HeightWeight';
import EvolutionChain from '../components/EvolutionChain'; // Make sure this component is imported
import usePokemon from '../hooks/usePokemon';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, previousPokemon, nextPokemon, evolutionChain } = usePokemon(id);

  const handlePrevious = () => {
    if (previousPokemon) navigate(`/pokemon/${previousPokemon.id}`);
  };

  const handleNext = () => {
    if (nextPokemon) navigate(`/pokemon/${nextPokemon.id}`);
  };

  if (loading) return <Typography variant="h5">Loading...</Typography>;
  if (!pokemon) return <Typography variant="h5">Pokémon not found.</Typography>;

  return (
    <Box padding={4}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button variant="outlined" onClick={handlePrevious}>
          #{previousPokemon.id} {previousPokemon.name}
        </Button>
        <Button variant="outlined" onClick={handleNext}>
          #{nextPokemon.id} {nextPokemon.name}
        </Button>
      </Box>

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
          <TypeChips types={pokemon.types} />
          <Typography variant="h6">Flavor Text:</Typography>
          <Typography variant="body1">{pokemon.flavorText}</Typography>
          <Typography variant="h6">Abilities</Typography>
          <AbilityChips abilities={pokemon.abilities} />
          <PokemonStats stats={pokemon.stats} />
          <HeightWeight height={pokemon.height} weight={pokemon.weight} />

          {/* Render Evolution Chain */}
          {evolutionChain && (
            <Box marginTop={4}>
              <Typography variant="h6">Evolutions:</Typography>
              <EvolutionChain chain={evolutionChain.chain} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PokemonDetail;
