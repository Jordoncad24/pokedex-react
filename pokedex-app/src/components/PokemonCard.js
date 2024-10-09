// src/components/PokemonCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './PokemonCard.css'; // Importing component-specific styles
import typeColors from './typecolors'; // Import the color mapping

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, id, types } = pokemon;
  const image = sprites.front_default;

  // Determine the card's background color based on the first Pokémon type
  const cardStyle = {
    height: '300px', // Set a fixed height
    width: '200px',  // Set a fixed width
    margin: '10px',
    backgroundColor: typeColors[types[0].type.name] || '#fff', // Fallback to white if type not found
    color: '#fff', // Set text color to white for better contrast
    border: `4px solid ${types.length > 1 ? typeColors[types[1].type.name] : 'transparent'}`, // Set border color based on secondary type
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add shadow for better aesthetics
    transition: 'box-shadow 0.3s ease, transform 0.3s ease' // Transition for smooth effect
  };

  return (
    <Card 
      style={cardStyle}
      sx={{
        '&:hover': {
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', // Larger shadow on hover
          transform: 'scale(1.05)' // Slightly enlarge card on hover
        }
      }}
    >
      <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardMedia
          component="img"
          height="160" // Adjusted height for the image
          image={image}
          alt={name}
          style={{ objectFit: 'contain', maxHeight: '160px', width: '100%', marginTop: '20px',}} // Adjust this value to move the image down }} // Ensure the image fits well
        />
        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '140px' }}>
          <Typography variant="h6" component="div" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
            #{id} {name}
          </Typography>
          <Typography variant="body2" color="white" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
            {types.map((typeInfo) => typeInfo.type.name).join(' / ')}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PokemonCard;
