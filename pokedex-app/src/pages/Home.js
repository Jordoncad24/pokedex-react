// src/pages/Home.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';

const Home = () => (
  <>
    <SearchBar />
    <PokemonList />
  </>
);

export default Home;