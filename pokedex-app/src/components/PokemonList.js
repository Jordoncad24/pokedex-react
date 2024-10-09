// src/components/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetails } from '../services/api';
import PokemonCard from './PokemonCard';
import { Grid, CircularProgress, Box, Pagination } from '@mui/material';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20; // Number of Pokémon per page
  const totalPages = Math.ceil(1025 / limit); // Assuming all 1025 Pokémon

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const data = await getPokemonList(limit, (page - 1) * limit);
        const detailedPromises = data.results.map((pokemon) => getPokemonDetails(pokemon.name));
        const detailedPokemon = await Promise.all(detailedPromises);
        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid container justifyContent="center">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" marginY={4}>
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </Box>
    </>
  );
};

export default PokemonList;
