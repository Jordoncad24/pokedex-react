import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/api';

const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        // Fetch Pokemon Details
        const data = await getPokemonDetails(id);
        setPokemon(data);

        // Fetch previous and next Pokémon for navigation
        const prevId = data.id === 1 ? 1025 : data.id - 1; // Adjust depending on your Pokédex
        const nextId = data.id === 1025 ? 1 : data.id + 1;
        const prevData = await getPokemonDetails(prevId);
        const nextData = await getPokemonDetails(nextId);
        setPreviousPokemon(prevData);
        setNextPokemon(nextData);

        // Fetch Evolution Chain from species URL
        const evolutionData = await fetch(data.species.url);
        const evolutionJson = await evolutionData.json();
        const evolutionChainId = evolutionJson.evolution_chain.url.split('/')[6];
        
        // Fetch evolution details
        const evolutionDetails = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}/`);
        const evolutionDetailsJson = await evolutionDetails.json();
        setEvolutionChain(evolutionDetailsJson);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemon, loading, previousPokemon, nextPokemon, evolutionChain };
};

export default usePokemon;
