import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 4 }}>
        Welcome to Chess Masters
      </Typography>

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          color: '#000', // Set text color to black
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          What is Chess?
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Chess is a two-player strategy board game that involves moving pieces on a square board to attack and capture the opponent's pieces while defending one's own. The ultimate goal of the game is to checkmate the opponent's king, a situation in which the king is in a position to be captured and cannot escape capture.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          color: '#000', // Set text color to black
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          How to Play Chess
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          Chess is played on an 8x8 board with alternating black and white squares. Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.
          Players take turns to move one of their pieces to a different square following the rules of movement specific to each piece. The game continues until one player achieves checkmate, stalemate, or resignation.
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          navigate('/matching');
        }}
      >
        Start Game
      </Button>
    </Box>
  );
}

export default HomePage;
