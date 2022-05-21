import { Button, Box } from "@mui/material";
import React from "react";
import { style } from "./Card";
import { Item } from "./Container";

interface IProps {
  cards: Item;
}
const CustomerCard: React.FC<IProps> = ({ cards }) => {
  return (
    <div style={{ ...style, cursor: "pointer" ,display:'flex',flexDirection:'column' }}>
      <>
        <img src={cards.heroImageUrl} alt="heroImage" />
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {cards.name}{" "}
        </h1>
        <p> {cards.description} </p>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained">{cards.joinNowButtonText}</Button>
          <Button variant="contained">
            {cards.termsAndConditionsButtonText}
          </Button>
        </Box>
      </>
    </div>
  );
};

export default CustomerCard;
