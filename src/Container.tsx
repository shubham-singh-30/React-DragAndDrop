import update from "immutability-helper";
import type { FC } from "react";
import { useCallback } from "react";

import { Card } from "./Card";
export interface Item {
  description: string;
  heroImageUrl: string;
  id: string;
  joinNowButtonText: string;
  name: string;
  onlyNewCustomers: boolean;
  sequence: number;
  termsAndConditionsButtonText: string;
}
// export interface Item {
//   id: number;
//   text: string;
// }

export interface ContainerState {
  cards: Item[];
}
interface  IProps{
  cards:Item[]
  setCards:React.Dispatch<React.SetStateAction<Item[]>>
}

export const Container: FC<IProps> = ({cards,setCards}) => {
  
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);
    localStorage.setItem('cards', JSON.stringify(cards));
    const renderCard = useCallback(
      (card:Item , index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            name={card.name}
            description={card.description}
            moveCard={moveCard}
          />
        );
      },
      []

    );
    return (
      <>
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
};
