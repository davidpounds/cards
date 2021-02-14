import Card from './Card';

const InPlay = props => {
  const { inPlay } = props;
  return <>
    <h2>In play</h2>
    <div className="cardlist inplay">
      {inPlay.map(card => <Card key={`${card.suit}${card.value}`} suit={card.suit} value={card.value} />)}
    </div>
  </>;
};

export default InPlay;
