import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map(p => (
        <PokemonCard key={p.name} name={p.name} url={p.url} />
      ))}
    </div>
  );
}

export default PokemonList;