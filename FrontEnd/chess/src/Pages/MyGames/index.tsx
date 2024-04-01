import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { BASE_URL, GET_GAMES } from '../../Constants';
import { useCookies } from 'react-cookie';
import { convertToBearerToken } from '../../Utils';
import { Link } from 'react-router-dom';

export type GameList = {
    username: string;
    createdTime: string;
    status: string;
    winner: String;
    id : number;
}

const GameList = () => {

  const [games, setGames] = useState<GameList[]>([]);
  const [cookies] = useCookies();

  useEffect(()=>{
     const url = BASE_URL + GET_GAMES;
     axios.get(url,
      {
        headers: {
          Authorization: convertToBearerToken(cookies['token'])
        }
      }).then((data)=>{
        setGames(data.data);
      }).catch((error)=>{
        console.log(error);
      });
  },[]);

  return (
    <div>
      <h2>Games Played</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opponent</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell>Open game</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game, index) => 
              {
                return (
                  <TableRow key={index}>
                  <TableCell>{game.username}</TableCell>
                  <TableCell>{game.createdTime}</TableCell>
                  <TableCell>{game.status}</TableCell>
                  <TableCell>{game.winner}</TableCell>
                  <TableCell><Link to = {`/game/${game.id}`}>Open</Link></TableCell>
                </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameList;
