import { sortHand } from '../utils/cardorder';
import Card from './Card';

const Hand = props => {
  const { hand } = props;
  if (Array.isArray(hand)) {
    const sortedHand = sortHand(hand);
    return <div className="cardlist">
      {sortedHand.map(card => <Card key={`${card.suit}${card.value}`} value={card.value} suit={card.suit} />)}
    </div>;
  }
  return <div className="cardlist">
    {[...Array(hand).keys()].map(idx => <Card key={idx} />)}
  </div>;
};

export default Hand;
