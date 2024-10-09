// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/pokemon/${search.toLowerCase()}`);
      setSearch('');
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginY={2}>
      <TextField
        label="Search Pokémon"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
