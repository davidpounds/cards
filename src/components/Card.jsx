import './Card.css';

const CARD_SIZE = Object.freeze({
  WIDTH: 360,
  HEIGHT: 540,
});

const Card = props => {
  const { 
    bitmask = 0,
    className = '',
    onClick = null,
    showBack = false,
    player = null,
  } = props;
  const svgId = showBack ? '#c00' : `#c${bitmask.toString(16).substr(-2)}`;

  return (
    <div className={`card-wrapper ${className}`}>
      <div className="card-player">{player?.name}</div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={CARD_SIZE.WIDTH} 
        height={CARD_SIZE.HEIGHT} 
        className="card"
        onClick={onClick}
      >
        <use href={svgId} />
      </svg>
    </div>
  );
};

export default Card;
