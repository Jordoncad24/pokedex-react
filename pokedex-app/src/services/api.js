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

    // Fetch species data to get the evolution chain URL
    const speciesResponse = await axios.get(pokemonData.species.url);
    const speciesData = speciesResponse.data;

    // Fetch evolution chain data
    const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
    const evolutionData = evolutionResponse.data;

    // Return Pokémon data along with evolution details and forms
    return { 
      ...pokemonData, 
      evolution: evolutionData,
      forms: pokemonData.forms // Add forms to the returned data
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
