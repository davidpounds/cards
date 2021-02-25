import './InPlay.css';
import { useSelector, useDispatch } from 'react-redux';
import { getInPlayCards, getPlayers, getCurrentPlayerIndex } from '../store/selectors.js';
import { addCardsToPlayed } from '../store/actions.js';
import Card from './Card.jsx';

const InPlay = props => {
  const { currentPlayer } = props;
  const dispatch = useDispatch();
  const inPlay = useSelector(getInPlayCards);
  const players = useSelector(getPlayers());
  const currentPlayerIndex = useSelector(getCurrentPlayerIndex(currentPlayer));
  const rotateAngle = currentPlayerIndex > -1 ? ((currentPlayerIndex + 2) % players.length) * 90 : 0;
  const allPlayersHavePlayed = inPlay?.length === players?.length;
  const addCardsToPlayedHandler = () => {
    if (allPlayersHavePlayed) {
      dispatch(addCardsToPlayed(inPlay));
    }
  };
  return <div className="in-play" style={{ '--rotate-angle': `-${rotateAngle}deg` }}>
    {allPlayersHavePlayed && <div className="move-to-played">
      <button onClick={addCardsToPlayedHandler} title="Move to played">
        <svg><use href="#clear" /></svg>
      </button>
    </div>}
    {inPlay.map(card => <Card 
      key={`${card.bitmask}`} 
      bitmask={card.bitmask}
      className={`player${players.indexOf(card.player) + 1}`}
    />)}
  </div>;
};

export default InPlay;
