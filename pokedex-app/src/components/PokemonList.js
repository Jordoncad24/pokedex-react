// src/components/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetails } from '../services/api';
import PokemonCard from './PokemonCard';
import { Grid2, CircularProgress, Box, Pagination } from '@mui/material';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 30; // Number of Pokémon per page
  const totalPages = Math.ceil(1025 / limit); // Assuming all 1025 Pokémon

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const data = await getPokemonList(limit, (page - 1) * limit);
        const detailedPromises = data.results.map((pokemon) => getPokemonDetails(pokemon.name));
        const detailedPokemon = await Promise.all(detailedPromises);
        // Only add Pokémon with IDs up to 1025
        const validPokemon = [];
        for (let pokemon of detailedPokemon) {
          if (pokemon.id <= 1025) {
            validPokemon.push(pokemon);
          }
        }
        setPokemonList(validPokemon);
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
      <Grid2 container justifyContent="center" spacing={2}> {/* Added spacing for cards */}
        {pokemonList.map((pokemon) => (
          <Grid2 item xs={6} sm={4} md={3} key={pokemon.id}> {/* Adjust item size for responsiveness */}
            <PokemonCard pokemon={pokemon} />
          </Grid2>
        ))}
      </Grid2>
      <Box display="flex" justifyContent="center" marginY={4}>
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </Box>
    </>
  );
};

export default PokemonList;
