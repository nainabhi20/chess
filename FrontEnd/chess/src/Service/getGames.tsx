import { AxiosError, AxiosResponse } from "axios";
import { BASE_URL, GET_GAMES } from "../Constants";
import { GameList } from "../Pages/MyGames";
import api from "./axiosApi";

export const getGames = (): Promise<GameList[] | AxiosError> => {
    const url: string = BASE_URL + GET_GAMES;
    console.log(url);
    return api.get(url)
        .then((response: AxiosResponse<GameList[]>) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            console.error(error);
            return error;
        });
};
