// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import styles from './Navbar.css'; // Importing CSS Module

const Navbar = () => (
  <AppBar position="static" className={styles.navbar}>
    <Toolbar>
      <Typography variant="h6" component="div" classname={styles.navbarTitle}>
        Pokédex App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
