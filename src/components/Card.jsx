import './Card.css';

const CARD_SIZE = Object.freeze({
  WIDTH: 360,
  HEIGHT: 540,
});

const Card = props => {
  const { 
    suit = 'b', 
    value = 'ack',
    onClick = null,
   } = props;
  const suitPrefix = suit.toLowerCase().substr(0, 1);
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={CARD_SIZE.WIDTH} 
      height={CARD_SIZE.HEIGHT} 
      className="card"
      onClick={onClick}
    >
      <use href={`#${suitPrefix}${value}`} />
    </svg>
  );
};

export default Card;
