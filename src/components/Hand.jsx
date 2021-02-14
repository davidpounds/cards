import './Hand.css';
import { sortHand } from '../utils/cardorder';
import Card from './Card';

const Hand = props => {
  const { deck, player } = props;
  const hand = deck.filter(card => card.player === player);
  const sortedHand = sortHand(hand);
  const addToInPlay = card => () => {
    card.inPlay = true;
  };

  return <section className="player">
    <h2>{player}</h2>
    <div className="cardlist hand">
      {sortedHand.map(card => (
        <Card 
          key={`${card.suit}${card.value}`} 
          value={card.value} 
          suit={card.suit}
          onClick={addToInPlay(card)}
        />))}
    </div>
  </section>;
};

export default Hand;
