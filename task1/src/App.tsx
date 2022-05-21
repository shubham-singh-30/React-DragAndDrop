import React, { useEffect, useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import axios from "axios";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Item } from "./Container";
import CustomerCard from "./CustomerCard";
export const initialState: Item = {
  description: "",
  heroImageUrl: "",
  id: "",
  joinNowButtonText: "",
  name: "",
  onlyNewCustomers: false,
  sequence: 0,
  termsAndConditionsButtonText: "",
};
function App() {
  const [cards, setCards] = useState<Item[]>([initialState]);
  const [isToggle, SetIsToggle] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://run.mocky.io/v3/484016a8-3cdb-44ad-97db-3e5d20d84298"
        );
        setCards(
          response.data.sort(function (a: Item, b: Item) {
            return a.sequence - b.sequence;
          })
        );
      } catch (err) {
        console.error("Server Error",err);
      }
    };
    let dataFromLocalStorage = localStorage.getItem("cards");
    console.log(dataFromLocalStorage)
    if (dataFromLocalStorage === null) {
      fetchData();
    } else setCards(JSON.parse(dataFromLocalStorage));
  }, []);
  return (
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", padding: "5%" , }}
      >
        <Grid>
        <Grid container sx={{ display: "flex" ,height:'50px' }}>
          <Grid item xs={6} sx={{display:'flex', justifyContent:'center',cursor:"pointer" ,background:'blue'}}
            onClick={() => SetIsToggle(true)}
          >
            All promotions
          </Grid>
          <Grid item xs={6} sx={{display:'flex', justifyContent:'center' ,cursor:"pointer",background:'grey'}}
            onClick={() => SetIsToggle(false)}
          >
            {" "}
            New customers
          </Grid>
        </Grid>
        {isToggle && cards.length > 1 && (
          <DndProvider backend={HTML5Backend}>
            <Container cards={cards} setCards={setCards} />
          </DndProvider>
        )}
        {!isToggle &&
          cards.length > 1 &&
          cards
            .filter((item) => item.onlyNewCustomers)
            .map((item) => <CustomerCard cards={item} />)}
            </Grid>
      </Grid>
  );
}

export default App;
