import './Card.css';

const Card = props => {
  const { colour, symbol, name } = props;
  const abbr = /\d+/.test(name) ? name : name.substr(0, 1);

  return <div className={`card ${colour}`}>
    <AbbreviationAndSymbol abbr={abbr} symbol={symbol} position="top" />
    <AbbreviationAndSymbol abbr={abbr} symbol={symbol} position="bottom" />
  </div>
};

const AbbreviationAndSymbol = props => {
  const { abbr, symbol, position = 'top' } = props;
  return <div className={`abbr-and-symbol ${position}`}>{abbr}{symbol}</div>;
};

export default Card;
