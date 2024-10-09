// src/components/PokemonCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './PokemonCard.css'; // Importing component-specific styles

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, id, types } = pokemon;
  const image = sprites.front_default;

  return (
    <Card style={{ maxWidth: 200, margin: '10px' }}>
      <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography variant="h6" component="div" style={{ textTransform: 'capitalize' }}>
            #{id} {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {types.map((typeInfo) => typeInfo.type.name).join(', ')}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
