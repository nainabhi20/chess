import { useCookies } from "react-cookie";
import { useWebSocketContext } from "../../Context/useWebSocketContext"
import {jwtDecode} from "jwt-decode";
import { Box, Button, FormControl, FormControlLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, CREATE_NEW_GAME_URL } from "../../Constants";
import api from "../../Service/axiosApi";
import { convertToBearerToken } from "../../Utils";

export const MatchingPage = () => {
    const [opponentPlayerName, setOpponentPlayerName] = useState<string>("");
    const [cookies] = useCookies();
    const buttonClickHandler = (e : any) => {
        const url = BASE_URL + CREATE_NEW_GAME_URL;
        axios.post(url, {
            opponentPlayerUserName : opponentPlayerName,
        },{
            headers:{
                Authorization: convertToBearerToken(cookies['token']),
            }
        }
        ).then((data)=>{
            alert("Game created successfully");
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Box style = {{backgroundColor : 'white', padding:'2rem'}} >
        <FormControl>
            <FormControlLabel control={
                <TextField
                placeholder="username"
                value={opponentPlayerName}
                onChange={(e)=>{setOpponentPlayerName(e.target.value)}}
                >
                </TextField>
            }
            label = {<Typography color="black" >Enter opponent player username</Typography>}
            labelPlacement="top"
            />
            <br/>
            <Button
             type="submit"
             variant="contained"
             color="primary"
             fullWidth
             disabled={!opponentPlayerName}
             onClick={buttonClickHandler}
            >
              Create Game
            </Button>
        </FormControl>
        </Box>
    )

}