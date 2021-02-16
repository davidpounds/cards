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
    <h2>In play</h2>
    {inPlay?.length > 0 &&
      <>
        <div className="cardlist inplay">
          {inPlay.map(card => <Card key={`${card.suit}${card.value}`} suit={card.suit} value={card.value} />)}
        </div>
        <button onClick={addCardsToPlayedHandler} disabled={!allPlayersHavePlayed}>Move to played</button>
      </>
    }
    {(inPlay?.length ?? 0) === 0 && <div>No player has played a card</div>}
  </>;
};

export default InPlay;
