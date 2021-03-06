import './ConnectionIndicator.css';

const ConnectionIndicator = props => {
  const { connected } = props;
  return <span 
    className={`connection ${connected ? 'online' : 'offline'}`}
    title={connected ? 'Online' : 'Offline'}
  ></span>;
};

export default ConnectionIndicator;
