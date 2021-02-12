import './Card.css';

const Card = props => {
  const { colour, symbol, name, value } = props;
  const abbr = /\d+/.test(name) ? name : name.substr(0, 1);

  return <div className={`card ${colour}`}>
    <AbbreviationAndSymbol abbr={abbr} symbol={symbol} position="top" />
    <SymbolPattern symbol={symbol} value={value} />
    <AbbreviationAndSymbol abbr={abbr} symbol={symbol} position="bottom" />
  </div>
};

const AbbreviationAndSymbol = props => {
  const { abbr, symbol, position = 'top' } = props;
  return <div className={`abbr-and-symbol ${position}`}>{abbr}{symbol}</div>;
};

const SymbolPattern = props => {
  const { symbol, value } = props;
  return <div className="symbol-pattern">{value}</div>;
};

export default Card;
