import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025')
      .then(res => {
        setPokemon(res.data.results);
      });
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokemonList pokemon={pokemon} />
    </div>
  );
}

export default App;