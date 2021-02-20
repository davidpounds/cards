import './Card.css';

const CARD_SIZE = Object.freeze({
  WIDTH: 360,
  HEIGHT: 540,
});

const Card = props => {
  const { 
    onClick = null,
    player = null,
    suit = 'b', 
    value = 'ack',
   } = props;
  const suitPrefix = suit.toLowerCase().substr(0, 1);
  return (
    <div className="card-wrapper">
      {player && <span className="card-player">{player}</span>}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={CARD_SIZE.WIDTH} 
        height={CARD_SIZE.HEIGHT} 
        className="card"
        onClick={onClick}
      >
        <use href={`#${suitPrefix}${value}`} />
      </svg>
    </div>
  );
};

export default Card;
