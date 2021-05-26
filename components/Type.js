import React from 'react';
import PropTypes from 'prop-types';

class Type extends React.Component {
  static propTypes = {
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    speed: PropTypes.number,
    cursor: PropTypes.string,
  }

  static defaultProps = {
    speed: 5,
    cursor: '█',
  }
  
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
    
    this.id = window.requestAnimationFrame(this.tick());
  }
  
  typeChar(str) {
    const content = [
      this.state.content.slice(0, -1),
      str,
      this.props.cursor
    ].join('')

    this.setState({ content });
  }

  tick(index = 0, last) {
    const { speed, text } = this.props;

    return (timestamp) => {
      if (!last || timestamp - last >= speed) {
	const char = text.join('\n')[index];
	last = timestamp;

	if (char !== undefined) {
	  this.typeChar(char);
	  index += 1;
	} else {
	  window.cancelAnimationFrame(this.id);
	}
      }

      this.id = window.requestAnimationFrame(this.tick(index, last));
    };
  }

  render() {
    return (
      <div>
	{this.state.content.split('\n').map((line, index) => (
	  <p key={index}>{line}</p>
	))}
      </div>
    );
  }
};

export default Type;
