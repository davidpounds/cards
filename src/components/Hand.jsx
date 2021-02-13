import { sortHand } from '../utils/cardorder';
import Card from './Card';

const Hand = props => {
  const { hand, playerNo = '' } = props;
  const sortedHand = sortHand(hand);
  return <>
    <h2>Player {playerNo}</h2>
    <div className="cardlist">
      {sortedHand.map(card => <Card key={`${card.suit}${card.value}`} value={card.value} suit={card.suit} />)}
    </div>
  </>;
};

export default Hand;
