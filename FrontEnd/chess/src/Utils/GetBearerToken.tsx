import { getUserIdFromToken } from "../Pages/LiveGame/Utils/gameUtils";

export const convertToBearerToken = (token:string) : string => {
    return `Bearer ${token}`;
}

export const checkAuthentication = (token:string) : boolean => {
    const payload = getUserIdFromToken(token);
    const currentTimestamp = Math.floor(Date.now()); // Current time in seconds
    const expirationTime = payload?.exp; // Assuming token has 'expirationTime' property
    if(expirationTime)
        if (expirationTime < currentTimestamp) {
            return false; // Token has expired
        } else {
            return true; // Token is still valid
        }
    else
        return false;
}