import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { BASE_URL, CREATE_NEW_GAME_URL } from '../../Constants';
import { convertToBearerToken } from '../../Utils';

export const MatchingPage = () => {
  const [opponentPlayerName, setOpponentPlayerName] = useState('');
  const [cookies] = useCookies();

  const buttonClickHandler = () => {
    const url = BASE_URL + CREATE_NEW_GAME_URL;
    axios
      .post(
        url,
        {
          opponentPlayerUserName: opponentPlayerName,
        },
        {
          headers: {
            Authorization: convertToBearerToken(cookies['token']),
          },
        }
      )
      .then((data) => {
        alert('Game created successfully');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Enter the username of the opponent you want to play with:
      </Typography>
      <TextField
        placeholder="Opponent's Username"
        value={opponentPlayerName}
        onChange={(e) => {
          setOpponentPlayerName(e.target.value);
        }}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!opponentPlayerName}
        onClick={buttonClickHandler}
      >
        Create Game
      </Button>
    </Box>
  );
};