// src/services/api.js
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 1025, offset = 0) => {
  const response = await axios.get(`${API_URL}/pokemon`, {
    params: { limit, offset },
  });
  return response.data;
};

export const getPokemonDetails = async (nameOrId) => {
  const response = await axios.get(`${API_URL}/pokemon/${nameOrId}`);
  return response.data;
};
