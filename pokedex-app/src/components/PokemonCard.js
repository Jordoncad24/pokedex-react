import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonCard({ name, url }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemonData(res.data);
    });
  }, [url]);

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <div className="pokemon-card">
      <img src={pokemonData.sprites.front_default} alt={name} />
      <h2>{name}</h2>
      <p>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
}

export default PokemonCard;