import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

type NavbarProps = {
  isAuthenticated : boolean;
  onLogout : () => void;
}

function Navbar({ isAuthenticated, onLogout } : NavbarProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/game-list" color="inherit">
          Game List
        </Button>
        {isAuthenticated ? (
          <>
            <Button component={Link} to="/create-game" color="inherit">
              Create Game
            </Button>
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
