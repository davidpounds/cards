import { sortHand } from '../utils/cardorder';
import Card from './Card';

const Hand = props => {
  const { 
    hand, 
    playerNo = '',
    addToInPlay = () => null,
  } = props;
  const sortedHand = sortHand(hand);
  return <>
    <h2>Player {playerNo}</h2>
    <div className="cardlist hand">
      {sortedHand.map(card => (
        <Card 
          key={`${card.suit}${card.value}`} 
          value={card.value} 
          suit={card.suit}
          onClick={addToInPlay(playerNo, card)}
        />))}
    </div>
  </>;
};

export default Hand;
