import { useSelector, useDispatch } from 'react-redux';
import { getInPlayCards, getPlayers } from '../store/selectors';
import { addCardsToPlayed } from '../store/actions';
import Card from './Card';

const InPlay = props => {
  const dispatch = useDispatch();
  const inPlay = useSelector(getInPlayCards);
  const players = useSelector(getPlayers);
  const allPlayersHavePlayed = inPlay?.length === players?.length;
  const addCardsToPlayedHandler = () => {
    if (allPlayersHavePlayed) {
      dispatch(addCardsToPlayed(inPlay));
    }
  };
  return <>
    <h2>
      In play
      {allPlayersHavePlayed && <button onClick={addCardsToPlayedHandler}>Move to played</button>}
    </h2>
    <div className="cardlist inplay" data-empty-message="No player has played a card">
      {inPlay.map(card => <div>
        <p>{card.player}</p>
        <Card key={`${card.suit}${card.value}`} suit={card.suit} value={card.value} />
      </div>)}
    </div>
  </>;
};

export default InPlay;
