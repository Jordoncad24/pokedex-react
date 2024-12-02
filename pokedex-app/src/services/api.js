// src/services/api.js
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

// Function to get a list of Pokémon
export const getPokemonList = async (limit = 1025, offset = 0) => {
  const response = await axios.get(`${API_URL}/pokemon`, {
    params: { limit, offset },
  });
  return response.data;
};

// Function to get details of a specific Pokémon along with its evolution details and forms
export const getPokemonDetails = async (nameOrId) => {
  try {
    // Fetch Pokémon details
    const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`);
    const pokemonData = response.data;

    // Fetch species data to get the evolution chain URL and forms
    const speciesResponse = await axios.get(pokemonData.species.url);
    const speciesData = speciesResponse.data;

    // Fetch evolution chain data
    const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
    const evolutionData = evolutionResponse.data;

    // Get flavor text (choose the first English entry for simplicity)
    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No flavor text available'; // Set default if not available

    // Fetch forms if available
    const forms = pokemonData.forms || [];

    // Return Pokémon data along with evolution and forms details
    return { ...pokemonData, evolution: evolutionData, forms: forms, flavorText: flavorText }; // Add flavorText here
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
