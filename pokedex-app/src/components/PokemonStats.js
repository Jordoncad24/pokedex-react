import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

// Define color for each stat
const statColors = {
  hp: '#f44336', // Red
  attack:  '#ff9800', // Orange
  defense: '#ffeb3b', // Yellow
  special_attack: '#29B6F6', // Blue
  special_defense: '#4caf50', // Green
  speed: '#FFC0CB' // Pink'
};

const capitalizeWords = (str) => {
    return str
      .split('_')  // Split by underscores (also works for hyphens if needed)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');  // Join words with space
};

const StatBar = ({ stat, value, max }) => {
  const normalizedStat = stat.replace('-', '_');

  return (
    <Box mb={1}>
      <Typography variant="body2" color="textSecondary">
        {capitalizeWords(normalizedStat)}: {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(value / max) * 100}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e0e0e0', // Light gray background for the bar
          '& .MuiLinearProgress-bar': {
            backgroundColor: statColors[normalizedStat] || '#9e9e9e', // Default color if not found
          }
        }}
      />
    </Box>
  );
};

const PokemonStats = ({ stats }) => {
  const maxStatValue = 255; // Default max value for most stats

  return (
    <Box>
      {stats.map((stat) => (
        <StatBar key={stat.stat.name} stat={stat.stat.name} value={stat.base_stat} max={maxStatValue} />
      ))}
    </Box>
  );
};

export default PokemonStats;
