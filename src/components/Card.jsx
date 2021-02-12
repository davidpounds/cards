import './Card.css';

const Card = props => {
  const { suit, value } = props;
  return <div className={`card ${suit} val${value}`} />
};

export default Card;
