import './InPlay.css';
import { useSelector, useDispatch } from 'react-redux';
import { getInPlayCards, getPlayers } from '../store/selectors';
import { addCardsToPlayed } from '../store/actions';
import Card from './Card';

const InPlay = props => {
  const dispatch = useDispatch();
  const inPlay = useSelector(getInPlayCards);
  const players = useSelector(getPlayers());
  const allPlayersHavePlayed = inPlay?.length === players?.length;
  const addCardsToPlayedHandler = () => {
    if (allPlayersHavePlayed) {
      dispatch(addCardsToPlayed(inPlay));
    }
  };
  return <div className="in-play">
    {allPlayersHavePlayed && <div className="move-to-played">
      <button onClick={addCardsToPlayedHandler} title="Move to played">
        <svg><use href="#clear" /></svg>
      </button>
    </div>}
    {inPlay.map(card => <Card 
      key={`${card.suit}${card.value}`} 
      suit={card.suit}
      value={card.value} 
      className={`player${players.indexOf(card.player) + 1}`}
    />)}
  </div>;
};

export default InPlay;
