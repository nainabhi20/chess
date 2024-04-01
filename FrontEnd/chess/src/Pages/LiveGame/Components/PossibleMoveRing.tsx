import React from "react";
import { Box } from "@mui/material";

type PossibleMoveRingprops = {
  children: React.ReactNode;
  borderRGBA: string;
};

const PossibleMoveRing = ({ children, borderRGBA }: PossibleMoveRingprops) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: `5px solid rgba(0, 0, 0, ${borderRGBA})`, // Light grey border with 4px width
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
};

export default PossibleMoveRing;
