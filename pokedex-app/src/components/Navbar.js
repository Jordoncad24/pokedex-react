// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import styles from './Navbar.css'; // Importing CSS Module
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static" className={styles.navbar}>
    <Toolbar>
      <Link to={`/`}>
      <Typography variant="h6" component="div" classname={styles.navbarTitle}>
        Pokédex App
      </Typography>
      </Link>
    </Toolbar>
  </AppBar>
);

export default Navbar;
