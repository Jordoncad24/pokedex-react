import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip, Grid2 } from '@mui/material';
import typeColors from '../components/typecolors'; // Import the color mapping

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  // Render loading state
  const renderLoading = () => (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <CircularProgress />
    </Box>
  );

  // Render not found state
  const renderNotFound = () => (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <Typography variant="h5">Pokémon not found.</Typography>
    </Box>
  );

  // Render type chips
  const renderTypeChips = () => (
    <Box marginY={2}>
      {pokemon.types.map((typeInfo) => {
        const typeName = typeInfo.type.name;
        const backgroundColor = typeColors[typeName] || '#777';
        return (
          <Chip
            key={typeName}
            label={typeName}
            style={{
              marginRight: '5px',
              textTransform: 'capitalize',
              backgroundColor: backgroundColor,
              color: 'white',
            }}
          />
        );
      })}
    </Box>
  );

  // Render abilities
  const renderAbilities = () => (
    <Box marginY={1}>
      {pokemon.abilities.map((abilityInfo) => {
        const isHidden = abilityInfo.is_hidden;
        return (
          <Chip
            key={abilityInfo.ability.name}
            label={abilityInfo.ability.name}
            style={{
              marginRight: '5px',
              textTransform: 'capitalize',
              backgroundColor: isHidden ? '#ffcc00' : '#007bff',
              color: 'white',
            }}
          />
        );
      })}
    </Box>
  );

  // Render stats
  const renderStats = () => (
    <Box marginY={1}>
      {pokemon.stats.map((statInfo) => (
        <Typography key={statInfo.stat.name} variant="body1" style={{ textTransform: 'capitalize' }}>
          {statInfo.stat.name}: {statInfo.base_stat}
        </Typography>
      ))}
    </Box>
  );

  // Render height and weight
  const renderHeightAndWeight = () => (
    <Box marginY={1}>
      <Typography variant="body1">Height: {pokemon.height / 10} m</Typography>
      <Typography variant="body1">Weight: {pokemon.weight / 10} kg</Typography>
    </Box>
  );

  // Render forms
  const renderForms = () => (
    <Box marginY={2}>
      <Typography variant="h5">Forms:</Typography>
      <Grid2 container spacing={2}>
        {pokemon.forms.length > 0 ? (
          pokemon.forms.map((form) => (
            <Grid2 item key={form.name} xs={4}>
              <Link to={`/pokemon/${form.name}`}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.url.split('/')[6]}.png`}
                  alt={form.name}
                  style={{ width: '100px' }}
                />
                <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
                  {form.name}
                </Typography>
              </Link>
            </Grid2>
          ))
        ) : (
          <Typography variant="body1">N/A</Typography>
        )}
      </Grid2>
    </Box>
  );

  // Render evolutions
  const renderEvolutions = (evolutionChain) => {
    // Ensure evolutionChain is defined and has species property
    if (!evolutionChain || !evolutionChain.species) return null;

    return (
      <Box display="flex" alignItems="center" marginY={1}>
        <Link to={`/pokemon/${evolutionChain.species.name}`} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: evolutionChain.types && evolutionChain.types.length > 1 ? `5px solid ${typeColors[evolutionChain.types[1].type.name]}` : 'none',
              backgroundColor: evolutionChain.types && evolutionChain.types.length > 0 ? typeColors[evolutionChain.types[0].type.name] : '#777',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionChain.species.url.split('/')[6]}.png`}
              alt={evolutionChain.species.name}
              style={{ width: '60px', height: '60px' }} // Sprite size
            />
          </Box>
        </Link>

        <Box style={{ textAlign: 'center' }}>
          <Link to={`/pokemon/${evolutionChain.species.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1" style={{ textTransform: 'capitalize' }}>
              {evolutionChain.species.name}
            </Typography>
          </Link>
        </Box>

        {/* Arrow or Pointer to the next evolution */}
        {Array.isArray(evolutionChain.evolves_to) && evolutionChain.evolves_to.length > 0 && (
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            ➜ {/* Arrow pointing to the next evolution */}
          </Typography>
        )}

        {/* Recursive rendering for evolves_to */}
        {Array.isArray(evolutionChain.evolves_to) && evolutionChain.evolves_to.map((evolution) => (
          <Box key={evolution.species.name} display="flex" alignItems="center" marginLeft={2}>
            {renderEvolutions(evolution)}
          </Box>
        ))}
      </Box>
    );
  };

  if (loading) return renderLoading();
  if (!pokemon) return renderNotFound();

  return (
    <Box padding={4}>
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={4}>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            style={{ width: '100%' }}
          />
        </Grid2>
        <Grid2 item xs={12} md={8}>
          <Typography variant="h4" style={{ textTransform: 'capitalize' }}>
            #{pokemon.id} {pokemon.name}
          </Typography>
          {renderTypeChips()}
          <Box marginY={2}>
            <Typography variant="h6">Flavor Text:</Typography>
            <Typography variant="body1">
              {pokemon.flavorText}
            </Typography>
          </Box>
          <Typography variant="h6">Abilities</Typography>
          {renderAbilities()}
          <Typography variant="h6">Stats</Typography>
          {renderStats()}
          <Typography variant="h6">Height & Weight</Typography>
          {renderHeightAndWeight()}
          {renderForms()}
          <Box marginY={1}>
            <Typography variant="h6">Evolutions:</Typography>
            {renderEvolutions(pokemon.evolution.chain)}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PokemonDetail;
