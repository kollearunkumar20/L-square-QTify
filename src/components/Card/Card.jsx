import React from "react";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

const Card = ({ data, onClick }) => {
  const isSong = data.likes !== undefined;

  return (
    <MuiCard
      onClick={() => onClick?.(data)} // 👈 trigger onClick if passed
      sx={{
        backgroundColor: "#181818",
        color: "#fff",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
        width: 180,
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={data.image}
        alt={data.title}
        sx={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
      />
      <CardContent sx={{ textAlign: "left", p: 2 }}>
        <Chip
          label={`${isSong ? data.likes + " Likes" : data.follows + " Follows"}`}
          sx={{
            backgroundColor: "#34C94B",
            color: "#000",
            fontSize: "0.75rem",
            height: 22,
          }}
        />
        <Typography
          variant="subtitle1"
          mt={1}
          noWrap
          sx={{ fontWeight: 500, fontFamily: "Poppins" }}
        >
          {data.title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
