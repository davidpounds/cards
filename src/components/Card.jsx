import './Card.css';

const Card = props => {
  const { colour, suit, symbol, value, name, } = props;
  const abbr = /\d+/.test(name) ? name : name.substr(0, 1);

  return <div className={colour}>
    {symbol} {abbr}
  </div>
};

export default Card;
